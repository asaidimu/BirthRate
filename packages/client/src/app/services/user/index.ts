import { RequestHelper } from "../../lib/api";

export default function createUserService ({api}:{ api: RequestHelper}) {
    async function signIn(data: LoginCredentials): Promise<boolean> {
        return await api.post<boolean>("/user/authenticate", data)
    }

    async function signUp(data:UserData):Promise<boolean> {
        const response = await api.post<boolean>("/user/create", data)
        if(response){
            return signIn({ username: data.username, password: data.password})
        }
        return false
    }

    async function signOut(): Promise<boolean> {
        await api.get<boolean>("/user/signout")
        window.location.href = "/signin";
        return true
    }

    async function isAuthorized(props:{ role:UserRole}): Promise<boolean> {
        const user = await getUserInfo()
        return user !== null && user.role.localeCompare(props.role) === 0
    }

    async function hasSession(): Promise<boolean> {
        const user = await getUserInfo()
        return user !== null
    }

    async function getUserInfo():Promise<UserInfo | null> {
        const data = await api.get<{user: UserInfo}>("/user")
        if(data && data.user !== undefined) {
            return data.user
        }
        return null
    }

    return {
        getUserInfo,
        signIn,
        signUp,
        signOut,
        hasSession,
        isAuthorized,
    }
}

export type UserService = ReturnType<typeof createUserService>
