import { Notification } from './notification.model.js';

export const createNotification = async (payload) => {
  const { recipientId, senderId, postId, type, message } = payload;
  
  if (senderId && recipientId.toString() === senderId.toString()) return null; 

  if (type === 'Like' || type === 'Save') {
    const existing = await Notification.findOneAndUpdate(
      { recipientId, senderId, postId, type },
      { $set: { isRead: false, createdAt: new Date() } },
      { new: true }
    );
    if (existing) return existing;
  }
  return Notification.create({ recipientId, senderId, postId, type, message });
};

export const getUserNotifications = async (userId, page, limit) => {
  const skip = (page - 1) * limit;
  const [notifications, totalItems, unreadCount] = await Promise.all([
    Notification.find({ recipientId: userId }).sort({ createdAt: -1 }).skip(skip).limit(limit)
      .populate('senderId', 'username avatarUrl')
      .populate('postId', 'media').lean(),
    Notification.countDocuments({ recipientId: userId }),
    Notification.countDocuments({ recipientId: userId, isRead: false })
  ]);
  const totalPages = Math.ceil(totalItems / limit);
  return {
    data: notifications,
    meta: { currentPage: page, limit, totalItems, totalPages, unreadCount, hasNextPage: page < totalPages }
  };
};

export const markAllAsRead = async (userId) => {
  await Notification.updateMany({ recipientId: userId, isRead: false }, { $set: { isRead: true } });
  return true;
};