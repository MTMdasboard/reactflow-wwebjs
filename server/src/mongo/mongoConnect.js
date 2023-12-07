import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

mongoose.set('strictQuery', false);

export default async function mongoConnect() {

  if (mongoose.connection.readyState >= 1) {
    return
  }
  
  return mongoose.connect(process.env.MONGODB_URI);
  
}
