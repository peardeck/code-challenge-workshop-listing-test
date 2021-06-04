const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  likedWorkshops : [{
    workshopId: { type : Schema.Types.ObjectId, ref: 'Workshop' },
    likedTime: { type: Date, default: Date.now }
  }],
  dislikedWorkshops : [{
    workshopId: { type : Schema.Types.ObjectId, ref: 'Workshop' },
    dislikedTime: { type: Date, default: Date.now }
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
