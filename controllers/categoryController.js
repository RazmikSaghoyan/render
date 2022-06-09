const { Category, Announcement} = require('../models');

module.exports = {
  /**
   * Get single category
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async get(req, res, next) {
    await Category.findOne({
      where: { id: req.params.id },
      include: {
        model: Announcement,
        as: 'announcements'
      }
    })
      .then(category => {
        if (category) {
          return res.json(category);
        }

        return res.status(400).json({ message: 'Category not found' });
      })
      .catch(e => next(e));
  },

  /**
   * Get all category
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async getAll(req, res, next) {
    await Category.findAll({
      include: {
        model: Announcement,
        as: 'announcements',
      },
    })
      .then(category => {
        return res.json(category);
      })
      .catch(e => next(e));
  },

  /**
   * Create a new category instance
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async store(req, res, next) {
    const { title, parentId = null } = req.body;

    return await Category.create({
      title,
      parentId
    })
      .then(category => {
        return res.json(category);
      })
      .catch(e => next(e));
  },

  /**
   * Update single category data
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async update(req, res, next) {
    const { title, parentId = null } = req.body;

    return await Category.update({
      title, parentId
    }, { where: { id: req.params.id } })
      .then(category => {
        if (category) {
          return res.send({ message: 'Updated successfully' });
        }

        return res.send({ message: 'Can\'t update category' });
      })
      .then(category => {
        return res.json(category);
      })
      .catch(e => next(e));
  },

  /**
   * Deleting category
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async delete(req, res, next) {
    await Category.destroy({
      where: { id: req.params.id },
    })
      .then(category => {
        if (category) {
          return res.json(category);
        }

        return res.status(400).json({ message: 'Category not found' });
      })
      .catch(e => next(e));
  }
};
