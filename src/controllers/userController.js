const createHttpError = require("http-errors");
const User = require("../models/UsersModel");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const searchRegex = new RegExp(".*" + search + ".*", "i"); // i for case insensitive, .* for any characters before and after search string

    const filter = {
      isAdmin: {
        $ne: true,
      },
      $or: [
        // search by different fields
        {
          name: {
            $regex: searchRegex,
          },
        },
        {
          email: {
            $regex: searchRegex,
          }, // search by email
        },
        {
          phone: {
            $regex: searchRegex,
          }, // search by phone
        },
      ],
    };

    const options = {
        password: 0, // exclude password field
    }

    const users = await User.find(filter, options)
    .limit(limit) // limit to show
    .skip((page - 1) * limit); //skip the first n items

    const count = await User.find(filter).countDocuments(); // get total count of users without limit and skip for pagination calculation 


    if(!users) throw new createHttpError(404, "No user found"); // throw error if no user found


    res.status(200).send({
      success: true,
      users,
      pagination: {
        currentpage: page,
        perviousPage: page > 1 ? page - 1 : null, // show previous page number if not in first page else null 
        nextPage: page < Math.ceil(count / limit) ? page + 1 : null, // show next page number if not in last page else null
        limit,
        total: count,
        totalPage: Math.ceil(count / limit), // calculate total page
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getUsers };
