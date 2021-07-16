const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./users')

mongoose.connect('mongodb://localhost/weespeak', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// db.once('open', async () => {
//   // if (await User.countDocuments().exec() > 0) return

//   Promise.all([
//     User.create({ name: 'Lincoln Nguyen', username: '@HOHOHO' }),
//     User.create({ name: 'Thanh Nguyen', username: '@HOHO' }),
//     User.create({ name: 'Le Nguyen', username: '@this_213' }),
//     User.create({ name: 'HOho', username: '@this_21331' }),
//   ]).then(() => console.log('Added Users'))
// })

app.get('/users', paginatedResults(User), (req, res) => {
  res.json(res.paginatedResults)
})

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const searchTerm = unescape(req.query.search)
    const limit = 1
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