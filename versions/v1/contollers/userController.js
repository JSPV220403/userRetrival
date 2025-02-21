const users = require("../models/users");

const controller = {};

controller.Insert = async (req, res) => {
    try {
        const { name, designation } = req.body;

        const data = await users.create({
            name,
            designation,
            userimage: req.file ? req.file.filename : null, 
            active:0
        });

        if (data.id) {
            data.user_id = name + data.id;
            await data.save();
        }

        res.send({ message: "Added successfully" });

    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

controller.getAllPeople = async (req, res) => {
    try {
        const allUsers = await users.findAll();

        if (allUsers.length > 0) {
            const usersWithImages = allUsers.map(user => ({
                ...user.dataValues,
                imagename: user.userimage ? `http://localhost:8080/uploads/${user.userimage}` : null,
            }));

            res.json(usersWithImages);
        } else {
            res.json({ message: "No data found matching the criteria." });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

controller.changeStatus = async (req, res) => {
    try {
        const { user_id } = req.query;

        // Find user by user_id
        const data = await users.findOne({ where: { user_id } });

        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }

        data.active = data.active === 0 ? 1 : 0;
        await data.save();

        res.json({ message: `User status changed to ${data.active}` });

    } catch (error) {
        console.error("Error changing user status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = controller;
