import mongoose from 'mongoose';

const { DBCONNECT }: any = process.env;
class MongoConnect {
  private readonly _mongoUrl: string = DBCONNECT;

  async connectToMongo() {
    await mongoose.connect(this._mongoUrl);
  }
}

export const mongoConnect = new MongoConnect();
