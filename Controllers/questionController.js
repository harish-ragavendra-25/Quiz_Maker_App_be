const question_Model = require('../Models/questionModel');

const addQuestion = async(req,res) => {
    try {
        const {question,option_A,option_B,option_C,option_D,answer} = req.body;

        if(!question||!option_A||!option_B||!option_C||!option_D||!answer){
            return res.status(400).json({message: 'All fields are required'});
        }

        const new_Question = new question_Model({
            question,
            option_A,
            option_B,
            option_C,
            option_D,
            answer
        });

        await new_Question.save();
        

        return res.status(201).json({message:'Question added successfully',new_question:new_Question});
    } catch (error) {
        res.status(500).json({message:'Server Error',error:error.message});
    }
}

const updateQuestion = async(req,res) => {
    try {
        const {id} = req.params;
        const updatedData = req.body;

        const question = await question_Model.findById(id);

        if(!question){
            return res.status(404).json({message: "Question not found"});
        }

        //update the Question
        // front-end should send only the certain feild in the req.body 
        Object.keys(updatedData).forEach((keys) => {
            question[keys] = updatedData[keys];
        });

        await question.save();

        res.status(200).json({message:'Question Updated!!',question});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error'});
    }
}

module.exports = {addQuestion,updateQuestion};