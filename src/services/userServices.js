export const getUsers = async (req, res) => {
    return res.status(200).json({
        message: 'Users fetched successfully',
        data: users
    });
};

export const getUser = async (req, res) => {
    return res.status(200).json({
        message: 'User fetched successfully',
        data: user
    });
};

export const createUser = async (req, res) => {
    return res.status(201).json({
        message: 'User created successfully',
        data: user
    });
};

export const patchUser = async (req, res) => {
    return res.status(200).json({
        message: 'User patched successfully',
        data: user
    });
};

export const updateUser = async (req, res) => {
    return res.status(200).json({
        message: 'User updated successfully',
        data: user
    });
};

export const deleteUser = async (req, res) => {
    return res.status(200).json({
        message: 'User deleted successfully',
        data: user
    });
};