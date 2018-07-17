const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(express.static('public'));

const port = 8383;


//require DB file
require('./db/db');


//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));



const userController = require('./controllers/userController');
app.use('/users', userController);
 
app.get('/', (req, res) => {
	res.render('index.ejs')
})


app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
})

