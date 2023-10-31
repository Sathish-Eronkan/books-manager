import express from "express";
const router = express.Router();
import { getBooks, getDetails, deleteBook, addBook, updateBook } from "../controllers/BookController.js";
router.route('/').get(getBooks);
router.route('/books/:id').get(getDetails);
router.route('/addbook').post(addBook);
router.route('/updatebook/:id').put(updateBook);
router.route('/deletebook/:id').delete(deleteBook);

export default router;