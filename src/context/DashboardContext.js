import React, {
    createContext,
    useContext,
} from 'react'

import { LinksProvider, ProjectsProvider } from '../context'

const DashboardContext = createContext()

export function useDashboard() {
    return useContext(DashboardContext)
}

export default function DashboardProvider({ children }) {

    return (
        <DashboardContext.Provider value={null}>
            <ProjectsProvider>
                <LinksProvider>
                    {children}
                </LinksProvider>
            </ProjectsProvider>
        </DashboardContext.Provider >
    )
}

