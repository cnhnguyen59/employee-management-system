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

const update = [{
    type: 'list',
    name:'employee',
    message:'Which employee would you like to update?',
    choices: []    
},
{
    type: 'list',
    name:'newRole',
    message:'Employee\'s new role:',
    choices: ['Developer', 'Developer Team Lead', 'Sales Specialist']
}
]

module.exports.mainMenu = mainMenu
module.exports.role = role
module.exports.employee = employee 