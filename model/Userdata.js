const mongoose = require('mongoose');

const UserPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  geoLocation: {
    latitude: { type: Number },
    longitude: { type: Number }
  }
});

const PostSchema = mongoose.model('UserPostSchema', UserPostSchema);

module.exports = PostSchema;
