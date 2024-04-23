const data = require("../data");
const User = require("../models/UsersModel");



const seedUser = async (req, res, next) => {

    try {  
        // deleting all existing user
        await User.deleteMany({})
        // creating new user 
        const users = await User.insertMany(data.users); 
        
        // successful retrun
        res.status(201).json({
            success: true,
            message: "Users seeded successfully",
            users
        });

    } catch (error) {

        next(error);
    }
}


module.exports = { seedUser }