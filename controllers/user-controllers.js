const { User, Thought, reactionSchema } = require('../models');

const userController = {
  getAllUsers({ params, body}, res) {
    User.find({})
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  getUserById({ params, body}, res) {
    res.json({ message: 'getUserById working' })
  },

  addUser({ body }, res) {
    User.create(body)
      .then(dbNewUser => res.json(dbNewUser))
      .catch(err => res.status(400).json(err));
  },

  updateUser({ params, body}, res) {
    res.json({ message: 'updateUser working' })
  },

  deleteUser({ params, body}, res) {
    res.json({ message: 'deleteUser working' })
  },

  addFriend({ params, body}, res) {
    res.json({ message: 'addFriend working' })
  },

  removeFriend({ params, body}, res) {
    res.json({ message: 'removeFriend working' })
  }
};

module.exports = userController;