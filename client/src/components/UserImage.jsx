const UserImage = ({ image }) => {
  return (
    <div
      className="h-[50px] w-[50px]"
    >
      <img
        className="h-full w-full rounded-full object-cover object-center"
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </div>
  )
}

export default UserImage
