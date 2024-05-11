import mongoose from "mongoose";

const Schema = mongoose.Schema;
const schema = new Schema({
  name:  String,
  avatar: {type:String,default:''},
  phoneNumber: { type: String, unique: true },
  userName:{ type: String, unique: true },
  followings: [{default:[],type:Array}],
  enabled: { default: true, type: Boolean },


}, { timestamps: true });


const model = mongoose.model('user', schema);
export  {
  schema,model
}
