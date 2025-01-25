const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Loading .proto file for questsearch package
const packageDefinition = protoLoader.loadSync(`${__dirname}../../../../search.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

// Loading package definition and extract the 'questsearch' service
const questsearchPackageDefinition = grpc.loadPackageDefinition(packageDefinition).questsearch;

// Creates a client instance for the 'QuestionService' using the 'questsearch' package
const client = new questsearchPackageDefinition.QuestionService(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

// Searches all questions based on query and type
const listQuestions = (req, res) => {
    const { query = '', type = 'ALL', page } = req.body;

    // Calles the gRPC method with the query and type
    client.getQuestions({ query, type, page }, (error, result) => {
        if (!error) {
            res.status(200).json(result);
        } else {
            console.error('gRPC error:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    });
};

module.exports = {
    listQuestions
};