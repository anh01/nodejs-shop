var mongoose = require('mongoose');
//var bcrypt = require('bcrypt'); //for later integration.
var Schema = mongoose.Schema;
var Id = Schema.Types.ObjectId;


var userSchema = new Schema({
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  userData: {type: Id, ref: 'UserData'},
  roles: [{type:Id, ref:'Role'}]
});
userSchema.methods.checkPassword = function(password, next) {
  var user = this;
  var matches = ( password == user.password);
  next(null, matches);
  
};
userSchema.statics.findByIdAndPopulate = function(id, next) {
  this.findById(id)
  .populate('roles')
  .exec(function(err, user){
    next(err,user);
  });
};

userSchema.pre('save', function(next) {
  var user = this;
  if(!user.isModified('password')) {
    next();
  }
  // user password has changed: encrypt the password
  next();
  
});

var roleSchema = new Schema({
  name: {type:String, required:true, unique:true}
});

var model = {
  user : mongoose.model('User', userSchema),
  role : mongoose.model('Role', roleSchema)
};

exports.model = model;

