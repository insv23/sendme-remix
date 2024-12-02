export function formatDate(date: string) {
  const d = new Date(date);

  const formatted = d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Shanghai'
  });

  return formatted.replace(/\//g, '-');
}
