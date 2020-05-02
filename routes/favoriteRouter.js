const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const cors = require('./cors');
const Favorites = require('../models/favorites');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({ user: req.user._id})    
    .populate('user')
    .populate('dishes')
    .then((favorite) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({ user: req.user._id})
    .then((favorites) => {
        if (favorites != null) {
            console.log("Posting new dishes to favorites");
            req.body.forEach((favorite) => {
                if (favorites.dishes.indexOf(favorite._id) == -1) {
                    favorites.dishes.push(favorite);
                }
                else {
                    console.log("Already a favorite!");
                }
            });
            favorites.save()
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);  
            })
        }
        else {
            console.log("Creating new Favorite Document");
            Favorites.create({
                user: req.user._id,
                dishes: req.body
            })
            .then((favorites) => {
                console.log('Favorites created');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);                
            }, (err) => next(err))
            .catch((err) => next(err));
        }
    })
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.remove({ user: req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

favoriteRouter.route('/:dishId')
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({ user: req.user._id})
    .then((favorites) => {
        if (favorites != null) {
            console.log("Found favorites document");
            if (favorites.dishes.indexOf(req.params.dishId) !== -1) {
                console.log("Dish already a favorite")
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }
            else {
                console.log("Pushed new favorite onto favorite document");
                favorites.dishes.push(req.params.dishId);
                favorites.save()
                .then((favorites) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorites);  
                })
            }
        }
        else {
            console.log("Creating new Favorite Document");
            Favorites.create({
                user: req.user._id,
                dishes: [req.params.dishId]
            })
            .then((favorites) => {
                console.log('Favorites created');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);                
            }, (err) => next(err))
            .catch((err) => next(err));
        }
    })
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({ user: req.user._id})
    .then((favorites) => {
        if (favorites != null) {
            favorites.dishes.remove(req.params.dishId);
            favorites.save()
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(favorites);
            }, (err) => next(err))
        }
        else {
            console.log("No favorites");
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        }
    })
    .catch((err) => next(err));
})

module.exports = favoriteRouter;