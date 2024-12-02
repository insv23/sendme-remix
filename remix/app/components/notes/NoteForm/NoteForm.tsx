import { Form, useActionData, useNavigation } from "@remix-run/react";
import type { action } from "~/routes/notes.new";

export function NoteForm() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  
  // 判断是否正在提交
  const isSubmitting = navigation.state === "submitting";
  
  // 使用时间戳作为 key，在提交成功后强制重新渲染表单
  const formKey = navigation.state === "idle" && !actionData?.error 
    ? Date.now() 
    : "form";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <Form 
        key={formKey}
        method="post" 
        className="space-y-4"
      >
        <div>
          <textarea
            id="text"
            name="text"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="在这里输入笔记内容..."
            disabled={isSubmitting}
          />
          {actionData?.error && (
            <p className="mt-1 text-sm text-red-600">{actionData.error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? "保存中..." : "保存"}
        </button>
      </Form>
    </div>
  );
}
