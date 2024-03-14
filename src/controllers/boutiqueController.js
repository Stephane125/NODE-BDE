const boutiqueModel = require('../model/boutiqueModel');

const boutiqueController = {
    getAllProducts: (req, res) => {
        boutiqueModel.getAllProducts((error, results) => {
            if (error) {
                console.error('Error fetching products:', error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json(results);
        });
    },
    getProductById: (req, res) => {
        const id = req.params.id;
        boutiqueModel.getProductById(id, (error, result) => {
            if (error) {
                console.error('Error fetching product:', error);
                res.status(500).send('Internal Server Error');
                return;
            }
            if (!result) {
                res.status(404).send('Product not found');
                return;
            }
            res.json(result);
        });
    },
    createProduct: (req, res) => {
        const { Name, picture } = req.body;
        boutiqueModel.createProduct(Name, picture, (error, result) => {
            if (error) {
                console.error('Error creating product:', error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json({ id: result.insertId, Name, picture });
        });
    },
    updateProduct: (req, res) => {
        const id = req.params.id;
        const { Name, picture } = req.body;
        boutiqueModel.updateProduct(id, Name, picture, (error, result) => {
            if (error) {
                console.error('Error updating product:', error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json({ id, Name, picture });
        });
    },
    deleteProduct: (req, res) => {
        const id = req.params.id;
        boutiqueModel.deleteProduct(id, (error, result) => {
            if (error) {
                console.error('Error deleting product:', error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json({ message: 'Product deleted successfully' });
        });
    },
    getMostOrderedProducts: (req, res) => {
        boutiqueModel.getMostOrderedProduct((error, result) => {
            if (error) {
                console.error('Error fetching most ordered products:', error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json(result);
        });
    },
    searchProducts: (req, res) => {
        const { query, minPrice, category } = req.query;
        boutiqueModel.searchProducts(query, minPrice, category, (error, results) => {
            if (error) {
                console.error('Error searching products:', error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json(results);
        });
    }
};

module.exports = boutiqueController;
