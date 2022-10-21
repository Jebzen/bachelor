import React from "react"
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom"
import 'bootstrap';
//import paths from "../meta/paths.json";

const pathsJson = [
    {
        "path": "/",
        "title": "Home"
    },
    {
        "path": "/about",
        "title": "About"
    }
]

export function Header(){
    const [paths, setPaths] = useState([pathsJson])

    /*
    useEffect(()=>{
        fetch(`meta/paths.jon`,{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response)=>{
            console.log(response)
            return response.json()
        }).then(data=>{
            console.log(data)
        })
    },[])
    */

    return(
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse text-end" id="navbarNav">
                        <div className="navbar-nav">
                            {
                                pathsJson.map((path, i)=>{
                                    return <Link key={i} className="nav-link" to={path.path} >{path.title}</Link>
                                })
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}