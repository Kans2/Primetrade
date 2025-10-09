import mongoose from 'mongoose';

async function connectToDb(cb){
    try{
        await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        });
    console.log(':) Mongodb database connected');
    cb ();
    }catch(err){
           console.error('Mongoose connection error:', err);
           process.exit(1);
    }

}

export {connectToDb};