import mongoose, { mongo } from 'mongoose';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDb Database ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error in MongoDb ${error}`);
    }
};

export default connectDB;

