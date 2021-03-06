
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkshopSchema = new Schema({
  picture: {type: String, default: ''},
  name: {type: String, default: ''},
  email: {type: String},
  city: {type: String},
  location: {
    type: {type: String, default: 'Point'},
    coordinates: [Number]
  }
});

const Workshop = mongoose.model('Workshop', WorkshopSchema);

module.exports = Workshop;
