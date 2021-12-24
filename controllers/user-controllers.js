const { User, Thought, reactionSchema } = require('../models');

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .select('-__v')
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData)
    })
    .catch(err => {
      if (err.name === "CastError") {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.status(400).json(err)
    });
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