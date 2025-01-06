import User from "../models/user.model.js"

export const loginUser = async (req, res) => {

    const data = req.body 
    if (!data) {
        return res.status(400).json({ message: "No data received" });
    }

    const user = await User.findOne({ clerkUserId: data.id });

    if (user) {
        return res.status(200).json({ message: "logined successfully" });
    }

    const newUser = new User({
        clerkUserId: data.id, 
        username: data.username || data.emailAddresses[0].emailAddress,
        email: data.emailAddresses[0].emailAddress,
        img: data.imageUrl,
    });



    await newUser.save(); 
    return res.status(201).json({message:"User created successfully"});
}

 