CREATE TABLE IF NOT EXISTS `mydb`.`tblTest1` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `age` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `mydb`.`tblTest2` (
  `id` INT NOT NULL,
  `company` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  `tblTest1_id` INT NOT NULL,
  PRIMARY KEY (`id`, `tblTest1_id`),
  INDEX `fk_tblTest2_tblTest1_idx` (`tblTest1_id` ASC),
  CONSTRAINT `fk_tblTest2_tblTest1`
    FOREIGN KEY (`tblTest1_id`)
    REFERENCES `mydb`.`tblTest1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB