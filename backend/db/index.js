const mongoose = require("mongoose");

const questionSchema = require('../models/question').schema;
const Questions = mongoose.connection.useDb('SpeakX').model('QuestionBase', questionSchema);

/**
 * Optimized cursor-based pagination.
 * @param {string} query - Search string (optional).
 * @param {string} type - Type filter (optional).
 * @param {string|null} lastId - The _id of the last fetched document (for cursor).
 * @param {number} limit - Number of results to fetch.
 */
const getQuestions = async (query = '', type = 'ALL', lastId = null, limit = 10) => {
  try {
    const filter = {};

    // Search keyword
    if (query) {
      const queryWords = query.split(/\s+/).filter(Boolean); 
      filter.$and = queryWords.map(word => ({
        title: { $regex: word, $options: "i" }
      }));
    }

    // Type filter
    if (type && type !== 'ALL') {
      filter.type = type;
    }

    // Cursor-based pagination
    if (lastId) {
      filter._id = { $gt: new mongoose.Types.ObjectId(lastId) };
    }

    const questions = await Questions.find(filter)
                                     .sort({ _id: 1 })   // Ascending order for consistent cursor
                                     .limit(limit);

    const hasNextPage = questions.length === limit;
    const nextCursor = hasNextPage ? questions[questions.length - 1]._id : null;

    return {
      results: questions,
      nextCursor,
      hasNextPage
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getQuestions,
};
