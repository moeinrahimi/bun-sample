import { t } from "elysia"


export const findById=t.Object({
  id: t.String(),
})
export const login=t.Object({
  email: t.String(),
  password: t.String(),
})