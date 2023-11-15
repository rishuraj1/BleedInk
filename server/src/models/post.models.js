import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    images: {
      type: [String], //cloudinary links
      required: false,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: false,
    },
    comments: {
      type: [commentSchema],
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

postSchema.plugin(mongooseAggregatePaginate);

const Post = mongoose.model("Post", postSchema);

export default Post;
