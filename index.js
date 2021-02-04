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

app.get('/info', (req, res) => {
  const personsAmount= persons.length
  var d = new Date();
  res.send('<p>There are '+personsAmount+' persons on phonebook </p>' + d.toLocaleString())
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})