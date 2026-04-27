import * as adminService from './admin.service.js';

export const getDashboardStats = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await adminService.getDashboardStats() }); } 
  catch (err) { next(err); }
};

export const getUsers = async (req, res, next) => {
  try { res.status(200).json({ success: true, ...(await adminService.getUsers(req.query.page, req.query.limit)) }); } 
  catch (err) { next(err); }
};

export const updateUserStatus = async (req, res, next) => {
  try { await adminService.updateUserStatus(req.params.userId, req.body.status); res.status(200).json({ success: true, message: "User status updated" }); } 
  catch (err) { next(err); }
};

export const getReports = async (req, res, next) => {
  try { res.status(200).json({ success: true, ...(await adminService.getReports(req.query.status, req.query.page, req.query.limit)) }); } 
  catch (err) { next(err); }
};

export const resolveReport = async (req, res, next) => {
  try { await adminService.resolveReport(req.params.reportId, req.user.id); res.status(200).json({ success: true, message: "Report resolved" }); } 
  catch (err) { next(err); }
};

export const deletePost = async (req, res, next) => {
  try { await adminService.deletePost(req.params.postId); res.status(200).json({ success: true, message: "Post deleted permanently" }); } 
  catch (err) { next(err); }
};

export const getFeatured = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await adminService.getFeaturedPosts() }); } 
  catch (err) { next(err); }
};

export const addFeatured = async (req, res, next) => {
  try { await adminService.addFeaturedPost(req.body.postId, req.user.id); res.status(201).json({ success: true, message: "Post added to featured list" }); } 
  catch (err) { next(err); }
};

export const removeFeatured = async (req, res, next) => {
  try { await adminService.removeFeaturedPost(req.params.postId); res.status(200).json({ success: true, message: "Post removed from featured list" }); } 
  catch (err) { next(err); }
};