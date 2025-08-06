const fetchFriends = async ({ userId, token }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error("Failed to fetch friends")
    }
  } catch (err) {
    console.error(err.message)
    return null
  }
}

export default fetchFriends;