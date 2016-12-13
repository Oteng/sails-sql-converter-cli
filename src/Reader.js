/**
 * Created by oteng on 10/8/16.
 */
"use strict";
var Table_1 = require("./Table");
var Util_1 = require("./Util");
var Column_1 = require("./Column");
var ForeignKey_1 = require("./ForeignKey");
var Reader = (function () {
    function Reader(file) {
        this.reader = require('fs').createReadStream(file, {
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
        var maincontext = '';
        var datacontext = '';
        var ignore = false;
        var tmpData = '';
        this.reader.on('readable', function () {
            var someDataRead = false;
            var foreignKeyName = '';
            while (null !== (char = _this.reader.read(1))) {
                someDataRead = true;
                //read until you mee a space or a line break then breck out of the loop and process what has been learnt
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
                                //set context and init keyword for next keyword
                                maincontext = 'create';
                                // keyword = '';
                                datacontext = '';
                                ignore = false;
                                tmpData = '';
                                break;
                            case "table":
                                if (maincontext == 'create') {
                                    if (root == null) {
                                        root = new Table_1.Table("table");
                                    }
                                    else {
                                        var last = Util_1.Util.getLast(root);
                                        last.setNext(new Table_1.Table("table"));
                                    }
                                }
                                break;
                            case "primary":
                                maincontext = 'primary';
                                break;
                            case "foreign":
                                maincontext = 'foreign';
                                break;
                            case "references":
                                maincontext = 'references';
                                break;
                            default:
                                if (datacontext == "column_type") {
                                    var last = Util_1.Util.getLast(root);
                                    var tmp = last.getLastColumn();
                                    if (keyword.toLocaleLowerCase() == 'int') {
                                        tmp.setType("integer");
                                    }
                                    else if (keyword.toLocaleLowerCase() == 'varchar' || keyword.toLocaleLowerCase() == 'char') {
                                        tmp.setType("string");
                                    }
                                    datacontext = '';
                                }
                        }
                        keyword = '';
                        break;
                    case '`':
                        //beginning of data or end
                        //set context so we know if we are beginning or ending
                        if (datacontext == "data_end") {
                            if (tmpData == "__ac" && maincontext == "create") {
                                var last = Util_1.Util.getLast(root);
                                last.setTableName(keyword);
                                keyword = '';
                                datacontext = '';
                                tmpData = '';
                            }
                            else if (maincontext == "columns") {
                                var last = Util_1.Util.getLast(root);
                                last.addColumnObj(new Column_1.Column(keyword));
                                datacontext = "column_type";
                                keyword = '';
                            }
                            else if (maincontext == 'primary') {
                                //sails handles id creation so there is no need for our tree to have one
                                //so let remove the primary key constraint
                                //this is for situations where the primary key is created at the end of the
                                //table deceleration.
                                var last = Util_1.Util.getLast(root);
                                var tmp = last.getColumnObj();
                                for (var i = 0; i < tmp.length; i++) {
                                    if (tmp[i].getName() == keyword) {
                                        tmp.splice(i, 1);
                                        keyword = '';
                                    }
                                }
                            }
                            else if (maincontext == 'foreign') {
                                if (keyword.length == 0)
                                    continue;
                                foreignKeyName = keyword;
                                keyword = '';
                                datacontext = '';
                            }
                            else if (tmpData == "__ac" && maincontext == "references") {
                                var tmp = Util_1.Util.getLast(root);
                                if (foreign_root === null)
                                    foreign_root = new ForeignKey_1.ForeignKey(foreignKeyName, keyword, tmp.getTableName());
                                else {
                                    var last = Util_1.Util.getLast(foreign_root);
                                    last.setNext(new ForeignKey_1.ForeignKey(foreignKeyName, keyword, tmp.getTableName()));
                                }
                                datacontext = '';
                                tmpData = '';
                            }
                            else {
                                tmpData = keyword;
                                keyword = '';
                                datacontext = '';
                            }
                        }
                        else {
                            //init keyword and start collecting data
                            datacontext = "data_end";
                        }
                        break;
                    case ')':
                        if (ignore)
                            ignore = false;
                        break;
                    case '(':
                        if (datacontext == "column_type") {
                            ignore = true;
                            continue;
                        }
                        else if (maincontext == 'primary' || maincontext == 'foreign' || maincontext == 'references')
                            continue;
                        maincontext = "columns";
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
                Util_1.Util.printTree(root);
                Util_1.Util.printForeignTree(foreign_root);
                return cb(null, root, foreign_root);
            }
        });
    };
    return Reader;
}());
exports.Reader = Reader;