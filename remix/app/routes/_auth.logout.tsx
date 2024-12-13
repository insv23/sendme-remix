import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  TypedResponse,
} from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { requireAuth } from "~/utils/auth.server";
import { destroySession } from "~/utils/session.server";

type LoaderData = null;

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  await requireAuth(request);
  return new Response(JSON.stringify({}), {
    headers: { "Content-Type": "application/json" },
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const cookie = request.headers.get("Cookie");
  return destroySession(cookie);
};

export default function LogoutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-center text-2xl font-bold">
          你是否要注销该用户？
        </h2>
        <div className="flex gap-4">
          <Link
            to="/notes"
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            否，回到主页面
          </Link>
          <Form method="post">
            <button
              type="submit"
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              是，确认退出当前用户登录
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
