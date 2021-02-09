require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
app.use((morgan('tiny')))
const cors = require('cors')
app.use(express.static('build'))

app.use(cors())
const Person = require('./models/persons')

// let persons = [
//   {
//     id: 1,
//     name: "Risti",
//     number: "1111111"
//   },
//   {
//     id: 2,
//     name: "Hertta",
//     number: "2222222"
//   },
//   {
//     id: 3,
//     name: "Pata",
//     number: "3333333"
//   }
// ]


app.get('/', function (request, response) {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.url)
  console.log('headers: ',request.headers)
  console.log('URL: ', request.url)
  console.log('Parameters: ', request.params)
  console.log('---')    
  response.send('<h1>Hello World!</h1>')
})
// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>')
// })

app.get('/api/persons', (req, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id) // id on stringinä ja se halutaan muuttaa numeroksi, koska vertailu alla ei tunnista stringiä samaksi kuin numberia (person.id on number)
  console.log(id)
  const person = persons.find(person => person.id === id)
  console.log(person)
  if (person) { //javascript olio on truthy
    response.json(person)
  } else { //jos tulee undefined niin mennään tänne koska aúndefined on falsy
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id).then(response=> response.delete())
  //persons = persons.filter(person => person.id !== id) //filter luo uuden lista personeita ehdolla, että valittu id ei tule mukaan

  response.status(204).end()
})



// const generateId = () => {
//   function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
//   }

//   const newId = getRandomInt(10000000000)
//   return newId 
// }


app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }else if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }else if (persons.some(person => person.name===body.name)){
  return response.status(400).json({
    error: 'name already on list'
  })  
  }
  const person = new Person({
    name: body.name,
    number: body.number,
    //id: generateId(),
  })

  //persons = persons.concat(person)
  person.save().then(savedPersons => {//save is not a function virhe. kokeiltu person.save ja Person.save, mutta miksi ei futaa?
    response.json(savedPersons)
  })
  
  //response.json(person)
})

app.get('/info', (req, res) => {
  const personsAmount = persons.length
  var d = new Date();https://mail.google.com/mail/u/0/#inbox
  res.send('<p>There are ' + personsAmount + ' persons on phonebook </p>' + d.toLocaleString())
})



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})