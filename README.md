#sails-sql-converter-cli
![enter image description here](http://sailsjs.org/images/bkgd_squiddy.png)
###Description:
This is a command line tool for generating sails models from sql scheme.
Design your database using any UML software you want export your design
to sql and use this tool to generate sails models.

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)


## Installation ##

Linux or MacOS

```bash
$ npm install sails-sql-converter-cli -g
```

Microsoft Windows

```bash
$ npm install sails-sql-converter-cli -g
```

## Usage ##

```bash
$ sails-sql -f newdb.sql
```

## Options ##
```
-h --help : show a help massage
-o --out  : specify where the generated files should be saved.
            Defaults to the location where the command is runned
-f --file : specify the sql file
````
### Supported SQL Keywords
```
Table
Create
Primary Key
Foreign Key
References
```
### Data Types Mapping
```
varchar -> string
int -> interger
```



## Example

````
    $ cat user.sql
   /*
    CREATE TABLE IF NOT EXISTS `mydb`.`User` (
      `user_id` INT NOT NULL,
      `username` VARCHAR(45) NULL,
      `password` VARCHAR(45) NULL,
      `type` VARCHAR(45) NULL,
      PRIMARY KEY (`user_id`))
   */

$ sails-sql -f user.sql

   /*
    User.js

    module.exports = {
        attributes: {
            username: 'string',
            password: 'string',
            type: 'string',
        }
    };
   */
````

