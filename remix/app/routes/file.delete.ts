// routes/file.delete.ts
import { ActionFunction } from "@remix-run/node";
import { deleteFile } from "~/utils/files.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const fileId = formData.get("id") as string;

  if (!fileId) {
    throw new Response("未能获取文件ID", { status: 400 });
  }

  try {
    await deleteFile(fileId);
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("🗑️ 删除失败:", error);
    throw new Response("删除文件失败", { status: 500 });
  }
};
