import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params; // gettting id from the url
    const user = await User.findById(id); // finding the user by id
    
    const userConversation = await Conversation.find({
      members: { $all: [id, process.env.BOT_ID] },
    });

    if (userConversation.length == 0) {
      const newConversation = new Conversation({
        members: [id, process.env.BOT_ID],
      });
      await newConversation.save();
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { lastOnlineUser } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.lastOnline = lastOnlineUser;
    await user.save();

    const formattedData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      picturePath: user.picturePath,
      lastOnline: lastOnlineUser,
      location: user.location,
      occupation: user.occupation,
    };

    console.log(formattedData);
    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // We will make multiple api calls to the db, so using Promise.all to find all the friends by id
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
        lastOnline,
      }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
          lastOnline,
        };
      }
    );

    formattedFriends.sort((a, b) => -a.lastOnline.localeCompare(b.lastOnline));

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    const userConversation = await Conversation.find({
      members: { $all: [id, friendId] },
    });

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);

      if (userConversation.length == 0) {
        const newConversation = new Conversation({
          members: [id, friendId],
        });
        await newConversation.save();
      }
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
        lastOnline,
      }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
          lastOnline,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

