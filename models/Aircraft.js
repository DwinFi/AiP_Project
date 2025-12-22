var mongoose = require('mongoose');

var AircraftSchema = new mongoose.Schema({
  title: String,
  nick: String,

  avatar: String,

  images: [String],

  desc: String,
  flightSpecs: Object,
  technical: Object,

  armament: [
    {
      name: String,
      weight: String
    }
  ]
});

module.exports = mongoose.model('Aircraft', AircraftSchema, 'planes');