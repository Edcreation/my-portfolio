import { Router } from 'express'
import { getBlogs, getSingleBlog, createBlog, editBlog, deleteBlog, likeBlog } from '../controllers/blogs.js'
import Joi from 'joi'
import errorMessage from '../utils/errormessage.js'
import { validate } from '../middleware/validation.js'
import upload from '../middleware/upload.js'
import { postComment, getComments } from '../controllers/postComment.js'
import passport from 'passport'
import bodyParser from 'body-parser'
import { isLoggedIn, isLoggedInAsAdmin } from '../middleware/isLoggedIn.js';

const router = Router()
router.use(bodyParser.json());
router.use(passport.initialize());
router.use(passport.session());

const BlogsSchema = Joi.object().keys({
    title: Joi.string().required().messages(errorMessage('Title')),
    content: Joi.string().required().messages(errorMessage('Content')),
    publicId: Joi.string(),
    imageUrl: Joi.string(),
}).unknown(true);
const CommentSchema = Joi.object().keys({
    comment: Joi.string().required().messages(errorMessage('Comment'))
}).unknown(true);

router.get('/', getBlogs)
router.get('/b/:id', getSingleBlog)

router.post('/b/c/:id',isLoggedIn, validate(CommentSchema, { abortEarly: false } ), postComment)
router.get('/b/c/:id', getComments)

router.put('/like/:id',isLoggedIn, likeBlog)

router.post('/create',isLoggedInAsAdmin, upload.single("blogImage") ,validate(BlogsSchema, { abortEarly: false } ), createBlog)
router.put('/edit/:id',isLoggedInAsAdmin,  upload.single('blogImage') , validate(BlogsSchema, { abortEarly: false } ), editBlog)
router.delete('/delete/:id', isLoggedInAsAdmin, deleteBlog)

export default router