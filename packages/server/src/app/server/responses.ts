import { Response } from "express"

function createServerResponses (status:Route<any>["status"]) {
    return {
        unauthorized: (res: Response) => {
            res.status(status.code.UNAUTHORIZED)
            .json({ reason: status.reason.UNAUTHORIZED });
        },
        badRequest: (res: Response) => {
            res.status(status.code.BAD_REQUEST)
            .json({ reason: status.reason.BAD_REQUEST });
        },
        serverError: (res: Response) => {
            res.status(status.code.INTERNAL_SERVER_ERROR)
            .json({ reason: status.reason.INTERNAL_SERVER_ERROR });
        },
    }
}

declare global {
    type ServerResponse = ReturnType<typeof createServerResponses>
}

export default createServerResponses
