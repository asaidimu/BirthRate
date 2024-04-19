function UserPresenter(route: Route<UserController>) {
    const { router, status, logger, validate, auth, allow, controller } = route;

    router.post("/authenticate", validate, async (req, res) => {
        const token = await controller.createUserSession(req.body);
        if (!token) {
            return res
                .status(status.code.UNAUTHORIZED)
                .json({ message: status.reason.UNAUTHORIZED });
        }

        res.status(status.code.OK).cookie("auth_token", token, {
            httpOnly: true,
        });
        return res.send()
    });

    router.get("/signout", async (_, res) => {
        res.clearCookie("auth_token")
        return res.sendStatus(status.code.OK)
    })

    router.get("/session", async (req, res) => {
        if (!(req as any).login) {
            return res
                .status(status.code.UNAUTHORIZED)
                .json({ message: status.reason.UNAUTHORIZED });
        }
        return res.sendStatus(status.code.OK)
    })

    router.post("/create", validate, async (req, res) => {
        const user = await controller.createRegularUser(req.body);
        if (!user) {
            return res
                .status(status.code.BAD_REQUEST)
                .json({ message: status.reason.BAD_REQUEST });
        }

        return res.sendStatus(status.code.CREATED);
    });

    router.put("/deactivate", validate, allow({ groups: auth.groups.ROOT }),
        async (req, res) => {
            const success = await controller.deactivateRegularUser(req.body);
            if (!success) {
                return res
                    .status(status.code.INTERNAL_SERVER_ERROR)
                    .json({ message: status.reason.INTERNAL_SERVER_ERROR });
            }

            return res.sendStatus(status.code.OK);
        }
    );

    router.get("/all", allow({ groups: auth.groups.ROOT }), async (_, res) => {
        const users = await controller.getAllUsers();
        if (!users) {
            return res
                .status(status.code.INTERNAL_SERVER_ERROR)
                .json({ message: status.reason.INTERNAL_SERVER_ERROR });
        }

        return res.status(status.code.OK).json({ users });
    });

    router.get(
        "/:uid",
        allow({ groups: auth.groups.ROOT }),
        async (req, res) => {
            const user = await controller.getUserData({ id: Number(req.params!.uid!) });
            if (!user) {
                return res
                    .status(status.code.INTERNAL_SERVER_ERROR)
                    .json({ message: status.reason.INTERNAL_SERVER_ERROR });
            }

            return res.status(status.code.OK).json({ user });
        }
    );

    router.get("/", allow({ groups: auth.groups.USERS }), async (req, res) => {
        const login: AuthTokenPayload = (req as ClientRequest).login!;
        logger.debug({ login })
        const user = await controller.getUserData({ id: login.id });
        if (!user) {
            return res
                .status(status.code.INTERNAL_SERVER_ERROR)
                .json({ message: status.reason.INTERNAL_SERVER_ERROR });
        }

        return res.status(status.code.OK).json({ user });
    });

    router.put("/", validate, allow({ groups: auth.groups.USERS }),
        async (req, res) => {
            const login: AuthTokenPayload = (req as ClientRequest).login!;
            const success = await controller.updateUser({
                id: login.id,
                data: req.body,
            });
            if (!success) {
                return res
                    .status(status.code.INTERNAL_SERVER_ERROR)
                    .json({ message: status.reason.INTERNAL_SERVER_ERROR });
            }
            return res.sendStatus(status.code.OK);
        }
    );
}

export default UserPresenter;
