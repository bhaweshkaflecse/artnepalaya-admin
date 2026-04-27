import * as postService from './post.service.js';

export const createPost = async (req, res, next) => {
  try {
    const post = await postService.createPost(req.user.id, req.body);
    res.status(201).json({ success: true, message: "Post created successfully", data: post });
  } catch (err) { next(err); }
};

export const getSinglePost = async (req, res, next) => {
  try {
    const post = await postService.getSinglePost(req.params.postId);
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    if (err.status === 404) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: err.message }});
    next(err);
  }
};

export const getFeed = async (req, res, next) => {
  try {
    const { cursor, limit } = req.query;
    const result = await postService.getFeed(req.user.id, cursor, limit);
    res.status(200).json({ success: true, data: result.data, meta: result.meta });
  } catch (err) { next(err); }
};

export const likePost = async (req, res, next) => {
  try {
    await postService.addLike(req.user.id, req.params.postId);
    res.status(200).json({ success: true, message: "Post liked" });
  } catch (err) {
    if (err.status === 404) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: err.message }});
    next(err);
  }
};

export const unlikePost = async (req, res, next) => {
  try {
    await postService.removeLike(req.user.id, req.params.postId);
    res.status(200).json({ success: true, message: "Post unliked" });
  } catch (err) { next(err); }
};

export const savePost = async (req, res, next) => {
  try {
    await postService.addSave(req.user.id, req.params.postId);
    res.status(200).json({ success: true, message: "Post saved" });
  } catch (err) {
    if (err.status === 404) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: err.message }});
    next(err);
  }
};

export const unsavePost = async (req, res, next) => {
  try {
    await postService.removeSave(req.user.id, req.params.postId);
    res.status(200).json({ success: true, message: "Post unsaved" });
  } catch (err) { next(err); }
};