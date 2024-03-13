const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  const userData = Product.findAll().catch((err) => {
    res.json(err);
  });
  res.json(userData);
});

router.get('/:id', (req, res) => {
  try {
    const userData = Tag.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const userData = Tag.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(userData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id', (req, res) => {
  try {
    const userData =  Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    const userData = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
