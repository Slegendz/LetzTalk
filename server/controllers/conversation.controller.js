import Conversation from "../models/conversation.model.js";

// The $set operator is used to update documents by setting a field to a new value. This can be used to update existing fields or add new ones. In your example, the $set operator isn't explicitly mentioned, but it's commonly used in update operations with MongoDB and Mongoose

// New Conversation

const newConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });

    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// The $in operator is used to find documents where a specified field's value is within a given list of values.

// Get Conversation of the user
const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get converation of two members

// The $all operator is used to find documents where an array field contains all specified elements, regardless of order.
const getMembersConversation = async (req, res) => {
  try {
    const { firstUserId, secondUserId } = req.params;

    console.log(firstUserId, secondUserId);
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { getMembersConversation, getConversation, newConversation };
