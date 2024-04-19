function presenter(route: Route<OrdersController>) {
    const { router, status, validate, auth, allow, controller, response } =
        route;

    // TODO: Refactor into cart
    router.post("/", validate, allow({ groups: auth.groups.USERS }), async (req, res) => {
            const login: AuthTokenPayload = (req as ClientRequest).login!;
            const success = await controller.placeOrder(Object.assign(req.body, { id: login.id}));
            if (!success) {
                return response.serverError(res);
            }
            return res.sendStatus(status.code.CREATED);
        }
    );

    router.get("/all", allow({ groups: auth.groups.USERS }), async (_, res) => {
        const orders = await controller.getAllOrders();
        if (!orders) {
            return response.serverError(res);
        }

        return res.status(status.code.OK).json({ orders });
    });

    router.get("/complete", allow({ groups: auth.groups.USERS }), async (_, res) => {
        const orders = await controller.getCompleteOrders();
        if (!orders) {
            return response.serverError(res);
        }

        return res.status(status.code.OK).json({ orders });
    });

    router.get("/cancelled", allow({ groups: auth.groups.USERS }), async (_, res) => {
        const orders = await controller.getCancelledOrders();
        if (!orders) {
            return response.serverError(res);
        }

        return res.status(status.code.OK).json({ orders });
    });

    router.get("/pending", allow({ groups: auth.groups.USERS }), async (_, res) => {
        const orders = await controller.getPendingOrders();
        if (!orders) {
            return response.serverError(res);
        }

        return res.status(status.code.OK).json({ orders });
    });

    router.put("/", validate, allow({ groups: auth.groups.ROOT }),
        async (req, res) => {
            const success = await controller.updateOrder(req.body);
            if (!success) {
                return response.serverError(res);
            }
            return res.sendStatus(status.code.OK);
        }
    );

    router.get("/volume/daily", validate, allow({ groups: auth.groups.ROOT}), async (_, res) => {
        const data = await controller.getDailyVolume()
        if( ! data) {
            return response.serverError(res)
        }

        return res.status(status.code.OK).json({ data })
    })
}

export default presenter;
