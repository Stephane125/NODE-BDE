const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');

const userController = {
    getAllUsers: (req, res) => {
        UserModel.getAllUsers((error, results) => {
            if (error) {
                console.error('Error fetching users:', error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json(results);
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        UserModel.getUserById(id, (error, result) => {
            if (error) {
                console.error('Error fetching user:', error);
                res.status(500).send('Internal Server Error');
                return;
            }
            if (!result) {
                res.status(404).send('User not found');
                return;
            }
            res.json(result);
        });
    },
    createUser: (req, res) => {
        const { mail, nom_u, prenom_u, password, localisation } = req.body;
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            UserModel.createUser(mail, nom_u, prenom_u, hash, localisation, (error, result) => {
                if (error) {
                    console.error('Error creating user:', error);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.json({ id: result.insertId, mail, nom_u, prenom_u, localisation });
            });
        });
    },
    updateUser: (req, res) => {
        const id = req.params.id;
        const { nom_u, prenom_u, password, localisation, statut } = req.body;
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            UserModel.updateUser(id, nom_u, prenom_u, hash, localisation, statut, (error, result) => {
                if (error) {
                    console.error('Error updating user:', error);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.json({ id, nom_u, prenom_u, localisation, statut });
            });
        });
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        UserModel.deleteUser(id, (error, result) => {
            if (error) {
                console.error('Error deleting user:', error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json({ message: 'User deleted successfully' });
        });
    }
};

module.exports = userController;
