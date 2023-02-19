import mongoose from 'mongoose';

const DBURI =
  'mongodb+srv://WAQAR:VICKY123@cluster420.fklabmy.mongodb.net/?retryWrites=true';
const connectToMongo = async () => {
  await mongoose
    .connect(DBURI)
    .then(res => console.log('connected successfully'))
    .catch(err => console.log('err====>', err));
};

export default connectToMongo;
