import { redirect } from "@remix-run/node";
import { getSession, destroySession } from "./session.server";
import { getPb } from "./pb.server";

interface AuthResult {
  isAuthenticated: boolean;
  pb?: ReturnType<typeof getPb> extends Promise<infer T> ? T : never;
  session?: Awaited<ReturnType<typeof getSession>>;
  error?: string;
}

async function getSessionAndToken(request: Request) {
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  return { session, token };
}

// 验证 PocketBase 认证状态
async function validatePbAuth(cookie: string) {
  const pb = await getPb();
  if (!pb.authStore.isValid) {
    await destroySession(cookie);
    return { isValid: false, error: "登录已过期" };
  }
  return { isValid: true, pb };
}

// 用于检查用户是否已登录 (不会重定向)
export async function checkAuth(request: Request): Promise<AuthResult> {
  const { session, token } = await getSessionAndToken(request);

  if (!token) {
    return {
      isAuthenticated: false,
      error: "未登录",
    };
  }

  try {
    const { isValid, pb, error } = await validatePbAuth(
      request.headers.get("Cookie")!
    );
    if (!isValid) {
      return {
        isAuthenticated: false,
        error,
      };
    }

    return {
      isAuthenticated: true,
      pb,
      session,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      error: "数据库暂时无法访问，请稍后再试",
    };
  }
}

// 用于需要强制认证的路由 (未登录或登录已过期会被重定向到登录页)
export async function requireAuth(request: Request) {
  const auth = await checkAuth(request);

  if (!auth.isAuthenticated) {
    if (auth.error === "未登录" || auth.error === "登录已过期") {
      throw redirect("/login");
    }

    throw new Response(JSON.stringify({ message: auth.error }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  return auth;
}
