const inquirer = require('inquirer')
const questions = require('./src/questions')
const functions = require('./src/functions')


function init(){
    console.log("Main menu")
    functions.getMainMenu()
}

init()
