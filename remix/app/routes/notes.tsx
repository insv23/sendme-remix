import { LoaderFunctionArgs, redirect, TypedResponse } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { requireAuth } from "~/utils/auth.server";

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<any>> {
  await requireAuth(request);
  return new Response(JSON.stringify({}), {
    headers: { "Content-Type": "application/json" },
  });
}

export default function NotesLayout() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <Outlet />
      </div>
    </div>
  );
}
