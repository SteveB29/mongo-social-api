const { User, Thought, reactionSchema } = require('../models');

const userController = {
  getAllUsers({ params, body}, res) {
    res.json({ message: 'getAllUsers working' })
  },

  getUserById({ params, body}, res) {
    res.json({ message: 'getUserById working' })
  },

  addUser({ params, body}, res) {
    res.json({ message: 'addUser working' })
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