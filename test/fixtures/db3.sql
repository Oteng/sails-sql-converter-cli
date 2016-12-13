CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `user_id` INT NOT NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `mydb`.`date` (
  `date_id` INT NOT NULL,
  `date` VARCHAR(45) NULL,
  `time` VARCHAR(45) NULL,
  PRIMARY KEY (`date_id`))
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `mydb`.`Expenses` (
  `exp_id` INT NOT NULL,
  `total` VARCHAR(45) NULL,
  `water` VARCHAR(45) NULL,
  `food` VARCHAR(45) NULL,
  `feed_left` VARCHAR(45) NULL,
  `date_id` INT NOT NULL,
  PRIMARY KEY (`exp_id`, `date_id`),
  INDEX `fk_Expenses_date1_idx` (`date_id` ASC),
  CONSTRAINT `fk_Expenses_date1`
    FOREIGN KEY (`date_id`)
    REFERENCES `mydb`.`date` (`date_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `mydb`.`Eggs` (
  `eggs_id` INT NOT NULL,
  `good` INT NULL,
  `cracks` INT NULL,
  `date_id` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  `sales_id` INT NOT NULL,
  `pices` VARCHAR(45) NULL,
  PRIMARY KEY (`eggs_id`, `user_id`, `sales_id`),
  INDEX `fk_Eggs_Account_idx` (`user_id` ASC),
  INDEX `fk_Eggs_Sales1_idx` (`sales_id` ASC),
  CONSTRAINT `fk_Eggs_Account`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Eggs_Sales1`
    FOREIGN KEY (`sales_id`)
    REFERENCES `mydb`.`Sales` (`sales_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `mydb`.`Other_exp` (
  `other_exp_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `amount` VARCHAR(45) NULL,
  `exp_id` INT NOT NULL,
  PRIMARY KEY (`other_exp_id`, `exp_id`),
  INDEX `fk_Other_exp_Expenses1_idx` (`exp_id` ASC),
  CONSTRAINT `fk_Other_exp_Expenses1`
    FOREIGN KEY (`exp_id`)
    REFERENCES `mydb`.`Expenses` (`exp_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `mydb`.`Sales` (
  `sales_id` INT NOT NULL,
  `cash_sales` VARCHAR(45) NULL COMMENT '	',
  `12_crates` VARCHAR(45) NULL,
  `14_crates` VARCHAR(45) NULL,
  `15_crates` VARCHAR(45) NULL,
  `total_crate` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  `date_id` INT NOT NULL,
  PRIMARY KEY (`sales_id`, `user_id`, `date_id`),
  INDEX `fk_Sales_User1_idx` (`user_id` ASC),
  INDEX `fk_Sales_date1_idx` (`date_id` ASC),
  CONSTRAINT `fk_Sales_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Sales_date1`
    FOREIGN KEY (`date_id`)
    REFERENCES `mydb`.`date` (`date_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `mydb`.`chicken` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `alive` VARCHAR(45) NULL,
  `mortality` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  `date_date_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `date_date_id`),
  INDEX `fk_chicken_User1_idx` (`user_id` ASC),
  INDEX `fk_chicken_date1_idx` (`date_date_id` ASC),
  CONSTRAINT `fk_chicken_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chicken_date1`
    FOREIGN KEY (`date_date_id`)
    REFERENCES `mydb`.`date` (`date_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `mydb`.`Money` (
  `id` INT NOT NULL,
  `open` VARCHAR(45) NULL,
  `close` VARCHAR(45) NULL,
  `at_hand` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  `date_date_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `date_date_id`),
  INDEX `fk_Money_User1_idx` (`user_id` ASC),
  INDEX `fk_Money_date1_idx` (`date_date_id` ASC),
  CONSTRAINT `fk_Money_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Money_date1`
    FOREIGN KEY (`date_date_id`)
    REFERENCES `mydb`.`date` (`date_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB