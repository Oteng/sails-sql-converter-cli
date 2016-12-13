#sails-sql-converter-cli
###Description:
This is a command line tool for generating sails models from sql scheme. It works by taking an sql scheme file
eg: 
````
    CREATE TABLE IF NOT EXISTS `mydb`.`User` (
      `user_id` INT NOT NULL,
      `username` VARCHAR(45) NULL,
      `password` VARCHAR(45) NULL,
      `type` VARCHAR(45) NULL,
      PRIMARY KEY (`user_id`))
      
````
and produces a sails model
````
    //User.js
    
    module.exports = {
        attributes: {
            username: 'string',
            password: 'string',
            type: 'string',
        }
    };
````

