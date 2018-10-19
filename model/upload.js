var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vnex = new Schema({
  like : Number,
  title:  String,
  subtitle: String,
  content:   String,
  tag: String,
  anh: {type:Array}
},{collection:'uploadnew'});

module.exports = mongoose.model("uploadnew", vnex);
