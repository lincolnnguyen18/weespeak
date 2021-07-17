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
//     User.create({ name: 'A', username: '@dogjumped' }),
//     User.create({ name: 'B', username: '@213124' }),
//     User.create({ name: 'C', username: '@21321' }),
//     User.create({ name: 'D', username: '@41224' }),
//     User.create({ name: 'E', username: '@21412' }),
//     User.create({ name: 'F', username: '@r5121' }),
//     User.create({ name: 'G', username: '@fafwe23' }),
//     User.create({ name: 'H', username: '@fewfewawc23' }),
//     User.create({ name: 'I', username: '@fewfwd1' }),
//     User.create({ name: 'J', username: '@32fecf23' }),
//     User.create({ name: 'K', username: '@13rfeqf42g' }),
//     User.create({ name: 'L', username: '@fewafcwefew' }),
//     User.create({ name: 'M', username: '@fewacwef' }),
//     User.create({ name: 'N', username: '@jfe213wa' }),
//     User.create({ name: 'O', username: '@jfe211wfewwa' }),
//     User.create({ name: 'P', username: '@jfewa' }),
//     User.create({ name: 'Q', username: '@jf221aeewa' }),
//     User.create({ name: 'R', username: '@jfe12wa' }),
//     User.create({ name: 'S', username: '@jf323eacewwa' }),
//     User.create({ name: 'T', username: '@jfew312a' }),
//     User.create({ name: 'U', username: '@jfe312wa' }),
//     User.create({ name: 'V', username: '@jf12312ewa' }),
//     User.create({ name: 'W', username: '@j321rdwfewa' }),
//     User.create({ name: 'X', username: '@jffewewa' }),
//     User.create({ name: 'Y', username: '@jf123ewa' }),
//     User.create({ name: 'Z', username: '@jfefewafwa' }),
//     User.create({ name: 'AAVEW', username: '@fewa212' }),
//     User.create({ name: 'FEWC', username: '@321wdca13' }),
//     User.create({ name: 'NCOIEW', username: '@fwacfw1412' }),
//     User.create({ name: 'FJWEIO', username: '@fweaffw123' }),
//     User.create({ name: 'NCIEW', username: '@fwefwa1' }),
//     User.create({ name: 'FJFE wefwe', username: '@fwefwea13' }),
//     User.create({ name: 'FJew few e', username: '@fwef32' }),
//     User.create({ name: 'few few ew', username: '@fwefa3' }),
//     User.create({ name: 'fwefew ewfwefewfew', username: '@fewf12f' }),
//     User.create({ name: 'JIOcew fewfew', username: '@ewac13' }),
//     User.create({ name: 'JFIOEW fwefew', username: '@fewaf13' }),
//     User.create({ name: 'fewioe few', username: '@wefwe3' }),
//     User.create({ name: 'fewfe wfewew', username: '@fewfew13' }),
//     User.create({ name: 'afewaca fewfew', username: '@fewc323' }),
//     User.create({ name: 'facew wafewfew', username: '@fecwf90f' }),
//     User.create({ name: 'coijio jiojiojio', username: '@fewjoa1' }),
//     User.create({ name: '@$!JIO$!)#', username: '@cjaofew' }),
//     User.create({ name: 'fwefe jiojiol', username: '@joij31' }),
//     User.create({ name: 'hopup downf', username: '@bobob21fjoj' }),
//     User.create({ name: 'jfewiof ewfwe', username: '@joijfw12' }),
//     User.create({ name: 'fewfew fewfa', username: '@jcafwe02' }),
//     User.create({ name: 'fewafj popwfwe', username: '@fwebuao1' }),
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
    const limit = parseInt(req.query.limit)
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