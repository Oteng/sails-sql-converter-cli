"use strict";
/**
 * Created by oteng on 10/8/16.
 */
var Util = (function () {
    function Util() {
    }
    Util.printTree = function (root) {
        if (root.getNext() == null)
            return console.log(root.getKeyword(), root.getTableName(), root.getColumnObj());
        else {
            console.log(root.getKeyword(), root.getTableName(), root.getColumnObj());
            return this.printTree(root.getNext());
        }
    };
    Util.printForeignTree = function (root) {
        if(root == null)
            return;
        if (root.getNext() == null)
            return console.log(root.getName(), root.getModel(), root.getColl());
        else {
            console.log(root.getName(), root.getModel(), root.getColl());
            return this.printForeignTree(root.getNext());
        }
    };
    Util.getLast = function (node) {
        if (node.getNext() == null)
            return node;
        else
            return this.getLast(node.getNext());
    };
    Util.findColl = function (name, root) {
        var coll = [];
        var tmp = root;
        while (true) {
            if (tmp == null)
                return coll;
            if (name == tmp.getColl())
                coll.push(tmp);
            if (tmp.getNext() == null)
                return coll;
            tmp = tmp.getNext();
        }
    };
    Util.findModel = function (name, foreignKeyTree) {
        var model = [];
        var tmp = foreignKeyTree;
        while (true) {
            if (tmp == null)
                return model;
            if (name == tmp.getModel())
                model.push(tmp);
            if (tmp.getNext() == null)
                return model;
            tmp = tmp.getNext();
        }
    };
    return Util;
}());
exports.Util = Util;