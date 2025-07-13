# mongosh

# use medic-app

# db.users.getIndexes()

[
  { key: { _id: 1 }, name: "_id_" },
  { key: { username: 1 }, name: "username_1", unique: true }
]

# db.users.dropIndex("username_1")

# db.users.getIndexes()