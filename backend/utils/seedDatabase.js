const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fs = require('fs')
const Person = require('../models/person')
const config = require('./config')

console.log('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// READ DATA FOR FILE
const persons = JSON.parse(fs.readFileSync(`${__dirname}/data.json`))

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Person.create(persons)
    console.log('Data successfully loaded!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Person.deleteMany()
    console.log('Data successfully deleted!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
