/**
 * Created by oteng on 10/8/16.
 */
"use strict";
var ForeignKey = (function () {
    function ForeignKey(name, model, coll) {
        this.next = null;
        this.setName(name);
        this.setModel(model);
        this.setColl(coll);
    }
    ForeignKey.prototype.getName = function () {
        return this.name;
    };
    ForeignKey.prototype.setName = function (value) {
        this.name = value;
    };
    ForeignKey.prototype.getModel = function () {
        return this.model;
    };
    ForeignKey.prototype.setModel = function (value) {
        this.model = value;
    };
    ForeignKey.prototype.getColl = function () {
        return this.coll;
    };
    ForeignKey.prototype.setColl = function (value) {
        this.coll = value;
    };
    ForeignKey.prototype.getNext = function () {
        return this.next;
    };
    ForeignKey.prototype.setNext = function (obj) {
        this.next = obj;
    };
    return ForeignKey;
}());
exports.ForeignKey = ForeignKey;