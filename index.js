const express = require('express')
const app = express()


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
  const id = Number( request.params.id) // id on stringinä ja se halutaan muuttaa numeroksi, koska vertailu alla ei tunnista stringiä samaksi kuin numberia (person.id on number)
  console.log(id)
  const person = persons.find(person => person.id === id)
  console.log(person)
  response.json(person)
})

app.get('/info', (req, res) => {
  const personsAmount= persons.length
  var d = new Date();
  res.send('<p>There are '+personsAmount+' persons on phonebook </p>' + d.toLocaleString())
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})