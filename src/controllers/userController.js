const { userData } = require("../models/UsersModel");

const getUsers = (req, res, next) => {

    try {
        res.status(200).send({
          success: true,
          data: userData,
        });

    } catch (error) {

        next(error);
    }
  
};
module.exports = { getUsers };