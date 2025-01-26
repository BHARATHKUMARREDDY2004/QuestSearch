
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for a Block (used in ANAGRAM and MCQ)
const blockSchema = new Schema({
  text: { type: String, required: true },
  showInOption: { type: Boolean, required: true },
  isAnswer: { type: Boolean, required: true }
});

// Schema for an Option (used in MCQ)
const optionSchema = new Schema({
  text: { type: String, required: true },
  isCorrectAnswer: { type: Boolean, required: true }
});

// Question schema
const questionSchema = new Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ['ANAGRAM', 'MCQ', 'READ_ALONG', 'CONTENT_ONLY', 'CONVERSATION']
  },
  anagramType: { 
    type: String, 
    enum: ['WORD', 'SENTENCE'], 
    required: function() { return this.type === 'ANAGRAM'; }
  },
  blocks: [blockSchema],  // Only for ANAGRAM and MCQ
  options: [optionSchema], // Only for MCQ
  siblingId: { type: Schema.Types.ObjectId, ref: 'Question' },
  solution: { type: String, required: function() { return this.type === 'ANAGRAM'; } },
  title: { type: String, required: true },
  }, { 
  timestamps: true,
  collection: 'QuestionBase'
});

// Create and export the Question model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
