const inquirer = require('inquirer')
const questions = require('./questions')


function view(action){
    let option = action.split(' ')

    console.log(option)

    /* dbr.query (`SELECT * FROM ${arr[2]}`, (err, results) =>
    err ? console.log(err) : console.log(results)) */
}

function add(action){
    let option = action.split(' ')

   /*  dbr.query (`SELECT * FROM ${arr[2]}`, (err, results) =>
    err ? console.log(err) : console.log(results)) */
}

module.exports.view = view;