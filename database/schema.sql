-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema prescriptionOnline
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema prescriptionOnline
-- -----------------------------------------------------
DROP DATABASE `prescriptionOnline`;
CREATE SCHEMA IF NOT EXISTS `prescriptionOnline` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `prescriptionOnline` ;

-- -----------------------------------------------------
-- Table `prescriptionOnline`.`Account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prescriptionOnline`.`Account` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` BINARY(60) NOT NULL,
  `fullname` VARCHAR(45) NULL DEFAULT NULL,
  `isRoot` ENUM('1', '0') NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `prescriptionOnline`.`InventoryType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prescriptionOnline`.`InventoryType` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `prescriptionOnline`.`Inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prescriptionOnline`.`Inventory` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `itemName` VARCHAR(45) NOT NULL,
  `type` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL,
  `createTime` DATETIME NOT NULL,
  `updateTime` DATETIME NOT NULL,
  `createdBy` INT(11) NOT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_Inventory_Account1`
    FOREIGN KEY (`createdBy`)
    REFERENCES `prescriptionOnline`.`Account` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Inventory_InventoryType1`
    FOREIGN KEY (`type`)
    REFERENCES `prescriptionOnline`.`InventoryType` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `prescriptionOnline`.`PatientInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prescriptionOnline`.`PatientInfo` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `patientName` VARCHAR(100) NOT NULL,
  `patientPhone` INT NULL,
  `patientAge` INT NULL,
  `patientAddress` VARCHAR(200) NULL,
  `createdDate` DATETIME NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `prescriptionOnline`.`Prescription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prescriptionOnline`.`Prescription` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `patientID` INT(11) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `dateInput` DATETIME NOT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_Prescription_PatientInfo1`
    FOREIGN KEY (`patientID`)
    REFERENCES `prescriptionOnline`.`PatientInfo` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `prescriptionOnline`.`PrescriptionInventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prescriptionOnline`.`PrescriptionInventory` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `prescriptionID` INT(11) NOT NULL,
  `inventoryID` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL,
  `createdBy` INT(11) NOT NULL,
  `createdTime` DATETIME NOT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_PrescriptionInventory_Account1`
    FOREIGN KEY (`createdBy`)
    REFERENCES `prescriptionOnline`.`Account` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PrescriptionInventory_Inventory1`
    FOREIGN KEY (`inventoryID`)
    REFERENCES `prescriptionOnline`.`Inventory` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PrescriptionInventory_Prescription1`
    FOREIGN KEY (`prescriptionID`)
    REFERENCES `prescriptionOnline`.`Prescription` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
