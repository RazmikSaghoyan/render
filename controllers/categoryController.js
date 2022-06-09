const { Category, Announcement} = require('../models');

module.exports = {
  /**
   * Get single category
   */
  get(req, res, next) {
    return Category.findOne({
      where: { id: parseInt(req.params.id) },
      include: [
        {
          model: Announcement,
          as: 'announcements'
        },
        {
          model: Category,
          as: 'children'
        }
      ]
    })
      .then(category => {
        if (category) {
          return res.json(category);
        }

        return res.status(404).json({ message: 'Category not found' });
      })
      .catch(next);
  },

  /**
   * Get all category
   */
  getAll(req, res, next) {
    return Category.findAll({
      raw: true
    })
      .then(categories => res.json(createDataTree(categories)))
      .catch(next);
  },

  /**
   * Create a new category instance
   */
  store(req, res, next) {
    const { title, parentId = null } = req.body;

    return Category.create({
      title,
      parentId
    })
      .then(category => res.json(category))
      .catch(next);
  },

  /**
   * Update single category data
   */
  update(req, res, next) {
    const { title, parentId = null } = req.body;

    return Category.update({
      title, parentId
    }, { where: { id: parseInt(req.params.id) } })
      .then(category => {
        if (!!category[0]) {
          return res.send({ message: 'Updated successfully' });
        }

        return res.send({ message: 'Can\'t update category' });
      })
      .then(category => res.json(category))
      .catch(next);
  },

  /**
   * Deleting category
   */
  delete(req, res, next) {
    return Category.destroy({
      where: { id: parseInt(req.params.id) },
    })
      .then(category => {
        if (category) {
          return res.json(category);
        }

        return res.status(404).json({ message: 'Category not found' });
      })
      .catch(next);
  }
};

/**
 * Data tree creation functionality
 */
function createDataTree(dataset) {
  const hashTable = Object.create(null);

  dataset.forEach(data => hashTable[data.id] = {...data, children: []});

  const dataTree = [];

  dataset.forEach(data => {
    if (data.parentId) {
      hashTable[data.parentId].children.push(hashTable[data.id])
    } else {
      dataTree.push(hashTable[data.id])
    }
  });

  return dataTree;
}