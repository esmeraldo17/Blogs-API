const { blogsPostsService } = require('../service');

const createPost = async (req, res) => {
    const { type, message } = await blogsPostsService.createPost(req.user, req.body);

    if (type) return res.status(type).json({ message });

    res.status(201).json(message);
};

const getAll = async (_req, res) => {
    const { message } = await blogsPostsService.getAll();

    res.status(200).json(message);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await blogsPostsService.getById(id);
    if (type) return res.status(type).json({ message });
    res.status(200).json(message);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    console.log(req.user);
    const { type, message } = await blogsPostsService.updatePost(id, req.user, req.body);
    
    if (type) return res.status(type).json({ message });
    
    res.status(200).json(message);
};
module.exports = {
    createPost,
    getAll,
    getById,
    updatePost,
};