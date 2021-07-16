const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./users')

mongoose.connect('mongodb://localhost/weespeak', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// db.once('open', async () => {
//   // if (await User.countDocuments().exec() > 0) return
//   Promise.all([
//     User.create({ name: 'Lincoln Nguyen', username: '@HOHOHO' }),
//     User.create({ name: 'Thanh Nguyen', username: '@HOHO' }),
//     User.create({ name: 'Le Nguyen', username: '@this_213' }),
//     User.create({ name: 'Running tiger', username: '@hopping' }),
//     User.create({ name: 'Eating tiger', username: '@joe' }),
//     User.create({ name: 'Bob joe', username: '@nope_hello' }),
//     User.create({ name: 'Mary sue', username: '@how_doYoudo' }),
//     User.create({ name: 'Horse jumping', username: '@this_21331' }),
//     User.create({ name: 'Bunny hopping', username: '@mountain' }),
//     User.create({ name: 'Dog eating', username: '@whyman' }),
//     User.create({ name: 'Cat meaowing', username: '@doyoulikeman' }),
//     User.create({ name: 'Another test', username: '@123_2131' }),
//     User.create({ name: 'Helloooo helllooooooooooooooooooooooooooooo', username: '@jiofw9__' }),
//     User.create({ name: 'Tigers rock', username: '@___' }),
//     User.create({ name: 'ROcks rolling', username: '@iamsanta' }),
//     User.create({ name: 'Meowing horse', username: '@youaresanta' }),
//     User.create({ name: 'Pigs growing', username: '@wearesantas' }),
//   ]).then(() => console.log('Added Users'))
// })

app.use(cors())

app.get('/users', paginatedResults(User), (req, res) => {
  res.json(res.paginatedResults)
})

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const searchTerm = unescape(req.query.search)
    const limit = 10
    const startIndex = (page - 1) * limit
    const results = {}
    let search = new RegExp(searchTerm, 'i')

    try {
      // db.users.find({ $or: [{"username": /Ma/i}, { "name": /Lin/i } ]})
      results.results = await model.find({
        $or: [
          { "username": { $regex: search }},
          { "name": { $regex: search }},
        ]
      }).limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

app.listen(1234)