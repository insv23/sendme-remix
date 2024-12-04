import { ActionFunction } from "@remix-run/node";
import { uploadFile } from "~/utils/files.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    throw new Response("无效的文件上传", { status: 400 });
  }

  try {
    const uploadedFile = await uploadFile(file);
    return new Response(JSON.stringify(uploadedFile), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("上传失败:", error);
    throw new Response("上传失败", { status: 500 });
  }
};
