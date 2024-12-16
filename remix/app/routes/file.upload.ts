import { ActionFunction } from "@remix-run/node";
import { saveFile } from "~/utils/files.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  /**
   * 生产模式下
   * formData.get 返回的值并不是 File 对象，而是一个 FileLike 对象
   * 该 FileLike 对象不是 File 对象, 也不是 Blob 对象
   * uploadFile 直接把它当 File 用居然没问题，真是神奇
   * ----------------------------------------------------------------
   * 这个问题只在生产环境出现，开发环境不会
   * 因为开发使用的是 Vite 浏览器，它运行在浏览器环境中，formData.get 返回的是 File 对象
   * 而生产环境使用的是 Node.js，formData.get 返回的是 FileLike 对象
   * 注意：Node.js 环境中也有 File 对象（通过 undici 等库提供），
   */
  const file = formData.get("file");

  const fileId = formData.get("id") as string;

  if (!file) {
    throw new Response("未能获取文件", { status: 400 });
  }

  if (!fileId) {
    throw new Response("未能获取文件ID", { status: 400 });
  }

  try {
    const savedFile = await saveFile(file as File, fileId);
    return new Response(JSON.stringify(savedFile), {
      headers: {
        "Content-Type": "application/json",
      },
      // TODO: 有必要返回文件吗?
    });
  } catch (error) {
    console.error("🤮 上传失败:", error);
    return new Response(JSON.stringify({ error: "🤮 上传失败" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
