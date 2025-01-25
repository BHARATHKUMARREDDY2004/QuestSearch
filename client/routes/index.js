const express = require('express');
const router = express.Router();
const grpcController = require('../controllers/grpc');

router.post('/questions', grpcController.listQuestions);

module.exports = router;
