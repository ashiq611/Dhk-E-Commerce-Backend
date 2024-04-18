

const getUsers = (req, res, next) => {

    try {
        res.status(200).send({
          success: true,
        
        });

    } catch (error) {

        next(error);
    }
  
};
module.exports = { getUsers };