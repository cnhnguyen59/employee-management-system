const inquirer = require('inquirer')
const mysql = require('mysql2')
const questions = require('./src/questions')
const functions = require('./src/functions')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'rootpass',
        database: 'employees_db'
    }
)

function init(){
    inquirer
        .prompt(questions.mainMenu)
        .then(data =>{ 
            if (data.action.includes('View')){
                functions.view(data.action)
            } else if (data.action.includes('Add')) {
                console.log(data.action)
            } else {
                console.log('end')
            }

        })
}
