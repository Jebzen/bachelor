import React from "react"
import { Link, Outlet } from "react-router-dom"

export function Layout(){
    return(
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse">
                            <div className="navbar-nav">
                                <Link className="nav-link" to="/">Home</Link>
                                <Link className="nav-link" to="/about">About</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="container">
                <Outlet />
            </main>
            <footer>

            </footer>
        </>
    )
}