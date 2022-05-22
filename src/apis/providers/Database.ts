import mongoose from 'mongoose';
import bluebird from 'bluebird';
import { MongoError } from 'mongodb';
import Locals from './Locals';

export class Databse {
    public static init(): Promise<any> {
        const dsn = Locals.config().mongooseUrl;
        const options = { useNewUrlParser: true, useUnifiedTopology: true };

        mongoose.Promise = bluebird;
        mongoose.set('useCreateIndex', true);

        return mongoose.connect(dsn, options, (error: MongoError) => {
            if (error) {
                console.error(error);
                process.exit(1);
                throw error;
            } else {
                console.log('MongoDB connected');
            }
        });
    }
}

export default mongoose;
