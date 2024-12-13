/**
 * 格式化日期
 * @param date 日期字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: string) {
  const d = new Date(date);

  const formatted = d.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  });

  return formatted.replace(/\//g, "-");
}

/**
 * 对文件名进行中间截断
 * Truncate filename in the middle, preserving extension
 * @param filename 完整文件名
 * @param maxLength 期望的最大长度(不包括省略号)
 * @returns 截断后的文件名
 */
export function truncateFilename(
  filename: string,
  maxLength: number = 20
): string {
  // 如果文件名小于最大长度，直接返回
  if (filename.length <= maxLength) return filename;

  // 分离文件名和扩展名
  const lastDotIndex = filename.lastIndexOf(".");
  const ext = lastDotIndex !== -1 ? filename.slice(lastDotIndex) : "";
  const name = lastDotIndex !== -1 ? filename.slice(0, lastDotIndex) : filename;

  // 计算前后应保留的字符数
  const remainingLength = maxLength - ext.length;
  const frontChars = Math.ceil(remainingLength / 2);
  const backChars = Math.floor(remainingLength / 2);

  // 进行截断
  const truncated = `${name.slice(0, frontChars)}...${name.slice(
    -backChars
  )}${ext}`;

  return truncated;
}
