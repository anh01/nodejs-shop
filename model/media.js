var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mediaSchema = new Schema({
  url: String,
  type: String,
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

exports.media = mongoose.model('Media', mediaSchema);