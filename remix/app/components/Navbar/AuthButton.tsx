import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { UserDropdownMenu } from "./UserDropdownMenu";

type AuthButtonProps = {
  isAuthenticated: boolean;
};

export function AuthButton({ isAuthenticated }: AuthButtonProps) {
  if (isAuthenticated) {
    return <UserDropdownMenu />;
  }

  return (
    <Link to="/login">
      <Button variant="outline">登录</Button>
    </Link>
  );
}
