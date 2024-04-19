import { Login, User } from "@prisma/client";
import createUtilities, { LoginCredentials } from "./utils.js";

const controller = (system: System) => {
    const { logger, auth } = system;
    const utils = createUtilities(system);

    type CUS = Pick<Login, "username" | "password">;
    async function createUserSession({ username, password }: CUS) {
        const login: LoginCredentials | null = await logger.handleErrors(
            () => utils.findLoginCredentials({ username }),
            null
        );

        if (login === null) return null;

        const isValid = await auth.verifyPassword({
            password,
            hash: login.password,
        });

        if (isValid) {
            return await auth.generateAuthToken(login);
        }
    }

    type CR = Omit<User, "id"> & Pick<Login, "username" | "password">;
    async function createUser(
        data: CR & { groups: Array<number> }
    ): Promise<boolean> {
        const userLogin = await utils.createLogin({
            username: data.username,
            password: await auth.hashPassword({ password: data.password }),
            active: true,
            groups: data.groups,
        });

        const result = await utils.createUser(
            system.utils.exclude(Object.assign({ id: userLogin.id }, data), [
                "username",
                "password",
                "groups",
            ])
        );

        return result.id === userLogin.id;
    }
    async function createRegularUser(data: CR): Promise<boolean> {
        return createUser({ ...data, groups: [auth.groups.USERS] });
    }
    async function createRootUser(data: CR): Promise<boolean> {
        return createUser({ ...data, groups: [auth.groups.ROOT] });
    }

    async function deactivateRegularUser(data: Pick<Login, "id">) {
        return await utils.deactivateLogin(data);
    }

    async function getUserData(
        data: Pick<User, "id">
    ): Promise<User & Pick<Login, "username"> & { role: string }> {
        const user = await utils.findUser(data);
        const login = await utils.findLogin(data);
        let role = "user";
        if (login.groups[0] === auth.groups.ROOT) {
            role = "admin";
        }
        return Object.assign(user, { username: login.username, role });
    }
    async function updateUser({
        id,
        data,
    }: {
        id: User["id"];
        data: Partial<Omit<User, "id"> & Pick<Login, "password">>;
    }): Promise<boolean> {
        const details = system.utils.exclude(data, ["password"]);
        if (data.password) {
            const password = data.password;
            await utils.updateUserPassword({
                id,
                password: await auth.hashPassword({ password }),
            });
        }
        await utils.updateUserDetails(id, details);
        return true;
    }

    async function getAllUsers() {
        return await utils.findUsers();
    }

    const actions = {
        getAllUsers,
        createUserSession,
        createRootUser,
        createRegularUser,
        deactivateRegularUser,
        getUserData,
        updateUser,
    };
    return actions;
};

declare global {
    type UserController = ReturnType<typeof controller>;
}
export default controller;
