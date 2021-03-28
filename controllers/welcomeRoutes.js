const router = require('express').Router();
const { User, Post } = require('../models');
const withauth = require('../utils/auth');
// router.get('/', async (req, res) => {
//     res.render('welcome');
// });
router.get('/', async (req, res) => {
    try {
        if (req.session.signIn) {
            res.redirect('/dashboard');
            return;
          }
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['name']
            }]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        
        // res.json(posts);
         res.render('welcome',{posts, signIn:req.session.signIn, valid:req.query.valid});
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/login', async (req, res) => {
  try {
      const userData = await User.findOne({
          where: { email: req.body.email }
      });

      if (!userData) {
          res
              .status(404)
              .json({ message: 'Incorrect email or password, please try again' });
          return;
      }

      const validPassword = userData.passwordCheaker(req.body.password);
      if (!validPassword) {
          res
              .status(404)
              .json({ message: 'Incorrect email or password, please try again' });
          return;
      }
      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.signIn = true;
          res.json({ user: userData, message: 'You successfully signed in!' });
      });

  } catch (error) {
      res.status(400).json(error);

  }
});

router.get('/dashboard', withauth, async (req, res) => {
    const postData = await Post.findAll({
        include: [{
            model: User,
            attributes: ['name']
        }]
    });

    const plainPost = postData.map((post) => post.get({ plain: true }));
    
    const posts = [];
    plainPost.forEach(post => {
        if (req.session.user_id === post.user_id) {
            post.author = req.session.signIn;
            posts.push(post);
        }else{
            posts.push(post);
        }
    });

    // res.json(posts);
     res.render('dashboard', { posts, name:req.session.username.toUpperCase(),signIn:req.session.signIn });
});

module.exports = router;