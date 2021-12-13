const mongoose = require("mongoose");

const restrauntSchema = new mongoose.Schema({

    restrauntName: {
        type: String,
        required: true
    },
    restrauntAddress: {
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
    restrauntopeningTiming: {
        type: String,
        required: true
    },
    restrauntclosingTiming:{
        type: String,
        required: true
    },
},
    
    createAt: {
        type: Date,
        default: Date.now
    },
});
const restraunts = new mongoose.model("restraunts", restrauntSchema);
module.exports = restraunts;