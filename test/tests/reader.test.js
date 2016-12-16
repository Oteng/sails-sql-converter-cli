/**
 * This file is to test the Reader class
 *
 * The Reader class is the parser that parser the sql file
 * creating a tree or graph for the file
 *
 * author: Oteng Kwaku otengkwaku@gmail.com
 */
var chai = require('chai');
var assert = chai.assert;
var reader = require('../../src/Reader');
var util = require("../../src/Util");

describe('Reader.js', function () {

    describe('Read method', function () {
        it('should produce tree of db.sql', function (done) {
            var Reader = new reader.Reader({file: 'test/fixtures/db.sql'});
            Reader.read(function (err, root, foreignKey) {
                assert.equal(root.getTableName(), 'courses');
                assert.equal(root.getColumnObj().length, 2);
                var column = (root.getColumnObj())[0];
                assert.equal(column.getName(), 'course_name');
                assert.equal(column.getType(), 'string');
                assert.equal(util.Util.countNodes(root), 1);
                done()
            })
        });
        it('should produce tree of db2.sql with foreign key', function (done) {
            var Reader = new reader.Reader({file: 'test/fixtures/db2.sql'});
            Reader.read(function (err, root, foreignKey) {
                util.Util.printForeignTree(foreignKey);
                assert.equal(root.getTableName(), 'tblTest1');
                assert.equal(root.getColumnObj().length, 3);
                var column = (root.getColumnObj())[0];
                assert.equal(column.getName(), 'name');
                assert.equal(column.getType(), 'string');
                assert.equal(util.Util.countNodes(root), 2);

                //foreign key test
                assert.equal(util.Util.countNodes(foreignKey), 1);

                done()
            })
        })
    })

});