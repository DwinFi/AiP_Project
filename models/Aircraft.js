// models/Aircraft.js
const mongoose = require('mongoose');

const FlightSpecsSchema = new mongoose.Schema({
  maxSpeed_atAlt: { type: String },       // e.g. "799 км/ч на высоте 2000 м"
  climbRate: { type: String },            // e.g. "100 м/с"
  turnTime: { type: String },             // e.g. "23 с"
  maxAltitude: { type: String },          // e.g. "12000 м"
  takeoffRun: { type: String }            // e.g. "300 м"
}, { _id: false });

const TechnicalSchema = new mongoose.Schema({
  crew: { type: String },
  engine: { type: String },
  length: { type: String },
  wingspan: { type: String },
  wingLoading: { type: String },
  baseMass: { type: String },
  fuelInMainTanks: { type: String },
  limits: { type: String }                // e.g. "Предельная скорость 920 км/ч, M=0.81"
}, { _id: false });

const ArmamentSchema = new mongoose.Schema({
  guns: { type: String },                 // e.g. "2 × 20-мм ШВАК"
  ammo: { type: String },                 // e.g. "90 снарядов"
  rateOfFire: { type: String },           // e.g. "800 выст./мин."
  maxPayload: { type: String }            // e.g. "8165 кг"
}, { _id: false });

const AircraftSchema = new mongoose.Schema({
  name: { type: String, required: true },        // "БИ-1", "Horten Ho 229", "F-117 Nighthawk"
  nick: { type: String },                        // short id: bi, ho229, f117
  image: { type: String },                       // путь к картинке: "/images/bi.png"
  description: { type: String },

  flightSpecs: FlightSpecsSchema,
  technical: TechnicalSchema,
  armament: ArmamentSchema,

  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Aircraft', AircraftSchema);
