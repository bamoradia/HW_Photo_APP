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


//new route
router.get('/new', (req, res) => {
	res.render('users/new.ejs');
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
		const foundUser = await User.findById(req.params.id);
		console.log(foundUser)
		res.render('users/show.ejs', {
			user: foundUser
		})

	} catch (err) {
		console.log(err, 'error with user show route')
	}
})







module.exports = router;