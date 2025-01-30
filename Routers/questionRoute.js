const express = require('express');
const router = express.Router();
const {addQuestion,updateQuestion} = require('../Controllers/questionController');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

//Question post Route (Admin Only)
router.post('/',addQuestion);

// update the question (Admin Only)
router.put('/:id',updateQuestion);


module.exports = router;