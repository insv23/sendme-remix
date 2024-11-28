import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createNote } from "~/utils/notes.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const text = formData.get("text") as string;

  if (!text?.trim()) {
    return json({ error: "笔记内容不能为空" }, { status: 400 });
  }

  await createNote({
    text,
    user: ["user_default"], // 这里应该使用实际的用户ID
    files: [],
  });

  return redirect("/notes");
}

export default function NewNote() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
          新建笔记
        </h1>

        <Form method="post" className="space-y-4">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              笔记内容
            </label>
            <textarea
              id="text"
              name="text"
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="在这里输入笔记内容..."
            />
            {actionData?.error && (
              <p className="mt-1 text-sm text-red-600">{actionData.error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            保存笔记
          </button>
        </Form>
      </div>
    </div>
  );
}
