

import React from 'react'
import SideBar from './SideBar'
const Layout = ({ children }) => {
    return (
        <div>
            <main>

                <main style={{ minHeight: "95vh", padding: "0px" }}>
                    <SideBar />
                    {children}
                </main>

            </main>
        </div>
    )
}

export default Layout
