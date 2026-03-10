import mongoose from "mongoose";

const policeSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    station:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    role:{
        type:String,
        default:"police"
    }

},
{
    timestamps:true
}
);

export default mongoose.model("Police",policeSchema);