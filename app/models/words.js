module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      mot: {type: String, index: { unique: true}},
      definition: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Words = mongoose.model("words", schema);
  return Words;
};
