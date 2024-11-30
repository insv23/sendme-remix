export function formatDate(date: string) {
  return new Date(date).toLocaleString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatUserInitial(user: string) {
  return user.replace("user_", "")[0].toUpperCase();
}

export function formatUsername(user: string) {
  return user.replace("user_", "");
} 