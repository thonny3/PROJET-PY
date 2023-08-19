import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SideBar from "./components/sideBar/SideBar";
import NavBar from "./components/navBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Profil from "./components/contenu/parametre/Profil";
import Connexion from "./components/contenu/parametre/Connexion";
function App() {
  return (
    <>
     <SideBar/>
      <NavBar/>
     
    </>
  );
}

export default App;
