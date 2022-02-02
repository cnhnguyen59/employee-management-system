const inquirer = require('inquirer')
const questions = require('./src/questions')
const functions = require('./src/functions')


function init(){
    console.log("Main menu")
    functions.getMainMenu()
    /* inquirer
        .prompt(questions.mainMenu)
        .then(data =>{ 
            if(data.action == 'Quit'){
                console.log('Goodbye!');
            }else if (data.action.includes('View')){
                functions.view(data.action)
            } else if (data.action.includes('Add')) {
                functions.add(data.action)
            } else {
                functions.update()
            }
        }) */
}

init()
