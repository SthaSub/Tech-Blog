const router = require('express').Router();
const { User } = require('../../models');

router.post('/registration', async (req, res)=>{
    try {
        const userData = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        
        res.status(200).json(userData);
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
          req.session.username = userData.name;
          res.json({ user: userData, message: 'You successfully signed in!' });
      });

  } catch (error) {
      res.status(400).json(error);

  }
});


router.get('/registration', (req, res)=>{
  res.render('registration');
});
router.post('/logout', (req, res) => {
    if (req.session.signIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;