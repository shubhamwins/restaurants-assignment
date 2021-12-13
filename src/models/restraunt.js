const mongoose = require("mongoose");

const restrauntSchema = new mongoose.Schema({

    restrauntName: {
        type: String,
        required: true
    },
    restrauntAddress: {
        // type: String,
        // required: true
        street:{
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            requitred: true

        }



    },
     restrauntTiming: {
        //  type: String,
        //  required: true,
    openTiming: {
        type: String,
        required: true
    },
    closeTiming:{
        type: String,
        required: true
    },
},
    image:{
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});
const restraunts = new mongoose.model("restraunts", restrauntSchema);
module.exports = restraunts;