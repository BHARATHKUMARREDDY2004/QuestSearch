const db = require('../../db');

function getQuestions(call, callback) {
  const { query = '', type = 'ALL', page } = call.request; 

  db.getQuestions(query, type, page)
    .then((result) => {
      if (!result || result.length === 0) {
        // Returns an empty list if no results found
        callback(null, { questions: [] });
      } else {
        // Returns the fetched questions based on the query and type
        callback(null, { questions: result });
      }
    })
    .catch((e) => {
      callback(e);
    });
}

module.exports = getQuestions;