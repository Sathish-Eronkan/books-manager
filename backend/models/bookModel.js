import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String, 
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});


const Book = mongoose.model('Book', BookSchema);

export default Book;