const { User, Announcement} = require('../models');

module.exports = {
  /**
   * Get single user
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async get(req, res, next) {
    await User.findOne({
      where: { id: req.params.id },
      include: {
        model: Announcement,
        as: 'announcements'
      }
    })
      .then(user => {
        if (user) {
          return res.json(user);
        }

        return res.status(400).json({ message: 'User not found' });
      })
      .catch(e => next(e));
  },

  /**
   * Get all users
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async getAll(req, res, next) {
    await User.findAll({
      include: {
        model: Announcement,
        as: 'announcements',
      },
    })
      .then(users => {
        return res.json(users);
      })
      .catch(e => next(e));
  },

  /**
   * Create a new user instance
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async store(req, res, next) {
    const { firstName, lastName, email, password } = req.body;

    return await User.create({
      firstName,
      lastName,
      email,
      password
    })
      .then(user => {
        return res.json(user);
      })
      .catch(e => next(e));
  },

  /**
   * Update single user data
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async update(req, res, next) {
    const { firstName, lastName, email, password } = req.body;

    return await User.update({
      firstName, lastName, email, password
    }, { where: { id: req.params.id } })
      .then(user => {
        if (user) {
          return res.send({ message: 'Updated successfully' });
        }

        return res.send({ message: 'Can\'t update user' });
      })
      .then(user => {
        return res.json(user);
      })
      .catch(e => next(e));
  },

  /**
   * Deleting user
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async delete(req, res, next) {
    await User.destroy({
      where: { id: req.params.id },
    })
      .then(user => {
        if (user) {
          return res.json(user);
        }

        return res.status(400).json({ message: 'User not found' });
      })
      .catch(e => next(e));
  }
};
