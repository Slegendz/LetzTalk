import mongoose from "mongoose";
const { Schema, model } = mongoose;

const conversationSchema = new Schema({
    members: {
        type: Array,
        default: [],
    }
}, { timestamps: true })

const Conversaton = model("Conversation", conversationSchema);
export default Conversaton;