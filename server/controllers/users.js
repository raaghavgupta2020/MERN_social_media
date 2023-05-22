import User from "../models/User.js"

export const getUser = async (req, res) => { //controller for the .get type route\
    try{
        const {id} = req.params;
        const user = await User.findById(id); //can we use findOne here ???
        res.status(200).json(user); //user is object here
    }catch(err){
        res.status(404).json({message : err.message}); //user is object here

    }
     
}
export const getUserFriends = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id); //can we use findOne here ???
        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );
          res.status(200).json(formattedFriends);
    } catch (err) {
          res.status(404).json({ message: err.message });
    }
};

export const addRemoveFriend = async (req, res) => {
    try{
        //__________________________________
        const {id , friendID} = req.params;
        const user = User.findById(id);
        const friend = User.findById(friendID);
        if(user.friends.includes(friendID)){
            user.friends = user.friends.filter((id) => id!==friendID)
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        //__________________________________ (this is the part which updates )
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};