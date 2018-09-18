const express = require('express');

const authMiddleware = require('../middlewares/auth');
const Items = require('../models/Items');

const router = express.Router();

router.use(authMiddleware);

//Edit
router.post('/:id', async (req, res) => {

  try {

    const {
      title,
      description,
      code
    } = req.body;

    const items = await Items.findOneAndUpdate(req.params.id, {
      title,
      description,
      code
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

module.exports = app => app.use('/items', router);