const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true, trim: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    //imagen:[{type: mongoose.Schema.Types.ObjectId, ref: 'PostImage'}]
    images:[{ type: mongoose.Schema.Types.ObjectId, ref: 'PostImage' }] // va este o el de arriba?
}, {
    timestamps:true,
    strict: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})


const Post = mongoose.model('Post', postSchema);

module.exports = Post;