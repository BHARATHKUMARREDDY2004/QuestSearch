const mongoose = require("mongoose");

const questionSchema = require('../models/Question').schema;
const Questions = mongoose.connection.useDb('SpeakX').model('QuestionBase', questionSchema);

// Search questions with optional filters (search query and type)
const getQuestions = async (query = '', type = 'ALL', page) => {
  try {
    const filter = {};

    // Applies search query filter if provided
    if (query) {
      const queryWords = query.split(/\s+/).filter(Boolean); 
      filter.$and = queryWords.map(word => ({
        title: { $regex: word, $options: "i" }
      }));
    }

    // Applies type filter if provided and type is not 'ALL'
    if (type && type !== 'ALL') {
      filter.type = type;
    }

    // Fetches questions from the SpeakX database and QuestionBase collection
    const questions = await Questions.find(filter)
                                     .sort({ title: 'asc' })
                                     .limit(10)
                                     .skip((page - 1) * 10)

    return questions;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getQuestions,
};
