import { mockMenuItemData } from "./models.js";

export default async function seeder({ db, auth, scope }: System) {
    const users:UserController = await scope.resolve("UserController")
    await db.loginGroup.upsert({
        where: { name: "root" },
        update: {},
        create: {
            name: "root",
        },
    });

    await db.loginGroup.upsert({
        where: { name: "user" },
        update: {},
        create: {
            name: "user",
        },
    });

    await users.createRootUser({
        username: "admin",
        password: "user1234",
        fullName: "System Administrator",
        email: "admin@system.com"
    })

    await users.createRegularUser({
        username: "john",
        password: "user1234",
        fullName: "John Doe",
        email: "johndoe@system.com"
    })

    await users.createRegularUser({
        username: "jane",
        password: "user1234",
        fullName: "Jane Doe",
        email: "janedoe@system.com"
    })

    const items = Array.from(Array(5)).map((_) => mockMenuItemData());

    // create items
    await db.item.createMany({
        data: items,
    });

    const controller: OrdersController = scope.resolve("OrderController");

    const all = await Promise.all(
        Array.from(Array(24)).map((_) => (
            controller.placeOrder({
                id: 2,
                items: Array.from(Array(10)).map((_) => ({
                    id: 1,
                    quantity: 10,
                })),
            })
        ))
    );
}
