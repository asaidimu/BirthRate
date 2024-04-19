import { Login, LoginGroup, User } from "@prisma/client";

export type LoginCredentials = Pick<Login, "id" | "password" | "groups">;

export default ({ db, utils }: System) => {
    const createLoginGroup = async (
        data: LoginGroup
    ): Promise<{ id: number }> => {
        const { id } = await db.loginGroup.create({
            data,
        });
        return { id };
    };

    const createLogin = async (
        data: Omit<Login, "id" | "createdOn">
    ): Promise<{ id: number }> => {
        const { id } = await db.login.create({
            data,
        });

        return { id };
    };

    const createUser = async (data: User): Promise<{ id: number }> => {
        const { id } = await db.user.create({
            data
        })

        await db.cart.create({
            data: {
                id,
                items: []
            }
        })

        return { id }
    }

    const updateLogin = async ({
        id,
        data,
    }: Pick<Login, "id"> & {
        data: Partial<Omit<Login, "id" | "createdOn" | "active">>;
    }): Promise<boolean> => {
        await db.login.update({
            where: { id },
            data,
        });
        return true;
    };

    const findLoginCredentials = async (
        where: Pick<Login, "username">
    ): Promise<LoginCredentials> => {
        const login = await db.login.findUnique({
            where,
        });

        if (login === null || login === undefined) {
            throw new Error(`Login not found: ${JSON.stringify(where)}`);
        }

        return utils.pick(login, ["id", "groups", "password"]);
    };

    const findLogin = async (
        where: Partial<Omit<Login, "groups" | "createdOn" | "password">>
    ): Promise<Omit<Login, "password">> => {
        const login = await db.login.findUnique({
            where,
        });

        if (!login) {
            throw new Error(`Login not found: ${JSON.stringify(where)}`);
        }

        return utils.exclude(login as Login, ["password"]);
    };

    const findUser = async (where: Pick<User, "id">): Promise<User> => {
        const user = await db.user.findUnique({ where })
        if (!user) {
            throw new Error(`Login not found: ${JSON.stringify(where)}`);
        }
        return user
    }

    const activateLogin = async (where: Pick<Login, "id">): Promise<boolean> => {
        await db.login.update({
            where,
            data: {
                active: true,
            },
        });

        return true;
    };

    const deactivateLogin = async (
        where: Pick<Login, "id">
    ): Promise<boolean> => {
        await db.login.update({
            where,
            data: {
                active: false,
            },
        });

        return true;
    };

    const updateUserDetails = async (id: User["id"], data: Partial<Omit<User, "id">>): Promise<boolean> => {
        await db.user.update({
            where: { id },
            data
        })
        return true
    }

    const updateUserPassword = async ({ id, password }: Pick<Login, "id" | "password">) => {
        await db.login.update({
            where: { id },
            data: {
                password
            }
        })
        return true

    }

    const findUsers = async (): Promise<Array<User>> => {
        const results = await db.user.findMany()
        return results
    }

    return {
        findUsers,
        updateUserDetails,
        updateUserPassword,
        createLoginGroup,
        createLogin,
        activateLogin,
        deactivateLogin,
        findLogin,
        findUser,
        findLoginCredentials,
        updateLogin,
        createUser
    };
};
