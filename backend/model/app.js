const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DataSchema = new Schema ({
    name: {type: String},
    last: {type: String},
    buy: {type: String},
    sell: {type: String},
    volume: {type: String},
    base_unit: {type: String}


})

module.exports = mongoose.model('app', DataSchema);