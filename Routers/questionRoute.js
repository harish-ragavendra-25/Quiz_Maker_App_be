const express = require('express');
const router = express.Router();
const {addQuestion,updateQuestion} = require('../Controllers/questionController');
const {verifyToken} = require('../middleware/authMiddleware');
const {authorizeRole} = require('../middleware/roleMiddleware');
router.get('/',(req,res) => {
    res.send("thats the get method");
})

//Question post Route (Admin Only)
router.post('/',verifyToken,authorizeRole("admin"),addQuestion);

// update the question (Admin Only)
router.put('/:id',verifyToken,authorizeRole("admin"),updateQuestion);


module.exports = router;