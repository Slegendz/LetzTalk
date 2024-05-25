var myArray = [
  { name: "oldest", date: "2007-01-17T08:00:00Z" },
  { name: "newest", date: "2011-01-28T08:00:00Z" },
  { name: "old", date: "2009-11-25T08:00:00Z" },
]

// Oldest First
console.log(myArray.sort((a, b) => a.date.localeCompare(b.date)))

// Newest first
console.log(myArray.sort((a, b) => -a.date.localeCompare(b.date)))
