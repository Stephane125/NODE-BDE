// // Login.js
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const UserModel = require('../model/UserModel');

// router.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     UserModel.getUserByEmail(email, (err, user) => {
//         if (err) {
//             console.error('Error fetching user:', err);
//             return res.status(500).json({ message: 'Internal Server Error' });
//         }
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         bcrypt.compare(password, user.password, (err, result) => {
//             if (err) {
//                 console.error('Error comparing passwords:', err);
//                 return res.status(500).json({ message: 'Internal Server Error' });
//             }
//             if (!result) {
//                 return res.status(401).json({ message: 'Incorrect password' });
//             }

//             const token = jwt.sign(
//                 { userId: user.id },
//                 process.env.JWT_SECRET_KEY, // You should use your actual secret key
//                 { expiresIn: '24h' }
//             );

//             res.status(200).json({ message: 'Login successful', token });
//         });
//     });
// });

// module.exports = router;
