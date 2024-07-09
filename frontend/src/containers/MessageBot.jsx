const payload = {
  prompt: { messages: [{ content: newMessage }] },
  temperature: 0.1,
  candidate_count: 1,
}

const response = await fetch(process.env.REACT_LANGUAGE_MODEL_URL, {
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
  method: "POST",
})

const data = await response.json()
console.log(data)
if (response.ok) {
  setMessages([
    ...messages,
    {
      author: data.messages[0].content,
      bot: data.candidates[0].content,
    },
  ])
}
