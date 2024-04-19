import createLocalStore from "../../lib/LocalStore"

interface SessionStorageProps {
}

function createSessionStorage(_:SessionStorageProps) {
    const store = createLocalStore<{auth:string | null}>({storage: window.sessionStorage})

    function initializeStorage() {
        // store.set("auth", null)
    }

    initializeStorage()

    return {
        setAuthToken: ({token}:{token:string|null}) => {
            store.set("auth", token)
        },
        getAuthToken: () => {
            return store.get("auth")
        }
    }
}

declare global {
    type SessionStorageHelper = ReturnType<typeof createSessionStorage>
}



export default createSessionStorage

