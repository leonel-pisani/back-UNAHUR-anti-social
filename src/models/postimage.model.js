const mongoose = require('mongoose')

const postimageSchema = new mongoose.Schema({
    idPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    imageUrl: { type: String, required: true },
}, {
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


const PostImage = mongoose.model('PostImage', postimageSchema)

module.exports = PostImage;