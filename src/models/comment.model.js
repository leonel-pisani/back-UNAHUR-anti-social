const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    idPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // el requerido va?
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // el requerido va?
    content: { type: String, required: true, trim: true}, 
    
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


const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;