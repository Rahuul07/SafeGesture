import mongoose from "mongoose";

const evidenceSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    alertId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Alert",
        required:true
    },

    videoUrl:{
        type:String,
        required:true
    },

    duration:{
        type:Number,
        default:15
    }

},
{
    timestamps:true
}
);

export default mongoose.model("Evidence",evidenceSchema);