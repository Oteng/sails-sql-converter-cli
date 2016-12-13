"use strict";
/**
 * Created by oteng on 10/8/16.
 */
var Table = (function () {
    function Table(keyword) {
        /**
         * This class represent a node in the try of parsing the
         * sql file
         * This tree can be traves only in one direction.
         * @keyword: Represent the keyword just read
         * @next: Represent the next node in the line; null if the tree ends
         * @action: Represent the action to be taken. This action may have been taken already
         * @value: represent the input the action needs in order to work
         */
        this.next = null;
        this.columns = [];
        this.keyword = keyword;
    }
    Table.prototype.getKeyword = function () {
        return this.keyword;
    };
    Table.prototype.getTableName = function () {
        return this.tableName;
    };
    Table.prototype.setTableName = function (value) {
        this.tableName = value;
    };
    Table.prototype.addColumnObj = function (obj) {
        // console.log(t)
        this.columns.push(obj);
        // this.columns = t;
    };
    Table.prototype.getColumnObj = function () {
        // this.columns.pop();
        return this.columns;
    };
    Table.prototype.getLastColumn = function () {
        return this.columns[(this.columns.length - 1)];
    };
    Table.prototype.getNext = function () {
        return this.next;
    };
    Table.prototype.setNext = function (next) {
        this.next = next;
    };
    return Table;
}());
exports.Table = Table;