import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app.js'

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected successfully');
        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error('Error in connecting to database',error);
    }
}

connectDB();

