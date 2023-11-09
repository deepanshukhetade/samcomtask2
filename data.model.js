const mongoose = require('mongoose')


let data = new mongoose.Schema({
  id: Number,
  reach: Number,
  date: Date,
  campaignMatch: {
    id: Number,
    id_supplier: Number,
    supplier: {
      id: Number,
      name: String,
    },
  },
})

module.exports = mongoose.model("data", data)