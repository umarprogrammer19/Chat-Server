const registerUser = async (req, res) => {
    try {
        const { fullname, username, password, gender } = req.body;
        if (!fullname || !username || !password || !gender) return res.status(400).json({
            success: false,
            message: "All Fields Are Required"
        });
    } catch (error) {

    }
}