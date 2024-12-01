export function formatDate(date: string) {
  const timestamp = new Date(date).getTime();

  const formatter = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  });

  return formatter.format(timestamp);
}

export function formatUserInitial(user: string) {
  return user.replace("user_", "")[0].toUpperCase();
}

export function formatUsername(user: string) {
  return user.replace("user_", "");
}
