const currentChat = [
  {
    _id: "D",
    members: ["663a7cb04863f1951bb155ec", "663aef927c8c757bb558edef"],
  },
  {
    _id: "DbjD",
    members: ["663a7cb04863f1951bb155ec", "663ccd9acfd666389719ca6e"],
  },
]

const currFriend = { _id: "663ccd9acfd666389719ca6e" }
console.log(currFriend)

const receiverId = currentChat.filter((m) => m.members.includes(currFriend._id))
// const reci = receiverId[0].members[1];
// console.log(reci )
console.log(receiverId)
