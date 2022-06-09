const { User, Announcement} = require('../models');

module.exports = {
  /**
   * Get single user
   */
  get(req, res, next) {
    return User.findOne({
      where: { id: parseInt(req.params.id) },
      include: {
        model: Announcement,
        as: 'announcements'
      }
    })
      .then(user => {
        if (user) {
          return res.json(user);
        }

        return res.status(404).json({ message: 'User not found' });
      })
      .catch(next);
  },

  /**
   * Get all users
   */
  getAll(req, res, next) {
    return User.findAll({
      include: {
        model: Announcement,
        as: 'announcements',
      },
    })
      .then(users => res.json(users))
      .catch(next);
  },

  /**
   * Create a new user instance
   */
  store(req, res, next) {
    const { firstName, lastName, email, password } = req.body;

    return User.create({
      firstName,
      lastName,
      email,
      password
    })
      .then(user => res.json(user))
      .catch(next);
  },

  /**
   * Update single user data
   */
  update(req, res, next) {
    const { firstName, lastName, email, password } = req.body;

    return User.update({
      firstName, lastName, email, password
    }, { where: { id: parseInt(req.params.id) } })
      .then(user => {
        if (!!user[0]) {
          return res.send({ message: 'Updated successfully' });
        }

        return res.send({ message: 'Can\'t update user' });
      })
      .then(user => res.json(user))
      .catch(next);
  },

  /**
   * Deleting user
   */
  delete(req, res, next) {
    return User.destroy({
      where: { id: parseInt(req.params.id) },
    })
      .then(user => {
        if (user) {
          return res.json(user);
        }

        return res.status(404).json({ message: 'User not found' });
      })
      .catch(next);
  }
};
