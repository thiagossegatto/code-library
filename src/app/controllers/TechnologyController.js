const express = require('express');

const authMiddleware = require('../middlewares/auth');
const Technology = require('../models/Technology');
const Items = require('../models/Items');
const AWS = require("../../services/s3");

const router = express.Router();

router.use(authMiddleware);

//List All
router.get('/', async (req, res) => {
  try {

    const tech = await Technology.find().populate('items');
    return res.status(200).send(tech);

  } catch (err) {
    return res.status(400).send({
      message: 'Technology not found',
      data: e
    });
  };
});

//List One
router.get('/:id', async (req, res) => {
  try {

    const tech = await Technology.findById(req.params.id).populate('items');

    if (!tech)
      return res.status(400).send({
        message: 'Technology not found'
      });

    return res.status(200).send(tech);

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
      code,
      image,
      items
    } = req.body;

    // Preparando imagem para banco e S3
    var img_base64 = image;
    var matches = img_base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var ContentType = matches[1];
    let arrayType = ContentType.split('/');
    var type = arrayType[1];
    var name_img = title + '.' + type;
    //    image = name_img;

    const tech = await Technology.create({
      title,
      description,
      code,
      image: name_img,
      user: req.userId
    });

    await Promise.all(items.map(async item => {

      const techItem = new Items({ ...item,
        technology: tech._id
      })
      await techItem.save();

      tech.items.push(techItem);
    }));

    await tech.save();

    // Upload de imagem para o S3
    if (tech)
      AWS.uploadToS3(img_base64, name_img, ContentType);

    return res.status(201).send({
      tech
    });

  } catch (err) {
    console.log(err);
    return res.status(400).send({
      error: 'Error creating new technology'
    })
  }

});

//Edit
router.post('/', async (req, res) => {

  try {

    const {
      title,
      description,
      code,
      image,
      items
    } = req.body;

    // Preparando imagem para banco e S3
    var img_base64 = image;
    var matches = img_base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var ContentType = matches[1];
    let arrayType = ContentType.split('/');
    var type = arrayType[1];
    var name_img = title + '.' + type;
    //    image = name_img;

    const tech = await Technology.create({
      title,
      description,
      code,
      image: name_img,
      user: req.userId
    });

    await Promise.all(items.map(async item => {

      const techItem = new Items({ ...item,
        technology: tech._id
      })
      await techItem.save();

      tech.items.push(techItem);
    }));

    await tech.save();

    // Upload de imagem para o S3
    if (tech)
      AWS.uploadToS3(img_base64, name_img, ContentType);

    return res.status(201).send({
      tech
    });

  } catch (err) {
    console.log(err);
    return res.status(400).send({
      error: 'Error creating new technology'
    })
  }

});

//Edit
router.post('/:id', async (req, res) => {

  try {

    const {
      title,
      description,
      code,
      image,
      items
    } = req.body;

    // Preparando imagem para banco e S3
    var img_base64 = image;
    var matches = img_base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var ContentType = matches[1];
    let arrayType = ContentType.split('/');
    var type = arrayType[1];
    var name_img = title + '.' + type;
    //    image = name_img;

    const tech = await Technology.findOneAndUpdate(req.params.id, {
      title,
      description,
      code,
      image: name_img
    }, { new: true });

    tech.items = [];
    await Items.remove({ technology: tech._id });

    await Promise.all(items.map(async item => {

      const techItem = new Items({ ...item,
        technology: tech._id
      })
      await techItem.save();

      tech.items.push(techItem);
    }));

    await tech.save();

    // Upload de imagem para o S3
    if (tech)
      AWS.uploadToS3(img_base64, name_img, ContentType);

    return res.status(201).send({
      tech
    });

  } catch (err) {
    console.log(err);
    return res.status(400).send({
      error: 'Error creating new technology'
    })
  }

});

module.exports = app => app.use('/tech', router);