const mainMenu = [{
    type:'list',
    name:'action',
    message:'Pick an action:',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee', 'Quit']
}]

const role = [{
    type:'text',
    name:'title',
    message:'New title:'
},
{
    type:'number',
    name:'salary',
    message:'Salary:'
}]

const employee = [{
    type:'text',
    name:'firstName',
    message: 'First name:'
},
{
    type:'text',
    name:'lastName',
    message: 'Last name:'
}
]

module.exports.mainMenu = mainMenu
module.exports.role = role
module.exports.employee = employee 
