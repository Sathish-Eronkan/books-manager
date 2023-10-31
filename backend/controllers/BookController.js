import Book from '../models/bookModel.js';
const getBooks = async (req,res) => {
    try {
        console.log('inside get books');
        const books = await Book.find({});
        res.json(books);
    } catch (err) {
        console.log('Error fetching book:',err);
    }
}

const getDetails = async (req,res) => {
    try {
        let bookId = req.params.id;
        console.log('bookId for details ',bookId);
        let bookDetails = await Book.findById(bookId);
        console.log('bookDetails ',bookDetails);
        res.json(bookDetails);
    } catch (err) {
        console.log('Error fetching book details:',err);
    }
}

const addBook = async (req, res) => {
    try {
        await Book.create(req.body)
        res.status(200).json({message: 'Book Created Successfully'});
    } catch (err) {
        console.log('Error updating book:',err);
    }
}

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const newData = req.body;
    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      {
        name: newData.name,
        author: newData.author,
        genre: newData.genre,
        rating: newData.rating,
        description: newData.description,
      },
      { new: true }
    );

    if (!updatedBook) {
      console.log('Book not found or unable to update.');
      return;
    }

    console.log('Book updated successfully:', updatedBook);
    res.status(200).json({message: 'Book Updated Successfully'});
  } catch (err) {
    console.error('Error updating book:', err);
  }
}

const deleteBook = async (req, res) => {
    try {
        const result = await Book.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
        console.log('Book not found or unable to delete.');
        return;
        }

        console.log('Book deleted successfully.');
        res.status(200).json({message: 'Book Deleted Successfully'});
    } catch (err) {
        console.error('Error deleting book:', err);
  }
}

export {getBooks, getDetails, deleteBook, addBook, updateBook};