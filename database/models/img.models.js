module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define('image', {
      type: {
      type: Sequelize.STRING
      },
      name: {
      type: Sequelize.STRING
      },
      data: {
      type: Sequelize.BLOB('long')
      }
    });
    
    return Image;
  }