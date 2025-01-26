const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("./lib/mongo"); // Assuming MongoDB setup is already in place

// Loades the .proto file for questsearch package
const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "search.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

// Loades the gRPC service definition
const questsearchPackageDefinition =
  grpc.loadPackageDefinition(packageDefinition).questsearch;

const { getQuestions } = require("./controllers/question");

// Set up Express
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// gRPC Client Setup (to communicate with gRPC server)
const client = new questsearchPackageDefinition.QuestionService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Express route for questions search
app.post("/api/questions", (req, res) => {
  const { query = "", type = "ALL", page } = req.body;

  // Calls the gRPC method with the query and type
  client.getQuestions({ query, type, page }, (error, result) => {
    if (!error) {
      res.status(200).json(result);
    } else {
      console.error("gRPC error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  });
});

// Starts Express server
app.listen(3000, () => {
  console.log("Express server running on port 3000");
});

// Sets up gRPC server
const server = new grpc.Server();

// Adds the QuestionService and implement the getQuestions RPC
server.addService(questsearchPackageDefinition.QuestionService.service, {
  getQuestions: (call, callback) => {
    getQuestions(call, callback); // Your logic for handling questions
  },
});

// Starts gRPC server
server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error("gRPC server failed to start:", error);
      return;
    }
    console.log(`gRPC server running at http://127.0.0.1:${port}`);
  }
);
