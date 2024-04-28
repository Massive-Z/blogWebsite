import mongoose from 'mongoose';
const {Schema, model } = mongoose;

const blogPostSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    likes : {
        type: Number,
        default: 0,
    },
    createdAt : {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    author : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    url : {
        type: String,
        required: false
    },
    comments : [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: String,
        likes: Number
    }]
});

const BlogModel = model('BlogModel', blogPostSchema);

export default BlogModel;