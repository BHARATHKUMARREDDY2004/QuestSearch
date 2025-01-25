import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

// Load the .proto file for questsearch package
const packageDefinition = protoLoader.loadSync('./search.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

// Load the package definition and extract the 'questsearch' service
const questsearchPackageDefinition = grpc.loadPackageDefinition(packageDefinition).questsearch;

// Create a gRPC client for the 'QuestionService'
const client = new questsearchPackageDefinition.QuestionService(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

// Function to fetch questions via gRPC directly
const fetchQuestions = async (query, type) => {
    return new Promise((resolve, reject) => {
        client.getQuestions({ query, type }, (error, result) => {
            if (error) {
                console.error('Error fetching questions:', error.message);
                reject(error);
            } else {
                console.log('Questions:', result);
                resolve(result);
            }
        });
    });
};

export default fetchQuestions;

