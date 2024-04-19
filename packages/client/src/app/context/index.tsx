import { createContext, useContext } from 'solid-js'

const ApplicationContext = createContext<ApplicationContext>()

export function useApplicationContext(): ApplicationContext {
    return useContext(ApplicationContext) as any
}

type ApplicationContextProviderProps = {
    context: ApplicationContext,
    children: any
}

export function ApplicationContextProvider(
    props: ApplicationContextProviderProps
) {
    return (
        <ApplicationContext.Provider value={props.context}>
            {props.children}
        </ApplicationContext.Provider>
    )
}
