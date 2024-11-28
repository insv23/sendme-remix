import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Note, NotesResponse } from "~/types/note";
import { getPb } from "~/utils/pb";

export async function loader() {
  const pb = await getPb();
  const notes = await pb.collection("notes").getFullList<Note>();
  return json({ notes });
}

export default function Index() {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        {/* 页面标题 */}
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
          我的笔记
        </h1>

        {/* 笔记列表 */}
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              {/* 笔记头部信息 */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    {note.user[0].replace("user_", "")[0].toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {note.user[0].replace("user_", "")}
                  </span>
                </div>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(note.created).toLocaleString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              {/* 笔记内容 */}
              <div className="prose prose-gray dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300">{note.text}</p>
              </div>

              {/* 附件列表 */}
              {note.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    附件 ({note.files.length})
                  </div>
                  <div className="space-y-2">
                    {note.files.map((file) => (
                      <div
                        key={file}
                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800/50"
                      >
                        <div className="flex items-center gap-2">
                          {/* 文件图标 */}
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          
                          {/* 文件名 */}
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {decodeURIComponent(file.split('/').pop() || '')}
                          </span>
                        </div>

                        {/* 下载按钮 */}
                        <a
                          href={`/api/files/${note.collectionId}/${note.id}/${file}`}
                          download
                          className="flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          下载
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 笔记数量统计 */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          共 {notes.length} 条笔记
        </div>
      </div>
    </div>
  );
}
