const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: 'Username is required!',
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: 'Email is required!',
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    // to remove duplicate id in res
    id: false,
    toJSON: {
      virtuals: true
    }
  }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;