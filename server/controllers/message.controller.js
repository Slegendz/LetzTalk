import Message from "../models/message.model.js";

const postMessage = async (req, res) => {
  try {
    const { conversationId, senderId, text } = req.body;

    const newMessage = new Message({ conversationId, senderId, text });
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMessage = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    const messages = await Message.find({ conversationId });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postPrompt = async (req, res) => {
  try {
    const { conversationId, senderId, text } = req.body;

    const newMessage = new Message({ conversationId, senderId, text });
    await newMessage.save();
    // res.status(200).json(newMessage);

    console.log(data);
    res.send(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

export { postMessage, getMessage, postPrompt };
