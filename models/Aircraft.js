// models/Aircraft.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FlightSpecsSchema = new Schema({
  maxSpeed_atAlt: String,
  climbRate: String,
  turnTime: String,
  maxAltitude: String,
  takeoffRun: String
}, { _id: false });

const TechnicalSchema = new Schema({
  crew: String,
  engine: String,
  length: String,
  wingspan: String,
  wingLoading: String,
  baseMass: String,
  fuelInMainTanks: String,
  limits: String
}, { _id: false });

const ArmamentSchema = new Schema({
  guns: String,
  ammo: String,
  rateOfFire: String,
  maxPayload: String
}, { _id: false });

const AircraftSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nick: {
    type: String,
    required: true,
    unique: true        
  },
  image: String,
  description: String,

  flightSpecs: FlightSpecsSchema,
  technical: TechnicalSchema,
  armament: ArmamentSchema,

  created: {
    type: Date,
    default: Date.now   
  }
});


AircraftSchema.methods.info = function () {
  console.log(`Самолёт "${this.name}" сохранён в базе`);
};

module.exports = mongoose.model('Aircraft', AircraftSchema);

