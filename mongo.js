const { MongoClient } = require("mongodb");

module.exports = {
  connectToDb: (connectionCB) => {
    MongoClient.connect("mongodb://localhost:27017")
      .then((client) => {
        dbConnection = client.db();
        return connectionCB();
      })
      .catch((error) => {
        console.log("Error connecting to database: ", error);
        return connectionCB(error);
      });
  },
  getDb: () => dbConnection,
};
