import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectMongo = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDb Database ${connectMongo.connection.host}`);
    } catch (error) {
        console.log(`Error in MongoDb ${error}`);
    }
};

export default connectDB;