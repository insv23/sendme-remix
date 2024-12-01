import { LoaderFunctionArgs, redirect, TypedResponse } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getSession, destroySession } from "~/utils/session.server";
import { getPb } from "~/utils/pb.server";

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<any>> {
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");

  if (!token) {
    return redirect("/login");
  }

  try {
    const pb = await getPb();
    if (!pb.authStore.isValid) {
      return destroySession(cookie);
    }

    // 使用 json() 返回空对象，而不是隐式返回 undefined，这样可以避免潜在的运行时错误
    return new Response(JSON.stringify({}), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "数据库暂时无法访问，请稍后再试" }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export default function NotesLayout() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <Outlet />
      </div>
    </div>
  );
}
