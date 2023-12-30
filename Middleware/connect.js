const mongoose = require("mongoose");
const Admin = require("../Model/admin");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/stockit", {
      
        });
        console.log("Database connected :=====> BACKEND");
        const adminCount = await Admin.countDocuments({});
        
        if (adminCount === 0) {
            const newAdmin = new Admin({
                username: 'test',
                password: 'test',
               
            });
            await newAdmin.save();
            console.log('New admin added.');
        } else {
            console.log('Admin already exists. No new admin added.');
        }
    } catch (err) {
        console.log(`Error in connecting to database BACKEND : ${err}`);
    }
};

connectDB();

module.exports.mongoose = mongoose;
