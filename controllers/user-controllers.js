const { User } = require('../models');

const userController = {
    //get all comments
    getAllUsers(req,res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get user by id
    getUserById({params}, res) {
        User.findOne({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    // create User
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // update User by id
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, { new: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete user
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.'});
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.status(400).json(err));
    },
    createFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: {friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },
    removeFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: {friendId: params.friendId }}},
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    }
};


module.exports = userController;