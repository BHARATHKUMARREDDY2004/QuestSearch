const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
require('./lib/mongo');

// Loades the .proto file for questsearch package
const packageDefinition = protoLoader.loadSync('./search.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Loades the gRPC service definition
const questsearchPackageDefinition = grpc.loadPackageDefinition(packageDefinition).questsearch;

// Import the controller for question search
const { getQuestions } = require('./controllers/question');

// Creates a gRPC server instance
const server = new grpc.Server();

// Addes the QuestionService and implements the getQuestions RPC
server.addService(questsearchPackageDefinition.QuestionService.service, {
  getQuestions: (call, callback) => {
    getQuestions(call, callback);
  }
});

// Binds the server to a port and starts it
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error('Server failed to start:', error);
    return;
  }
  console.log(`Server running at http://127.0.0.1:${port}`);
});