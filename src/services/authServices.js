export const register = async (req, res) => {
    return res.status(201).json({
        message: 'User registered successfully',
        data: user
    });
};

export const login = async (req, res) => {
    return res.status(200).json({
        message: 'User logged in successfully',
        data: user
    });
};