var mongoose = require('mongoose');

var AircraftSchema = new mongoose.Schema({
  title: String,
  nick: String,
  avatar: String,
  desc: String,
  flightSpecs: Object,
  technical: Object,
  armament: String
});

module.exports = mongoose.model('Aircraft', AircraftSchema, 'planes');
