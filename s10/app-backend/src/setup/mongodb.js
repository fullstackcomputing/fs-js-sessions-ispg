import mongoose from 'mongoose';

async function connectToMongoDB(dbModels,config) {
  // establish connection
  mongoose.connect(config.url, {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    family: 4,
    useUnifiedTopology: true
  });

  // setup connection events
  const dbConn = mongoose.connection;
  dbConn.on('close', () => console.log('db connection close'));
  dbConn.on('error', (err) => console.error(err));
  dbConn.once('open', () => {
    // connected
    console.log('db connected');
    dbModels.register();
   });

  // handle app. crash scenario
  process.on('SIGINT', () => {
    dbConn.close(() => {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });
  
}

export default connectToMongoDB;
