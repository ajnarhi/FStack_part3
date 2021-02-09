const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.lep8c.mongodb.net/persons-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personsSchema = new mongoose.Schema({
  name: String,
  number: String

})

const Person = mongoose.model('PersonsOnPhonebook', personsSchema)

const person = new Person({
  name: name,
  number: number
})

if (name === undefined && number === undefined) {
  console.log('test')
  Person.
    find({})
    .then(function (persons) {
      var i = 0;
      console.log('phonebook: ')
      while (persons[i]) {

        console.log(persons[i].name, persons[i].number)
        i++
      }
      mongoose.connection.close()
    })

} else {
  person.save().then(response => {
    console.log('added ' + name + ' ' + number + ' to phonebook')
    mongoose.connection.close()
  })
}