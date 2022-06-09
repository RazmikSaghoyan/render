'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async queryInterface => {
    const user = await queryInterface.rawSelect(
      'users',
      {
        where: {
          email: 'example@gmail.com',
        },
      },
      ['id'],
    );

    if (!user) {
      await queryInterface.bulkInsert('users', [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Terry',
          password: bcrypt.hashSync('qwertyuiop', 10),
          email: 'example@gmail.com'
        },
        {
          id: 2,
          firstName: 'Ashley',
          lastName: 'Cole',
          password: bcrypt.hashSync('asdfghjkl', 10),
          email: 'example@mail.ru'
        },
        {
          id: 3,
          firstName: 'Frank',
          lastName: 'Lampard',
          password: bcrypt.hashSync('zxcvbnm', 10),
          email: 'example@yahoo.com'
        },
      ]);
    }
  },
  down: async queryInterface => await queryInterface.bulkInsert('users', null, {}),
};
