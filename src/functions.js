const inquirer = require('inquirer')
const questions = require('./questions')
const mysql = require('mysql2')
const util = require('util')
const Employee = require('../../../week10/team-profile-generator/lib/employee')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'rootpass',
        database: 'employees_db'
    }
)

function view(action){
    let option = action.split(' ')[2].slice(0,-1)

    db.query (`SELECT * FROM ${option}`, (err, results) =>
    err ? console.log(err) : console.log(results))

    getMainMenu()
}

function add(action){
    if(action.includes('department')){

        inquirer
            .prompt([{
                type:'text',
                name:'newDep',
                message:'Name of new department:'
            }])
            .then(data =>
                {
                    db.query(`INSERT INTO department (department_name) VALUES ('${data.newDep}')`, (err) => {
                        err ? console.log(err) : console.log('New department added')
                    }) 
                })
        
        getMainMenu()
    } else if (action.includes('role')) {
        addRole()
        getMainMenu()
    } else {
        addEmployee()
        getMainMenu()
    }
}

function update(){
    db.query (`SELECT first_name, last_name FROM employee`, (err, rows)=>{
        if (err){
            console.log('Error occurred getting data')
        }else{
            let employees = setValue(rows)
            let employeesArr = employees.map((employee => {
                return `${employee.first_name} ${employee.last_name}`
            }))

            db.query (`SELECT id, title, department_id FROM role`, (err, rows) => {
                if (err){
                    console.log('Error occured getting data')
                } else {
                    let roleInfo = setValue(rows);
                    let departmentIdArr = roleInfo.map((role => {
                        return role.department_id
                    }))
                    let titleArr = roleInfo.map((role => {
                        return role.title
                    }))

            let questions = [{
                type: 'list',
                name:'employee',
                message:'Which employee would you like to update?',
                choices: employeesArr  
            },
            {
                type: 'list',
                name:'newRole',
                message:'Employee\'s new role:',
                choices: titleArr
            }]

            employeesArr.unshift('None')

            questions.push({
                type: 'list',
                name:'manager',
                message:'Manager:',
                choices: employeesArr
            })
            
            inquirer
                .prompt(questions)
                .then(data =>{
                    let depId = departmentIdArr[titleArr.indexOf(data.newRole)]
                    let roleId = titleArr.indexOf(data.newRole) + 1
                    let managerId = employeesArr.indexOf(data.manager)
                             if (managerId == 0){
                                managerId = null
                            }
                    let employeeId = employeesArr.indexOf(data.employee)
                    db.query(`UPDATE employee SET role_id=${roleId}, department_id=${depId}, manager_id=${managerId} WHERE id=${employeeId}`, (err) =>{
                        err ? console.log('Error updating employee') : `Employee information has been updated.`
                    })
                })
        }})
    }})

    getMainMenu()
}

function addRole(){
    db.query (`SELECT department_name FROM department`, (err, rows) => {
        if (err){
            console.log('Error occured getting departments')
        } else {
            let departmentArr = setValue(rows);
            departmentArr = departmentArr.map((department => {
                return department.department_name
            }))

            questions.role.push({
                type:'list',
                name:'department',
                message:'Select department:',
                choices: departmentArr
            })

            inquirer
                .prompt(questions.role)
                .then(data =>
                    {
                        let dep_id = departmentArr.indexOf(data.department) + 1
                        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${data.title}', '${data.salary}', ${dep_id})`, (err) => {
                            err ? console.log(err) : console.log('New role added')
                        }) 
                    })
        }
    })
}

function addEmployee(){

    db.query (`SELECT id, title, department_id FROM role`, (err, rows) => {
        if (err){
            console.log('Error occured getting data')
        } else {
            let roleInfo = setValue(rows);
            let departmentIdArr = roleInfo.map((role => {
                return role.department_id
            }))
            let titleArr = roleInfo.map((role => {
                return role.title
            }))


            db.query (`SELECT first_name, last_name FROM employee`, (err, rows)=>{
                if (err){
                    console.log('Error occurred getting data')
                }else{

                    let employees = setValue(rows)
                    let managersArr = employees.map((employee => {
                        return `${employee.first_name} ${employee.last_name}`
                    }))
                    managersArr.unshift('None')
                    
                    questions.employee.push({
                        type:'list',
                        name:'title',
                        message:'Select role:',
                        choices: titleArr
                    }, {
                        type: 'list',
                        name: 'manager',
                        Message: 'Select manager:',
                        choices: managersArr
                    })

                   inquirer
                    .prompt(questions.employee)
                    .then(data =>
                        {  
                            console.log('after inquirer' + managersArr)
                            let depId = departmentIdArr[titleArr.indexOf(data.title)]
                            let roleId = titleArr.indexOf(data.title) + 1
                            let managerId = managersArr.indexOf(data.manager)
                            console.log(managerId)
                             if (managerId == 0){
                                managerId = null
                            } 
                            db.query(`INSERT INTO employee (first_name, last_name, role_id, department_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}',${roleId}, ${depId}, ${managerId})`, (err) => {
                                err ? console.log(err) : console.log('New employee added')
                            }) 
                        })
                }
            })
        
        }
    }
    )
}

function setValue(value){
    let arr = value;
    return arr;
}

function getMainMenu(){
    inquirer
        .prompt(questions.mainMenu)
        .then(data =>{ 
            if(data.action == 'Quit'){
                console.log('Goodbye!')
                process.exit();
            }else if (data.action.includes('View')){
                view(data.action)
            } else if (data.action.includes('Add')) {
                add(data.action)
            } else {
                update()
            }
        })
}

module.exports.view = view;
module.exports.add = add;
module.exports.getMainMenu = getMainMenu;