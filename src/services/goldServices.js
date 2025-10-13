export const getGold = async (req, res) => {
    return res.status(200).json({
        message: 'Gold fetched successfully',
        data: "Gold"
    });
};