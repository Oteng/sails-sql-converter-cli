/**
 * Created by oteng on 10/8/16.
 */
"use strict";
var Table = require("./Table");
var Util = require("./Util");
var Column = require("./Column");
var ForeignKey = require("./ForeignKey");
var Reader = (function () {
    function Reader(opt) {
        this.reader = require('fs').createReadStream(opt.file, {
            encoding: 'utf8',
            fd: null
        });
    }

    Reader.prototype.read = function (cb) {
        var _this = this;
        //the root node of the tree
        var root = null;
        var foreign_root = null;
        var char;
        var keyword = '';
        var mainContext = '';
        var dataContext = '';
        var ignore = false;
        var tmpData = '';
        this.reader.on('readable', function () {
            var someDataRead = false;
            var foreignKeyName = '';
            while (null !== (char = _this.reader.read(1))) {
                someDataRead = true;
                //read until you meet a space or a line break then break out of the loop and process what has been learnt
                switch (char) {
                    case '\n':
                    case ' ':
                        // check keyword and process it
                        if (keyword.length < 2) {
                            keyword = '';
                            continue;
                        }
                        switch (keyword.toLocaleLowerCase()) {
                            case "create":
                                //set context for next keyword
                                mainContext = 'create';
                                // keyword = '';
                                dataContext = '';
                                ignore = false;
                                tmpData = '';
                                break;
                            case "table":
                                if (mainContext == 'create') {
                                    if (root == null) {
                                        root = new Table.Table("table");
                                    }
                                    else {
                                        var last = Util.Util.getLast(root);
                                        last.setNext(new Table.Table("table"));
                                    }
                                }
                                break;
                            case "primary":
                                mainContext = 'primary';
                                break;
                            case "foreign":
                                mainContext = 'foreign';
                                break;
                            case "references":
                                mainContext = 'references';
                                break;
                            default:
                                if (dataContext == "column_type") {
                                    var last = Util.Util.getLast(root);
                                    var tmp = last.getLastColumn();
                                    var locKeyword = keyword.toLocaleLowerCase();
                                    if (locKeyword == 'int' || locKeyword == 'smallint' || locKeyword == 'tinyint' || locKeyword == 'mediumint' || locKeyword == 'bigint') {
                                        tmp.setType("integer");
                                    } else if (locKeyword == 'float' || locKeyword == 'double' || locKeyword == 'decimal') {
                                        tmp.setType("float");
                                    } else if (locKeyword == 'varchar' || locKeyword == 'char' || locKeyword == 'tinyblob' || locKeyword == 'tinytext') {
                                        tmp.setType("string");
                                    }else if (locKeyword == 'blob' || locKeyword == 'text') {
                                        tmp.setType("text");
                                    }else if (locKeyword == 'mediumblob' || locKeyword == 'mediumtext') {
                                        tmp.setType("mediumtext");
                                    }else if (locKeyword == 'longblob' || locKeyword == 'longtext') {
                                        tmp.setType("longtext");
                                    } else if (locKeyword == 'date') {
                                        tmp.setType("date");
                                    }else if (locKeyword == 'datetime' || locKeyword == 'timestamp') {
                                        tmp.setType("datetime");
                                    }
                                    dataContext = '';
                                }
                        }
                        keyword = '';
                        break;
                    case '`':
                        //beginning of data or end
                        //set context so we know if we are beginning or ending
                        if (dataContext == "data_end") {
                            if (tmpData == "__ac" && mainContext == "create") {
                                var last = Util.Util.getLast(root);
                                last.setTableName(keyword);
                                keyword = '';
                                dataContext = '';
                                tmpData = '';
                            }
                            else if (mainContext == "columns") {
                                var last = Util.Util.getLast(root);
                                last.addColumnObj(new Column.Column(keyword));
                                dataContext = "column_type";
                                keyword = '';
                            }
                            else if (mainContext == 'primary') {
                                //sails handles id creation so there is no need for our tree to have one
                                //so let remove the primary key constraint
                                //this is for situations where the primary key is created at the end of the
                                //table deceleration.
                                var last = Util.Util.getLast(root);
                                var tmp = last.getColumnObj();
                                for (var i = 0; i < tmp.length; i++) {
                                    if (tmp[i].getName() == keyword) {
                                        tmp.splice(i, 1);
                                        keyword = '';
                                    }
                                }
                            }
                            else if (mainContext == 'foreign') {
                                if (keyword.length == 0)
                                    continue;
                                foreignKeyName = keyword;
                                keyword = '';
                                dataContext = '';
                            }
                            else if (tmpData == "__ac" && mainContext == "references") {
                                var tmp = Util.Util.getLast(root);
                                if (foreign_root === null)
                                    foreign_root = new ForeignKey.ForeignKey(foreignKeyName, keyword, tmp.getTableName());
                                else {
                                    var last = Util.Util.getLast(foreign_root);
                                    last.setNext(new ForeignKey.ForeignKey(foreignKeyName, keyword, tmp.getTableName()));
                                }
                                dataContext = '';
                                tmpData = '';
                            }
                            else {
                                tmpData = keyword;
                                keyword = '';
                                dataContext = '';
                            }
                        }
                        else {
                            //init keyword and start collecting data
                            dataContext = "data_end";
                        }
                        break;
                    case ')':
                        if (ignore)
                            ignore = false;
                        break;
                    case '(':
                        if (dataContext == "column_type") {
                            ignore = true;
                            continue;
                        }
                        else if (mainContext == 'primary' || mainContext == 'foreign' || mainContext == 'references')
                            continue;
                        mainContext = "columns";
                        keyword = '';
                        break;
                    case '.':
                        //this has the for `db_name`.`table_name` so change tmp data
                        tmpData = "__ac";
                        break;
                    default:
                        if (ignore)
                            continue;
                        keyword += char;
                }
            }
            if (!someDataRead) {
                // Util.Util.printTree(root);
                // Util.Util.printForeignTree(foreign_root);
                console.log("All done");
                return cb(null, root, foreign_root);
            }
        });
    };
    return Reader;
}());
exports.Reader = Reader;