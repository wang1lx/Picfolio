const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/user');

const router = express.Router();

// @route    POST api/users
// @desc     Register a user
// @access   Public
// Header body: JSON { "name": '', "email": '', "password": '' }
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      // Will contain above errors if there are any
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if user with email already exists
      const { username, name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'That user already exists' });
      }

      user = new User({
        username,
        name,
        email,
        password
      });

      // Encrypt user password before storing into DB
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const userData = {
        user: {
          id: user.id
        }
      };

      // Return jwt token, expiration in 1hr
      const tokenSecret = config.has('tokenSecret')
        ? config.get('tokenSecret')
        : 'mytemporarysecret';
      jwt.sign(userData, tokenSecret, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/users
// @desc     Delete a user
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/users
// @desc     Get all users
// @access   Public
// USED FOR TESTING PURPOSES ONLY
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/users/profile/username
// @desc     Get user by username
// @access   Public
router.get('/profile/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    
    if (!user) {
      console.log("no user");
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users/me
// @desc    Update user's information
// @access  Private
router.post('/me', auth, async (req, res) => {
  const { location, bio, youtube, facebook, twitter, instagram, linkedin } = req.body;

  // Build user information object
  const profileFields = {};
  // if (location) profileFields.location = location;
  // if (bio) profileFields.bio = bio;

  // Build socials object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  
  try {
    let user = await User.findById(req.user.id);

    if (user) {
      // Update
      user.profile.location = location;
      user.profile.bio = bio;
      user.profile.social = profileFields.social;
      await user.save();
      // user = await User.findByIdAndUpdate(
      //   req.user.id,
      //   { $set: { profile: profileFields } }
      // ).select('-password');

      return res.json(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/me/services', auth, async (req, res) => {
  const { name, description, price } = req.body;

  // Build a service object
  const service = {} 
  if (name) service.name = name;
  if (description) service.description = description;
  if (price) service.price = price;

  try {
    let user = await User.findById(req.user.id);

    if (user) {
      user.profile.services.push(service);
      await user.save();
      // User.findByIdAndUpdate(
      //   req.user.id,
      //   { $push : { services: service } },
      //   { new: true }
      // ).select('-password');

      return res.json(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
})
module.exports = router;
