const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

//const password = process.argv[2]

//const url =
  //`mongodb+srv://fullstack:${password}@cluster0.lep8c.mongodb.net/persons-app?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const personsSchema = new mongoose.Schema({
  name: {
    type:String, required: true, unique: true 
  },
  number:String,
  
})
personsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personsSchema.plugin(uniqueValidator)
module.exports = mongoose.model('PersonsOnPhonebook', personsSchema)

//const Person = mongoose.model('PersonsOnPhonebook', personsSchema)

