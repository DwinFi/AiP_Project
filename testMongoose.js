const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/aviationDB');

const aircraftSchema = new mongoose.Schema({
  name: String
});

aircraftSchema.methods.info = function () {
  console.log(this.name + ' добавлен в базу авиации');
};

const Aircraft = mongoose.model('Aircraft', aircraftSchema);

const plane = new Aircraft({ name: 'БИ-1' });

plane.save().then(() => plane.info());