import { Link, useLoaderData } from "@remix-run/react";
import { AuthButton } from "./AuthButton";

type LoaderData = {
  isAuthenticated: boolean;
};

export function Navbar() {
  const { isAuthenticated } = useLoaderData<LoaderData>();

  return (
    <div className="bg-base-100">
      <div className="navbar max-w-screen-lg mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            SendMe
          </Link>
        </div>
        <div className="flex-none">
          <AuthButton isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
  );
}
