const { blogsPostsService } = require('../service');

// const createPost = async (req, res) => {
//     const { type, message } = await blogsPostsService.createPost(req.user, req.body);

//     if (type) return res.status(type).json({ message });

//     res.status(201).json(message);
// };

const getAll = async (_req, res) => {
    const { message } = await blogsPostsService.getAll();

    res.status(200).json(message);
};

module.exports = {
    // createPost,
    getAll,
};