/**
 * 格式化笔记日期为本地化字符串
 */
export function formatNoteDate(date: string) {
  return new Date(date).toLocaleString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * 从用户ID中获取用户首字母
 */
export function getUserInitial(user: string) {
  return user.replace("user_", "")[0].toUpperCase();
}

/**
 * 格式化用户名（移除前缀）
 */
export function formatUsername(user: string) {
  return user.replace("user_", "");
}
