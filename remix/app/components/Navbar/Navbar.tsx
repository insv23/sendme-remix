import { Link } from "@remix-run/react";

export function Navbar() {
  return (
    <div className="bg-base-100">
      <div className="navbar max-w-screen-lg mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            SendMe
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
