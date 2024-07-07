import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";
import uploadOnCloudinary from "../utils/fileUpload.js";

const getUser = async (req, res) => {
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

const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      occupation,
      location,
      id,
      linkedin,
      instagram,
      twitter,
    } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { picture, coverImage } = req.files;

    const picturePath = picture
      ? await uploadOnCloudinary(picture[0].path)
      : "";
    const coverImagePath = coverImage
      ? await uploadOnCloudinary(coverImage[0].path)
      : "";

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (occupation) user.occupation = occupation;
    if (location) user.location = location;
    if (instagram) user.instagramUrl = instagram;
    if (twitter) user.twitterUrl = twitter;
    if (linkedin) user.linkedinUrl = linkedin;

    if (picturePath) user.picturePath = picturePath;
    if (coverImagePath) user.coverImagePath = coverImagePath;

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserFriends = async (req, res) => {
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

const addRemoveFriends = async (req, res) => {
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

export { getUser, getUserFriends, addRemoveFriends, updateUser };
