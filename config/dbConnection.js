import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
const dbConnection = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    if (connection.readyState == 1) {
      console.log('Database Connected');
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default dbConnection;
