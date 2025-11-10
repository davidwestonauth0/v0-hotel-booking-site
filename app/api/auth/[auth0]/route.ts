import { handleAuth, handleLogin } from "@auth0/nextjs-auth0"

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      screen_hint: (req) => {
        const url = new URL(req.url)
        return url.searchParams.get("screen_hint") || undefined
      },
      login_hint: (req) => {
        const url = new URL(req.url)
        return url.searchParams.get("login_hint") || undefined
      },
    },
  }),
})
