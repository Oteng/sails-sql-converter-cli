var chai = require('chai');
var assert = chai.assert;

describe('Index.js File Test', function () {
    var indexFile = require('../../index.js');
    process.env.NODE_ENV = "test";
    describe('options', function () {
        it('output help message if -h is provided', function () {
            var output = indexFile.init({help: true, argv:{}});
            assert.equal(output, "Usage: sails-sql -f \"schema_file\" \n" +
                "       sails-sql -file \"schema_file\" \n" +
                "-h --help : print this message\n" +
                "-o --out  : specify a custom output director. Director should exist." +
                " If sails-sql is ruined without -o it assume the cwd is the root of a valid sails app")
        });

        it('output help if no option is provided', function () {
            var output = indexFile.init({argv:{}});
            assert.equal(output, "Usage: sails-sql -f \"schema_file\" \n" +
                "       sails-sql -file \"schema_file\" \n" +
                "-h --help : print this message\n" +
                "-o --out  : specify a custom output director. Director should exist." +
                " If sails-sql is ruined without -o it assume the cwd is the root of a valid sails app")
        });

        it('output help message if file is not valid', function () {
            var output = indexFile.init({file: 'true', argv:{}});
            assert.equal(output, "Usage: sails-sql -f \"schema_file\" \n" +
                "       sails-sql -file \"schema_file\" \n" +
                "-h --help : print this message\n" +
                "-o --out  : specify a custom output director. Director should exist." +
                " If sails-sql is ruined without -o it assume the cwd is the root of a valid sails app")
        });

        it('output error if folder file don\'st exist', function () {
            var output = indexFile.init({file: '../fixtures/testdb.sql', argv:{}});
            assert.equal(output, "Check if file exist and try again")
        });

        it('output error if folder file don\'st exist', function () {
            var output = indexFile.init({file: '../fixtures/testdb.sql', argv:{}});
            assert.equal(output, "Check if file exist and try again")
        });

    })
});