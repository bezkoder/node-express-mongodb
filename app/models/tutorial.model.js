module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      desc: String,
      page : String,
      tag: String,
      author: String,
      bucketid: String,
      thumb: String,
      bookid: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
