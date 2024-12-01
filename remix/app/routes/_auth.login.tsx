import { type ActionFunctionArgs, TypedResponse } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { getPb } from "~/utils/pb.server";
import { createSession } from "~/utils/session.server";

export async function action({ request }: ActionFunctionArgs): Promise<TypedResponse<any>> {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/notes";

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email and password are required" }), 
      { 
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const pb = await getPb();
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    return createSession(authData.token, redirectTo);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid email or password" }), 
      { 
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/notes";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>

        <Form method="post" className="mt-8 space-y-6">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                placeholder="Password"
              />
            </div>
          </div>

          {actionData?.error && (
            <div className="text-center text-red-600">{actionData.error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
