/**
 * This test tests the Reader.js class to make sure it is reading the
 * data types and converting them correctly
 */
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
        it('should produce column with correct data types', function (done) {
            var Reader = new reader.Reader({file: 'test/fixtures/datatypes.sql'});
            var expectedDatatypeArr = [
                ['varchar', 'string'],
                ['char', 'string'],
                ['text', 'text'],
                ['blob', 'text'],
                ['tinyblob', 'string'],
                ['tinytext', 'string'],
                ['smallint', 'integer'],
                ['tinyint', 'integer'],
                ['mediumint', 'integer'],
                ['bigint', 'integer'],
                ['float', 'float'],
                ['double', 'float'],
                ['decimal', 'float'],
                ['mediumblob', 'mediumtext'],
                ['mediumtext', 'mediumtext'],
                ['longblob', 'longtext'],
                ['longtext', 'longtext'],
                ['date', 'date'],
                ['datetime', 'datetime'],
                ['binary', 'binary']
            ];
            Reader.read(function (err, root, foreignKey) {
                var columns = root.getColumnObj();
                assert.equal(root.getTableName(), 'tbTest_datatype');
                assert.equal(columns.length, 20);

                assert.equal(columns[0].getName(), expectedDatatypeArr[0][0]);
                assert.equal(columns[0].getType(), expectedDatatypeArr[0][1]);
                assert.equal(columns[1].getName(), expectedDatatypeArr[1][0]);
                assert.equal(columns[1].getType(), expectedDatatypeArr[1][1]);
                assert.equal(columns[2].getName(), expectedDatatypeArr[2][0]);
                assert.equal(columns[2].getType(), expectedDatatypeArr[2][1]);
                assert.equal(columns[3].getName(), expectedDatatypeArr[3][0]);
                assert.equal(columns[3].getType(), expectedDatatypeArr[3][1]);
                assert.equal(columns[4].getName(), expectedDatatypeArr[4][0]);
                assert.equal(columns[4].getType(), expectedDatatypeArr[4][1]);
                assert.equal(columns[5].getName(), expectedDatatypeArr[5][0]);
                assert.equal(columns[5].getType(), expectedDatatypeArr[5][1]);
                assert.equal(columns[6].getName(), expectedDatatypeArr[6][0]);
                assert.equal(columns[6].getType(), expectedDatatypeArr[6][1]);
                assert.equal(columns[7].getName(), expectedDatatypeArr[7][0]);
                assert.equal(columns[7].getType(), expectedDatatypeArr[7][1]);
                assert.equal(columns[8].getName(), expectedDatatypeArr[8][0]);
                assert.equal(columns[8].getType(), expectedDatatypeArr[8][1]);
                assert.equal(columns[9].getName(), expectedDatatypeArr[9][0]);
                assert.equal(columns[9].getType(), expectedDatatypeArr[9][1]);
                assert.equal(columns[10].getName(), expectedDatatypeArr[10][0]);
                assert.equal(columns[10].getType(), expectedDatatypeArr[10][1]);
                assert.equal(columns[11].getName(), expectedDatatypeArr[11][0]);
                assert.equal(columns[11].getType(), expectedDatatypeArr[11][1]);
                assert.equal(columns[12].getName(), expectedDatatypeArr[12][0]);
                assert.equal(columns[12].getType(), expectedDatatypeArr[12][1]);
                assert.equal(columns[13].getName(), expectedDatatypeArr[13][0]);
                assert.equal(columns[13].getType(), expectedDatatypeArr[13][1]);
                assert.equal(columns[14].getName(), expectedDatatypeArr[14][0]);
                assert.equal(columns[14].getType(), expectedDatatypeArr[14][1]);
                assert.equal(columns[15].getName(), expectedDatatypeArr[15][0]);
                assert.equal(columns[15].getType(), expectedDatatypeArr[15][1]);
                assert.equal(columns[16].getName(), expectedDatatypeArr[16][0]);
                assert.equal(columns[16].getType(), expectedDatatypeArr[16][1]);
                assert.equal(columns[17].getName(), expectedDatatypeArr[17][0]);
                assert.equal(columns[17].getType(), expectedDatatypeArr[17][1]);
                assert.equal(columns[18].getName(), expectedDatatypeArr[18][0]);
                assert.equal(columns[18].getType(), expectedDatatypeArr[18][1]);
                assert.equal(columns[19].getName(), expectedDatatypeArr[19][0]);
                assert.equal(columns[19].getType(), expectedDatatypeArr[19][1]);

                done()
            })
        });
    })

});