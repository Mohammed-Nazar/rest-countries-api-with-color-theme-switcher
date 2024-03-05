"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { createContext, useContext, useEffect, useState } from "react"
import { MyContext } from "../context/appContext"



 const NavBar = () => {
 const [darkTheme, setDarkTheme] = useState(true);
 let theme = darkTheme? "bg-[#2b3945] text-white" : "bg-white";


 function changeTheme() {
  setDarkTheme((prev)=> !prev)
 }
  return (
    <div 
    className={`flex p-6 justify-between items-center shadow-xl ${theme}`}>
        <h1 className="font-bold lg:text-xl">Where in the world?</h1>
        <div onClick={changeTheme} className="flex text-[14px] lg:text-xl text-center">
        <button >
        <FontAwesomeIcon className="w-2 mx-2" icon={darkTheme? faSun : faMoon}/>
        </button>
        <h6>
       {darkTheme? "Light" : "Dark"}
        </h6>
        </div>
    </div>
  )
}

export default NavBar;