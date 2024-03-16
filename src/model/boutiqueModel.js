const db = require('../config/database');

const boutiqueModel = {
    getAllProducts: (callback) => {
        db.query('SELECT * FROM articles', callback);
    },
    getProductById: (id, callback) => {
        db.query('SELECT * FROM articles WHERE id = ?', id, (error, results) => {
            if (error) {
                callback(error, null);
                return;
            }
            callback(null, results[0]);
        });
    },
    createProduct: (Name, picture, callback) => {
        db.query('INSERT INTO articles (Name, picture) VALUES (?, ?)', [Name, picture], callback);
    },
    updateProduct: (id, Name, picture, callback) => {
        db.query('UPDATE articles SET Name = ?, picture = ? WHERE id = ?', [Name, picture, id], callback);
    },
    deleteProduct: (id, callback) => {
        db.query('DELETE FROM articles WHERE id = ?', id, callback);
    },
    getMostOrderedProduct: (callback) => {
        db.query('SELECT product_id, COUNT(*) AS order_count FROM orders GROUP BY product_id ORDER BY order_count DESC LIMIT 3', callback);
    },
    searchProducts: (query, minPrice, category, callback) => {
        let sql = 'SELECT * FROM boutique_test WHERE 1=1';

        // Ajout des filtres de recherche si des valeurs sont fournies
        if (query) {
            sql += ` AND name LIKE '%${query}%'`;
        }
        if (minPrice) {
            sql += ` AND price >= ${minPrice}`;
        }
        if (category) {
            sql += ` AND category = ${category}`;
        }

        db.query(sql, callback);
    }
};

module.exports = boutiqueModel;