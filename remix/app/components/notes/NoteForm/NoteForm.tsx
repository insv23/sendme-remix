import { Form, useActionData } from "@remix-run/react";
import type { action } from "~/routes/notes.new";

export function NoteForm() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <Form method="post" className="space-y-4">
        <div>
          <textarea
            id="text"
            name="text"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
  );
}
