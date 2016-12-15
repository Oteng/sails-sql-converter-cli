#!/usr/bin/env node
"use strict";

/**
 *
 * sails-sql-converter-cli
 *
 * This file is the entry file to the program.
 * It handles the command line option parsing and other checks
 * before starting the actual application.
 *
 * author: Oteng Kwaku <otengkwaku@gmail.com>
 * Licensed under the MIT license.
 *
 */

//external imports
var nopt = require('nopt');
var path = require('path');
var fs = require('fs');

//Options
var knowOpt = {
    "file": [String, null],
    "help": Boolean,
    "out": [String, null]
};
var shortHands = {
    "h": ["--help"],
    "o":["--out"]
};

var options = {};

var optParsed = nopt(knowOpt, shortHands, process.argv, 2);

//print help message if opt contains help flag or no flag is provided
if (optParsed.help || Object.keys(optParsed).length < 2) {
    printHelpMessage();
}

//for any other thing check if file is provided
if(optParsed.file && optParsed.file == 'true')
    printHelpMessage();

//check if path is a valid path and file exist and ends in sql
var fileDes = path.parse(optParsed.file);
if(!fs.existsSync(optParsed.file))
    printHelpMessage("Check if file exist and try again");
if(fileDes.ext != '.sql')
    printHelpMessage("Check if file is a valid sql file");

//if out is provided check if it is a dir and it exists
//assume you are in the root of a sails app
if(optParsed.out && optParsed.out != 'true'){
    if(!fs.existsSync(optParsed.file))
        printHelpMessage("Check if directory exist and try again");
    var stat = fs.statSync(optParsed.out);
    if(!stat.isDirectory()){
        printHelpMessage("Output path is not a valid director");
    }

    options.outputDir = optParsed.out;
}else {
    options.outputDir = process.cwd()
}

options.file = optParsed.file;

//all is fine so far call program
var reader = require('../src/Reader');
var writer = require('../src/Writer');
(function () {
    var Reader = new reader.Reader(options);
    Reader.read(function (error, tableRoot, foreignKeyRoot) {
        if(error){
            console.log(error);
            process.exit(1);
        }else{
            var Writer = new writer.Writer(options);
            Writer.write(tableRoot, foreignKeyRoot);
        }
    })
})();



//helper function
function printHelpMessage(msg) {
    var help = "Usage: sails-sql -f \"schema_file\" \n" +
        "       sails-sql -file \"schema_file\" \n" +
        "-h --help : print this message\n" +
        "-o --out  : specify a custom output director. Director should exist." +
        " If sails-sql is ruined without -o it assume the cwd is the root of a valid sails app";
    console.log((msg)? msg:help);
    process.exit();
}
