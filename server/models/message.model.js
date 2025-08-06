import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Messages send
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
        type: String, 
        trim: true,
    }
}, { timestamps: true })

const Message = model("Message", messageSchema);
export default Message;