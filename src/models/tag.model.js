const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
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


const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag; 