const { Schema } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
      // add date format getters
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = reactionSchema;