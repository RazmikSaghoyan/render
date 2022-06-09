const { Announcement, Category, User} = require('../models');

module.exports = {
  /**
   * Get single announcement
   */
  get(req, res, next) {
    return Announcement.findOne({
      where: { id: parseInt(req.params.id) },
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

        return res.status(404).json({ message: 'Announcement not found' });
      })
      .catch(next);
  },

  /**
   * Get all announcement
   */
  getAll(req, res, next) {
    return Announcement.findAll({
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
      .then(announcement => res.json(announcement))
      .catch(next);
  },

  /**
   * Create a new announcement instance
   */
  store(req, res, next) {
    const {
      title,
      description = null,
      image = null,
      categoryId,
      userId
    } = req.body;

    return Announcement.create({
      title,
      description,
      image,
      categoryId,
      userId
    })
      .then(announcement => res.json(announcement))
      .catch(next);
  },

  /**
   * Update single announcement data
   */
  update(req, res, next) {
    const {
      title,
      description = null,
      image = null,
      categoryId,
      userId
    } = req.body;

    return Announcement.update({
      title,
      description,
      image,
      categoryId,
      userId
    }, { where: { id: parseInt(req.params.id) } })
      .then(announcement => {
        if (!!announcement[0]) {
          return res.send({ message: 'Updated successfully' });
        }

        return res.send({ message: 'Can\'t update announcement' });
      })
      .then(announcement => res.json(announcement))
      .catch(next);
  },

  /**
   * Deleting announcement
   */
  delete(req, res, next) {
    return Announcement.destroy({
      where: { id: parseInt(req.params.id) },
    })
      .then(announcement => {
        if (announcement) {
          return res.json(announcement);
        }

        return res.status(404).json({ message: 'Announcement not found' });
      })
      .catch(next);
  }
};
