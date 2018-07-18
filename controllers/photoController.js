const express = require('express');
const router = express.Router();

const Photo = require('../models/photo');
const User = require('../models/user')



//INDEX ROUTE
router.get('/', (req, res) => {
	Photo.find({}, (err, foundPhotos) => {
		User.find({}, (err, foundUsers) => {
			if(err) {
			console.log(err, 'error with index route finding photos')
			} else {
				res.render('photos/index.ejs', {
					photos: foundPhotos,
					users: foundUsers
				});
			}
		})
	})
})


//NEW ROUTE
router.get('/new', (req, res) => {
	res.render('photos/new.ejs');
})


//CREATE ROUTE
router.post('/', (req, res) => {
	Photo.create(req.body, (err, newPhoto) => {
		if(err) {
			console.log(err, 'error with creating new photo route');
		} else {
			res.redirect('/photos');
		}
	})
})


//EDIT ROUTE
router.get('/:id/edit', (req, res) => {
	Photo.findById(req.params.id, (err, foundPhoto) => {
		if(err) {
			console.log(err, 'error finding photo by id in edit route');
		} else {
			res.render('photos/edit.ejs', {
				photo: foundPhoto
			})
		}
	})
})



//PUT ROUTE
router.put('/:id', (req, res) => {
	Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto) => {
		if(err) {
			console.log(err, 'error with finding photo to update');
		} else {
			res.redirect('/photos')
		}
	})
})

//DELETE ROUTE
router.delete('/:id', (req, res) => {
	Photo.findByIdAndRemove(req.params.id, (err, deletedPhotoInfo) => {
		if(err) {
			console.log(err, 'error with finding photo to delete');
		} else {
			res.redirect('/photos');
		}
	})
})



//SHOW ROUTE
router.get('/:id', (req, res) => {
	Photo.findById(req.params.id, (err, foundPhoto) => {
		if(err) {
			console.log(err, 'error finding photo in show route');
		} else {
			res.render('photos/show.ejs', {
				photo: foundPhoto
			})
		}
	})
})




module.exports = router;