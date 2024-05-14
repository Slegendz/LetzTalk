import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Message send
const messageSchema = new Schema({
    conversationId: { 
        type: String,
        required: true,
    },
    senderId: {
        required: true,
        type: String,
    },
    text: {
        required: true,
        type: String
    }
}, { timestamps: true })

const message = mongoose.model("Message", messageSchema);
export default message;