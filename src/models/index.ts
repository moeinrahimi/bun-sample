import mongoose from 'mongoose';



mongoose.connect(process.env.MONGODB_URI!,
    {
       
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);


export default mongoose