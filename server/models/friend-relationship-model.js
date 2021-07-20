// https://stackoverflow.com/questions/50363220/modelling-for-friends-schema-in-mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'user'},
    recipient: { type: Schema.Types.ObjectId, ref: 'user'},
    status: {
      type: Number,
      enums: [
          0,    //'pending'
          1,    //'accepted'
      ]
    }
  }, {timestamps: true})

  module.exports = mongoose.model('friendRelationship', friendSchema)