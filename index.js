const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Risti",
    number: "1111111"
  },
  {
    id: 2,
    name: "Hertta",
    number: "2222222"
  },
  {
    id: 3,
    name: "Pata",
    number: "3333333"
  }
]
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
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
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id) //filter luo uuden lista personeita ehdolla, että valittu id ei tule mukaan

  response.status(204).end()
})



const generateId = () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const newId = getRandomInt(10000000000)
  return newId 
}


app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)
  response.json(person)
})

app.get('/info', (req, res) => {
  const personsAmount = persons.length
  var d = new Date();
  res.send('<p>There are ' + personsAmount + ' persons on phonebook </p>' + d.toLocaleString())
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})