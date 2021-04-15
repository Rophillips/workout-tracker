let router = require("express").Router();
let db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {   
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                    //$limit: 7
                }
            }
        } 
    ]).then(dbWorkout => res.json(dbWorkout))
        .catch(err => {res.status(400).json (err)});
});

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id, {
       $push: {
           exercises: req.body
       } 
    }).then(dbWorkout => res.json(dbWorkout))
    .catch(err => {res.json (err)});
});

//create workout
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {res.json (err)});
});

//get workouts in range
router.get("/api/workouts/range", (req, res) => {
    
    db.Workout.find({})
    .limit(7)
    .populate("exercises")
    .then(dbWorkout => {
        res.json(dbWorkout);
        // console.log(" All Workouts");
        // console.log(dbWorkout);
    })
    //.then(workout => )
    .catch(err => {res.json (err)});
});


  
module.exports = router;