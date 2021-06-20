
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

//WorkshopSchema.index({ location: "2dsphere"});

const Workshop = mongoose.model('Workshop', WorkshopSchema);

module.exports = Workshop;
