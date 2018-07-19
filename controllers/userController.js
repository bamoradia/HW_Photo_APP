const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Photo = require('../models/photo')

//index route
router.get('/', async (req, res) => {
	try {
		const foundUsers = await User.find({});
		res.render('users/index.ejs', {
			users: foundUsers
		})
	} catch (err) {
		console.log(err, 'error with user index route')
	}
})

//login route
router.get('/login', (req, res) => {
	if(req.session.login != true) {
		res.render('users/login.ejs')
	} else {
		res.redirect('/users/' + req.session.userId)
	}
	
})

//login attempt route
router.post('/login', async (req, res) => {
	//check if login credentials match existing information
	//if they do then, redirect to their user show page
	//otherwise redirect to login page with error message of wrong credentials
	try{
		const foundUser = await User.find({username: req.body.username})
		if(foundUser[0].username == req.body.username) {
			if(foundUser[0].password === req.body.password) {
				req.session.username = req.body.username
				req.session.login = true;
				req.session.userId = foundUser[0].id;
				res.redirect('/users/'+foundUser[0].id)
			} else {
				console.log('wrong password')
				req.session.login = false;
				res.redirect('/users/login');
			}
		} else{
			console.log('wrong username')
			req.session.login = false;
			res.redirect('/users/login');
		}
	} catch (err) {
		console.log(err, 'error with user login post route')
	}

})


//new route
router.get('/new', (req, res) => {
	if(req.session.login != true) {
		res.render('users/new.ejs');
	} else {
		res.redirect('/users/' + req.session.userId)
	}
})


//create route
router.post('/', async (req, res) => {
	try {
		const newUser = await User.create(req.body);
		res.redirect('/users');
	} catch (err) {
		console.log(err, 'error with user create route');
	}
})


//edit route
router.get('/:id/edit', async(req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		res.render('users/edit.ejs', {
			user: foundUser
		});
	} catch (err) {
		console.log(err, 'error with user edit route')
	} 
})


//put route
router.put('/:id', async (req, res) => {
	try {
		const updatedUserInfo = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.redirect('/users');
	} catch (err) {
		console.log(err, 'error with user put route')
	}

})


//delete route
router.delete('/:id', async (req, res) => {
	try {
		const deletedUserInfo = await User.findByIdAndRemove(req.params.id);
		res.redirect('/users');
	} catch (err) {
		console.log(err, 'error with user delete route');
	}
})


//show route
router.get('/:id', async (req, res) => {
	try {
		console.log(req.session)
		console.log(!!req.session.login);
		if(!!req.session.login === true) {
			const foundUser = await User.findById(req.params.id);
			if(req.session.userId === foundUser.id) {
				res.render('users/show.ejs', {
					user: foundUser,
					owner: true
				})
			} else {
				res.render('users/show.ejs', {
					user: foundUser,
					owner: false
				})
			}
		} else {
			const foundUser = await User.findById(req.params.id);
			res.render('users/show.ejs', {
				user: foundUser,
				owner: false
			})
		}
	} catch (err) {
		console.log(err, 'error with user show route')
	}
})







module.exports = router;