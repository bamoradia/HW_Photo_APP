const express = require('express');
const router = express.Router();

const Photo = require('../models/photo');
const User = require('../models/user')



//INDEX ROUTE
router.get('/', async (req, res) => {
	try {
		const foundPhotos = await Photo.find({});
		const foundUsers = await User.find({});
		res.render('photos/index.ejs', {
			photos: foundPhotos,
			users: foundUsers
		});
	} catch (err) {
		console.log(err, 'error with photos index route')
	}
})


//NEW ROUTE
router.get('/new', async (req, res) => {

	try {
		const allUsers = await User.find({});
		res.render('photos/new.ejs', {
			users: allUsers
		})
	} catch (err) {
		console.log(err, 'error with photos new route')
	}
})


//CREATE ROUTE
router.post('/', async (req, res) => {
	try {
		const newPhot = await Photo.create(req.body);	
		res.redirect('/photos');
	} catch (err) {
		console.log(err, 'error with photos create route')
	}

})


//EDIT ROUTE
router.get('/:id/edit', async (req, res) => {
	try {
		const foundPhoto = await Photo.findById(req.params.id);
		res.render('photos/edit.ejs', {
			photo: foundPhoto
		})
	} catch (err) {
		console.log(err, 'error with photos edit route')
	}
})



//PUT ROUTE
router.put('/:id', async (req, res) => {
	try {
		const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.redirect('/photos');
	} catch (err) {
		console.log(err, 'error with photos put route');
	}
})

//DELETE ROUTE
router.delete('/:id', async (req, res) => {
	try {
		const deletedPhotoInfo = await Photo.findByIdAndRemove(req.params.id);
		res.redirect('/photos');
	} catch (err) {
		console.log(err, 'error with photo delete route');
	}

})



//SHOW ROUTE
router.get('/:id', async (req, res) => {
	try {
		const foundPhoto = await Photo.findById(req.params.id);
		const foundUser = await User.findOne({"photos._id": req.params.id});
		res.render('photos/show.ejs', {
			photo: foundPhoto//,
			//user: foundUser
		});
	} catch (err) {
		console.log(err, 'error with photo show route')
	}

})






module.exports = router;