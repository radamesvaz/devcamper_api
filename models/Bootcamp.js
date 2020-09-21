const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor agrega un nombre'],
        unique: true,
        trim: true,
        maxlength: [50, 'El nombre no puede ser superior a 50 caracteres']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Por favor agrega una descripcion'],
        maxlength: [500, 'La descripcion no puede ser superior a 500 caracteres']
    },
    website: {
        type: String,
        match: [
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          'Por favor usa un URL valido con HTTP o HTTPS'
        ]
      },
      phone: {
        type: String,
        maxlength: [20, 'El numero de telefono no puede ser superior a 20 caracteres']
      },
      email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Por favor agrega un email valido'
        ]
      },
      address: {
        type: String,
        required: [true, 'Por favor agrega una direccion']
      },
      location: {
        // GeoJSON Point
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
      },
      careers: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
          'Web Development',
          'Mobile Development',
          'UI/UX',
          'Data Science',
          'Business',
          'Other'
        ]
      },
      averageRating: {
        type: Number,
        min: [1, 'La reseña tiene que ser al menos 1'],
        max: [10, 'La reseña tiene que ser al menos 10']
      },
      averageCost: Number,
      photo: {
        type: String,
        default: 'no-photo.jpg'
      },    
      housing: {
        type: Boolean,
        default: false
      },
      jobAssistance: {
        type: Boolean,
        default: false
      },
      jobGuarantee: {
        type: Boolean,
        default: false
      },
      acceptGi: {
        type: Boolean,
        default: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
});

// Crear el slug del bootcamp con slugify
BootcampSchema.pre('save', function(next){
  this.slug = slugify(this.name, { lower: true })
  next();
});

//  Gocode y crear el campo de localizacion
BootcampSchema.pre('save', async function(next){
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    cyti: loc[0].city,
    zipcode: loc[0].zipcode,
    state: loc[0].stateCode,
    country: loc[0].countryCode
  }

  // No guarders la direccion en la BD
  this.address = undefined;
  next();
})



module.exports =  mongoose.model('BootcampSchema', BootcampSchema ) 