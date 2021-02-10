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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
   } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

app.get('/', function (request, response) {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.url)
  console.log('headers: ', request.headers)
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


app.get('/api/persons/:id', (request, response, next) => {

  const id = request.params.id
  //const id = Number(request.params.id) // id on stringinä ja se halutaan muuttaa numeroksi, koska vertailu alla ei tunnista stringiä samaksi kuin numberia (person.id on number)
  console.log(id)
  Person.findById(id).then(person => {
    //const person = persons.find(person => person.id === id)
    console.log(person)
    if (person) { //javascript olio on truthy
      response.json(person)
    } else { //jos tulee undefined niin mennään tänne koska aúndefined on falsy
      response.status(404).end()
    }

  })

  .catch(error => next(error)) //middleware
})


  app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id).then(response => response.delete())
    .catch(error => next(error))
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


  app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    } else if (!body.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    //} else if (persons.some(person => person.name === body.name)) {
      //return response.status(400).json({
        //error: 'name already on list'
      //})
    }
    const person = new Person({
      name: body.name,
      number: body.number,
      //id: generateId(),
    })

    //persons = persons.concat(person)
    person.save().then(savedPersons => {
      response.json(savedPersons)
    }).catch(error => next(error))

    //response.json(person)
  })

  app.get('/info', (req, res) => {
   Person.count({}).then(count =>
    {var d = new Date(); 
    res.send('<p>There are ' + count + ' persons on phonebook </p>' + d.toLocaleString())
    })
  })



  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })