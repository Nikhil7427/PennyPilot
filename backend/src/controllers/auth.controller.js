export const registerUser = async(req, res) => {
    try {
        res.status(201).json({
            success: true,
            message: "Register Api is working",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}