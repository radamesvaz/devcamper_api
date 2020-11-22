const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor agrega un nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor agrega un email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Por favor agrega un email valido'
        ]
      },
    role:{
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
      },
    password: {
        type: String,
        required: [true, 'Por favor agrega una contraseña'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//  Encriptando la contraseña usando bcrypt
UserSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

//  Firma de JWT
UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_Expire
  })
}

//  Comparando la contraseña ingresada con la guardada en la base de datos
UserSchema.methods.comparePasswords = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema);