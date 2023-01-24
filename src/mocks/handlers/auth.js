import { existingUser, userJwt } from "@mocks/data/user.mock";
import { rest } from "msw";

const BASE_URL = `${process.env.REACT_APP_BASE_ENDPOINT}/api/v1/auth`

export const signupMock = rest.post(`${BASE_URL}/register`, (req, res, ctx) => {
    const result = { message: "You logged in successfully", user: existingUser, token: userJwt }
    return res(ctx.json(result))
})

export const authHandlers = [
    signupMock
]