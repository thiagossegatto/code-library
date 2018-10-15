const express = require('express');

const authMiddleware = require('../middlewares/auth');
const Items = require('../models/MenuItems');

const router = express.Router();

//router.use(authMiddleware);

//Edit
router.post('/:id', async (req, res) => {

  try {

    const {
      title,
      description,
      icon,
      url
    } = req.body;

    const items = await Items.findOneAndUpdate(req.params.id, {
      title,
      description,
      icon,
      url
    }, { new: true });

    await items.save();

    return res.status(201).send({
      items
    });

  } catch (err) {
    console.log(err);
    return res.status(400).send({
      error: 'Error editing Item'
    })
  }

});

module.exports = app => app.use('/menu-items', router);