const { User, Thought, reactionSchema } = require('../models');
const { Types } = require('mongoose');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
  },

  getThoughtById({ params }, res) {
    if (!Types.ObjectId.isValid(params.id)) {
      res.status(415).json({ message: 'Invalid thought id' });
      return;
    }
    Thought.findOne({ _id: params.id })
    .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err =>res.status(400).json(err));
  },

  addThought({ body }, res) {
    if (!Types.ObjectId.isValid(body.userId)) {
      res.status(415).json({ message: 'Invalid thought id' });
      return;
    }
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId},
          { $addToSet: { thoughts: _id } },
          { new: true }
        );
      })
      .then(newUserData => {
        if (!newUserData) {
          // orphan thoughts can be created with invalid userId's, add validation in the future
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(newUserData);
      })
      .catch(err => res.json(err));
  },

  updateThought({ params, body}, res) {
    if (!Types.ObjectId.isValid(params.id)) {
      res.status(415).json({ message: 'Invalid thought id' });
      return;
    }
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteThought({ params, body}, res) {
    if (!Types.ObjectId.isValid(params.id)) {
      res.status(415).json({ message: 'Invalid thought id' });
      return;
    }
    Thought.findOneAndDelete({ _id: params.id })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        // thoughtId is not removed from User thoughts array, find way to remove
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  addReaction({ params, body}, res) {
    if (!Types.ObjectId.isValid(params.thoughtId)) {
      res.status(415).json({ message: 'Invalid thought id' });
      return;
    }
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id'});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteReaction({ params, body}, res) {
    if (!Types.ObjectId.isValid(params.thoughtId) || !Types.ObjectId.isValid(body.reactionId)) {
      res.status(415).json({ message: 'Invalid thought or reaction id' });
      return;
    }
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: body.reactionId } } },
      { new: true }
    )
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id'});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;