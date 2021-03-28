const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
let postId = 0;

router.post('/', async (req, res) => {
  try {
        const comment = await Comment.create({
            comment: req.body.comment,
            post_id: req.body.getCurrentUrlPost_id,
            user_id: req.session.user_id
        });
        res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        postId = req.params.id;
        const post = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ]
        });
        const comments = await Comment.findAll({
            where:{
                post_id:req.params.id
            },
            include:{
                model:User,
                attributes:['name']
            }
        });
        const postPlain = post.get({ plain: true });
        const commentsPlain = comments.map(comment=>comment.get({plain:true}));
        //res.json({postPlain,commentsPlain});
         res.status(200).render('feedback', { postPlain, commentsPlain });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

router.get('/', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.signIn) {
      res.redirect(`/api/comments/${postId}`);
      return;
    }
  
    res.render('welcome');
  });
module.exports = router;