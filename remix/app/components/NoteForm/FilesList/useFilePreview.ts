import { useState, useEffect } from "react";

export const useFilePreview = (file: File) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file && isImageFile(file)) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      /**
       * URL.createObjectURL 会创建一个 DOMString，包含一个表示参数中给出的对象的 URL
       * 这个 URL 的生命周期与创建它的窗口中的 document 绑定
       * 每次调用都会创建一个新的 URL 对象，即使是同一个文件
       * 这个 URL 会一直存在，直到 document 被销毁或者手动调用 revokeObjectURL()
       *
       * useEffect 的返回函数会在以下情况被调用：
       * 组件卸载时
       * 依赖项 [file] 变化导致 effect 重新执行前
       */
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  return previewUrl;
};

const isImageFile = (file: File): boolean => {
  return file.type.startsWith("image/");
};
