import createLocalStore from "../../lib/LocalStore"
import { Theme } from "../../lib/ThemeUtils"

interface LocalStorageProps {
}


function createLocalStorage(_:LocalStorageProps) {
    const store = createLocalStore<{theme: Theme}>({storage: window.localStorage})

    return {
        setTheme: ({theme}:{theme: Theme}) => store.set("theme", theme),
        getTheme: () => store.get("theme")
    }
}

declare global {
    type LocalStorageHelper = ReturnType<typeof createLocalStorage>
}

export default createLocalStorage

