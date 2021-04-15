let mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
    {

    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Enter an exercise type"
            },
            name: {
                type: String,
                trim: true,
                required: "Enter an exercise name"
            },
            duration: {
                type: Number,
                trim: true,
                required: "Enter exercise duration in minutes"
            },
            weight: {
                type: Number
            },

            reps: {
                type: Number
            },

            sets: {
                type: Number
            },

            distance: {
                type: Number
            }
        }
    ]
    //adding virtuals to schema to get total duration - mongoose.js virtual tutorials
},{ toJSON: { virtuals: true }} );

//virtual property to get total exercise duration 
WorkoutSchema.virtual("totalDuration").get(function() {
    return this.exercises.reduce((total, exercise)=>{
        return total + exercise.duration
    },0) +1;
})







const Workout = mongoose.model("Workout", WorkoutSchema);
  
module.exports = Workout;