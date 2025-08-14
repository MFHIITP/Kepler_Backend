import {Router} from 'express'
import getbooks from '../controllers/getbooks.controller.js';
import addbooks from '../controllers/addbooks.controller.js';
import courseList from '../controllers/getLibraryCourses.controller.js';
import deleteBook from '../controllers/deleteBook.controller.js';

const router = Router();
router.route('/books/getBook').post(getbooks);
router.route('/books/postBook').post(addbooks);

router.route('/courses/getCourses').post(courseList)
router.route('/books/deleteBook').post(deleteBook);

export default router;