import { Link } from "@remix-run/react";
import { UserDropdownMenu } from "./UserDropdownMenu";

type AuthButtonProps = {
  isAuthenticated: boolean;
};

export function AuthButton({ isAuthenticated }: AuthButtonProps) {
  if (isAuthenticated) {
    return <UserDropdownMenu />;
  }

  return (
    <Link to="/login" className="btn btn-primary">
      登录
    </Link>
  );
}
