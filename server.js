const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session')

app.use(express.static('public'));

//setup session
app.use(session({
	secret: 'this is a random secret string that you make up',
	resave: false, //only save when the session object has been modified
	saveUninitialized: false //user for login sessions, we only want to save when we modify the session
}));

const port = 8383;


//require DB file
require('./db/db');


//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));



const userController = require('./controllers/userController');
app.use('/users', userController);

const photoController = require('./controllers/photoController');
app.use('/photos', photoController);
 
app.get('/', (req, res) => {
	res.render('index.ejs')
})


app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
})

