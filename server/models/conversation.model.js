import mongoose from "mongoose";
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    members: {
        type: Array,
        default: [],
    }
}, { timestamps: true })

const Conversaton = mongoose.model("Conversation", conversationSchema);
export default Conversaton;