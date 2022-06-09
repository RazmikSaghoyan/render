'use strict';

module.exports = {
  /**
   * Handle graceful shutdown.
   *
   * @param {object} server Http server instance
   */
  shutdown(server) {
    return () => {
      console.info('Graceful shutdown.');

      server.close(() => {
        console.info('Closing http server.');
        process.exit(0);
      });
    };
  },

  /**
   * Handle errors.
   *
   * @returns {(function(*, *, *, *): (*|undefined))|*}
   */
  handleErrors() {
    return (err, req, res, next) => {
      const { status = 500, message } = err;

      if (res.headersSent) {
        return next(err);
      }

      res.status(status).send({ message });
    };
  },
};
