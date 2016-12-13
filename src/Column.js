/**
 * Created by oteng on 10/8/16.
 */
"use strict";
var Column = (function () {
    function Column(name) {
        this.setName(name);
    }
    Column.prototype.getName = function () {
        return this.name;
    };
    Column.prototype.setName = function (value) {
        this.name = value;
    };
    Column.prototype.getType = function () {
        return this.type;
    };
    Column.prototype.setType = function (value) {
        this.type = value;
    };
    return Column;
}());
exports.Column = Column;