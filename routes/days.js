var dayRouter = require('express').Router();
var attractionRouter = require('express').Router({
    mergeParams: true
});
var models = require('../models');

// GET /days
dayRouter.get('/', function(req, res, next) {
    // serves up all days as json
    models.Day
        .find({}, function(err, days) {
            if (err) return next(err);
            res.json(days);
        });

});
// POST /days
dayRouter.post('/', function(req, res, next) {
    // creates a new day and serves it as json
    var number = req.body.number;

    models.Day.create({
        number: number
    }, function(err, data) {
        if (err) return next(err)
        console.log(data)
        res.json(data._id)
    })
});
// GET /days/:id
dayRouter.get('/:id', function(req, res, next) {
    var id = req.params.id
        // serves a particular day as json
    models.Day
        .findById(id, function(err, day) {
            if (err) return next(err)
            res.json(day)
        })
});
// DELETE /days/:id
dayRouter.delete('/:id', function(req, res, next) {
    // deletes a particular day
    var id = req.params.id
    models.Day
        .remove({
            _id: id
        }, function(err, day) {
            if (err) return next(err)
            res.json('successful')
        })
});

dayRouter.use('/:id', attractionRouter);

// POST /days/:id/hotel
attractionRouter.post('/hotel', function(req, res, next) {
    // creates a reference to the hotel
    var name = req.body.name
    var dayId = req.params.id
    models.Hotel
        .find({
            name: name
        }, function(err, hotels) {
            if (err) next(err)
            var hotelId = hotels[0]._id
            models.Day
                .findByIdAndUpdate(dayId, {
                    $set: {
                        'hotel': hotelId
                    }
                }, function(err, day) {
                    if (err) next(err)
                    res.json(hotelId)
                })
        })
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function(req, res, next) {
    // deletes the reference of the hotel
    var dayId = req.params.id
    models.Day
        .findByIdAndUpdate(dayId, {
            $unset: {
                'hotel': ''
            }
        }).exec(function(err, day) {
            if (err) next(err)
            res.json("successful")
        })

});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function(req, res, next) {
    // creates a reference to a restaurant
    var name = req.body.name
    var dayId = req.params.id
    models.Restaurant
        .find({
            name: name
        }, function(err, restaurants) {
            if (err) next(err)
            var restaurantId = restaurants[0]._id
            models.Day
                .findByIdAndUpdate(dayId, {
                    $push: {
                        'restaurants': restaurantId
                    }
                }, function(err, day) {
                    if (err) next(err)
                    res.json(restaurantId)
                })
        })

});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurants/:restId', function(req, res, next) {
    // deletes a reference to a restaurant
    var dayId = req.params.id
    var restaurantId = req.params.restId
    models.Day
        .findByIdAndUpdate(dayId, {
            $pull: {
                'restaurants': restaurantId
            }
        }).exec(function(err, day) {
            if (err) next(err)
            res.json("successful")
        })
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function(req, res, next) {
    // creates a reference to a thing to do
    var name = req.body.name
    var dayId = req.params.id
    console.log(name)
    models.ThingToDo
        .find({
            name: name
        }, function(err, things) {
            if (err) next(err)
            var thingId = things[0]._id
            console.log(thingId)
            models.Day
                .findByIdAndUpdate(dayId, {
                    $push: {
                        'thingsToDo': thingId
                    }
                }, function(err, day) {
                    if (err) next(err)
                    res.json("successful")
                })
        })

});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function(req, res, next) {
    // deletes a reference to a thing to do
});

module.exports = dayRouter;