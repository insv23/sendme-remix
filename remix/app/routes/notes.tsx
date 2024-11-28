import { Outlet } from "@remix-run/react";

export default function NotesLayout() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <Outlet />
      </div>
    </div>
  );
}
