const { User, Thought, reactionSchema } = require('../models');
const { Types } = require('mongoose');

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  getUserById({ params }, res) {
    // checks if params are of valid ObjectId form, if not returns an error
    if (!Types.ObjectId.isValid(params.id)) {
      res.status(415).json({ message: 'Invalid user id' });
      return;
    }
    User.findOne({ _id: params.id })
    .select('-__v')
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData)
    })
    .catch(err =>res.status(400).json(err));
  },

  addUser({ body }, res) {
    User.create(body)
      .then(dbNewUser => res.json(dbNewUser))
      .catch(err => res.status(400).json(err));
  },

  updateUser({ params, body}, res) {
    if (!Types.ObjectId.isValid(params.id)) {
      res.status(415).json({ message: 'Invalid user id' });
      return;
    }
    User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    if (!Types.ObjectId.isValid(params.id)) {
      res.status(415).json({ message: 'Invalid user id' });
      return;
    }
    User.findOneAndDelete({ _id: params.id })
    .select('-__v')
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      // delete all thoughts associated with removed user
      // figure out how to use mongoose pre or post middleware to remove thoughts
      let thoughtsArray = dbUserData.thoughts;
      thoughtsArray.forEach(thought => {
        Thought.findOneAndDelete({  _id: thought._id })
          .then(console.log('Thought Deleted'));
      });
      res.json(dbUserData)
    })
    .catch(err =>res.status(400).json(err));
  },

  addFriend({ params }, res) {
    if (!Types.ObjectId.isValid(params.userId) || !Types.ObjectId.isValid(params.friendId)) {
      res.status(415).json({ message: 'Invalid user or friend id' });
      return;
    }
    // potential to add non-existant user, think of way to validate
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId }},
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData)
      })
  },

  removeFriend({ params }, res) {
    if (!Types.ObjectId.isValid(params.userId) || !Types.ObjectId.isValid(params.friendId)) {
      res.status(415).json({ message: 'Invalid user or friend id' });
      return;
    }
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId }},
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData)
      })
  }
};

module.exports = userController;