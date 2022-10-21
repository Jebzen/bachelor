import React from "react"
import { Link, Outlet } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"

export function Layout(){
    return(
        <>
            <Header/>
            <main className="main">
                <Outlet />
            </main>
            <Footer/>
        </>
    )
}