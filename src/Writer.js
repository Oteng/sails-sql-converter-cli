"use strict";
var Util_1 = require("./Util");
var util = require('util');
var fs = require('fs');
/**
 * This is the class that writes the generated tree
 * to a file.
 * Each tree node is written as a single model
 **/
var Writer = (function () {
    function Writer() {
    }
    Writer.write = function (startNode, foreignKeyTree) {
        var _this = this;
        /**
         * as we plug off the node starting at the last node
         * we we search the foreign keys tree to check if it has one and there
         */
        var root = startNode;
        while (root != null) {
            (function () {
                var filename = root.getTableName();
                var stream = _this.createFile(filename + ".js");
                var columns = root.getColumnObj();
                stream.once('open', function () {
                    stream.write(_this.startTmp);
                    for (var i = 0; i < columns.length; i++) {
                        stream.write(util.format(_this.attributeTmp, columns[i].name, "'" + columns[i].type + "'"));
                    }
                    //search reference tree
                    var coll = Util_1.Util.findColl(filename, foreignKeyTree);
                    for (var i = 0; i < coll.length; i++) {
                        stream.write(util.format(_this.foreignTmp, coll[i].getModel().toLocaleLowerCase(), coll[i].getModel().toLocaleLowerCase()));
                    }
                    //search for any table referencing it
                    var model = Util_1.Util.findModel(filename, foreignKeyTree);
                    for (var i = 0; i < model.length; i++) {
                        stream.write(util.format(_this.referenceTmp, model[i].getColl().toLocaleLowerCase(), model[i].getColl().toLocaleLowerCase(), model[i].getModel().toLocaleLowerCase()));
                    }
                    stream.write(_this.endTmp);
                    stream.end();
                });
                root = root.getNext();
            })();
        }
    };
    Writer.createFile = function (filename) {
        return fs.createWriteStream(filename);
    };
    Writer.startTmp = "module.exports = {\n\tattributes: {\n";
    Writer.referenceTmp = " \t%s: { \n\t\tcollection: '%s', \n\t\tvia: '%s'\n\t},\n";
    Writer.foreignTmp = '\t%s: { model: "%s" },\n';
    Writer.attributeTmp = '\t%s : {type: %s} ,\n';
    Writer.endTmp = '\t}\n};';
    return Writer;
}());
exports.Writer = Writer;