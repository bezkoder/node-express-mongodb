
module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      login: String,
      email: String,
      words: [String],
      password: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Users = mongoose.model("users", schema);
  return Users;
};
