const db = require('../config/database');

const UserModel = {
    getAllUsers: (callback) => {
        db.query('SELECT * FROM user', callback);
    },
    getUserById: (id, callback) => {
        db.query('SELECT * FROM user WHERE id = ?', id, (error, results) => {
            if (error) {
                callback(error, null);
                return;
            }
            callback(null, results[0]);
        });
    },
    createUser: (mail, nom_u, prenom_u, password, localisation, callback) => {
        db.query('INSERT INTO user (mail, nom_u, prenom_u, password, localisation) VALUES (?, ?, ?, ?, ?)', [mail, nom_u, prenom_u, password, localisation], callback);
    },
    updateUser: (id, nom_u, prenom_u, password, localisation, statut, callback) => {
        db.query('UPDATE user SET nom_u = ?, prenom_u = ?, password = ?, localisation = ?, statut = ? WHERE id = ?', [nom_u, prenom_u, password, localisation, statut, id], callback);
    },
    deleteUser: (id, callback) => {
        db.query('DELETE FROM user WHERE id = ?', id, callback);
    }
};

module.exports = UserModel;
