const express = require('express');

const authMiddleware = require('../middlewares/auth');
const Menu = require('../models/Menu');
const MenuItems = require('../models/MenuItems');

const router = express.Router();

//router.use(authMiddleware);

//List All
router.get('/', async (req, res) => {
  try {

    const menu = await Menu.find().populate('items');
    return res.status(200).send(menu);

  } catch (err) {
    return res.status(400).send({
      message: 'Menu not found',
      data: e
    });
  };
});

//List One
router.get('/:id', async (req, res) => {
  try {

    const menu = await Menu.findById(req.params.id).populate('items');

    if (!menu)
      return res.status(400).send({
        message: 'Menu not found'
      });

    return res.status(200).send(menu);

  } catch (err) {
    return res.status(400).send({
      message: 'Technology not found',
      data: e
    });
  };
});

//Create
router.post('/', async (req, res) => {

  try {

    const {
      title,
      description,
      icon,
      url,
      items
    } = req.body;

    const menu = await Menu.create({
      title,
      description,
      icon,
      url
    });

    await Promise.all(items.map(async item => {

      const MenuItem = new MenuItems({ ...item,
        technology: menu._id
      })
      await MenuItem.save();

      menu.items.push(MenuItem);
    }));

    await menu.save();

    return res.status(201).send({
      menu
    });

  } catch (err) {
    console.log(err);
    return res.status(400).send({
      error: 'Error creating new menu'
    })
  }

});

module.exports = app => app.use('/menu', router);