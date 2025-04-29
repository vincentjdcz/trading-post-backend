const User = require('../../models/user/model');

const uploadProfilePicture = async (req, res) => {
    try {
        console.log("In upload profile picture");
        const {userId, profilePicture} = req.body;

        if(!userId || !profilePicture) {
            return res.status(400).json({message: "User ID and profile picture are required"});
        }

        //Find the user by ID and update their profilePicture field
        //first paramter is the id of the particular user document
        //second is the update object (the fields we want to change) - here profilePicture is short for profilePicture: profilePicture
        //{new: true} specifies that the new updated document is returned (by default the old one is returned)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture },
            { new: true }
        );

        if(!updatedUser) {
            return res.status(404).json({message: "User not found"});
        }
        console.log("updated user: ");
        console.log(updatedUser);
        res.status(200).json({message: "Profile picture updated successfully", user: updatedUser});
    } catch (error) {
        console.error("Error updating profile picture: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {uploadProfilePicture}