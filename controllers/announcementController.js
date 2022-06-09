const { Announcement, Category, User} = require('../models');

module.exports = {
  /**
   * Get single announcement
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async get(req, res, next) {
    await Announcement.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Category,
          as: 'category'
        },
        {
          model: User,
          as: 'user'
        },
      ]
    })
      .then(announcement => {
        if (announcement) {
          return res.json(announcement);
        }

        return res.status(400).json({ message: 'Announcement not found' });
      })
      .catch(e => next(e));
  },

  /**
   * Get all announcement
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async getAll(req, res, next) {
    await Announcement.findAll({
      include: [
        {
          model: Category,
          as: 'category'
        },
        {
          model: User,
          as: 'user'
        },
      ],
    })
      .then(announcement => {
        return res.json(announcement);
      })
      .catch(e => next(e));
  },

  /**
   * Create a new announcement instance
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async store(req, res, next) {
    const {
      title,
      description = null,
      image = null,
      categoryId,
      userId
    } = req.body;

    return await Announcement.create({
      title,
      description,
      image,
      categoryId,
      userId
    })
      .then(announcement => {
        return res.json(announcement);
      })
      .catch(e => next(e));
  },

  /**
   * Update single announcement data
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async update(req, res, next) {
    const {
      title,
      description = null,
      image = null,
      categoryId,
      userId
    } = req.body;

    return await Announcement.update({
      title,
      description,
      image,
      categoryId,
      userId
    }, { where: { id: req.params.id } })
      .then(announcement => {
        if (announcement) {
          return res.send({ message: 'Updated successfully' });
        }

        return res.send({ message: 'Can\'t update announcement' });
      })
      .then(announcement => {
        return res.json(announcement);
      })
      .catch(e => next(e));
  },

  /**
   * Deleting announcement
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async delete(req, res, next) {
    await Announcement.destroy({
      where: { id: req.params.id },
    })
      .then(announcement => {
        if (announcement) {
          return res.json(announcement);
        }

        return res.status(400).json({ message: 'Announcement not found' });
      })
      .catch(e => next(e));
  }
};
