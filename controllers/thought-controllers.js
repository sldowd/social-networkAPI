const { Thought } = require('../models');

const thoughtController = {
    //get all comments
    getAllThoughts(req,res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get user by id
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    // create Thought
    createThought({body}, res) {
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },
    // update Thought by id
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, { new: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete user
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => res.status(400).json(err));
    },
     // add reaction to thought
     addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbP=dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
};


module.exports = thoughtController;