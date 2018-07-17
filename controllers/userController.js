const express = require('express');
const router = express.Router();

const User = require('../models/user');


//index route
router.get('/', (req, res) => {
	User.find({}, (err, foundUsers) => {
		if(err) {
			console.log(err, 'error with index route');
		} else {
			res.render('users/index.ejs', {
				users: foundUsers
			})
		}
	})
})


//new route
router.get('/new', (req, res) => {
	res.render('users/new.ejs');
})


//create route
router.post('/', (req, res) => {
	User.create(req.body, (err, newUser) => {
		if(err) {
			console.log(err, 'error with create route');
		} else {
			res.redirect('/users');
		}
	})
})


//edit route
router.get('/:id/edit', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		if(err) {
			console.log(err, 'error in edit route');
		} else {
			res.render('users/edit.ejs', {
				user: foundUser
			});
		}
	})
})


//put route
router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUserInfo) => {
		if(err) {
			console.log(err, 'error in put route');
		} else {
			res.redirect('/users');
		}
	})
})


//delete route
router.delete('/:id', (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, deletedUserInfo) => {
		if(err) {
			console.log(err, 'error with delete route');
		} else {
			res.redirect('/users');
		}
	})
})


//show route
router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		if(err) {
			console.log(err, 'error with show route');
		} else {
			res.render('users/show.ejs', {
				user: foundUser
			})
		}
	})
})







module.exports = router;