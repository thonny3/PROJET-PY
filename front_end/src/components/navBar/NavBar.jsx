import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Acceuil from '../sideBar/Acceuil'
import Article from '../sideBar/Article'
import BonEntree from '../sideBar/BonEntree'
import BonSortie from '../sideBar/BonSortie'
import { BiBell, BiSolidUserCircle } from 'react-icons/bi'
import Parametre from '../sideBar/Parametre'
import CreateCompte from '../contenu/parametre/CreateCompte'
import Profil from '../contenu/parametre/Profil'

export default function NavBar() {
  return (
    <>
    <div className="main">
      <nav class="navbar navbar-expand-sm shadow-sm p-3 mb-3 bg-body rounded ml-5 navBar" style={{height:"75px"}}>
        <div className="" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}} >
            <h3 className='' >GESTION DU  STOCK </h3>
            <div class="dropdown ">
            <BiSolidUserCircle className='dropdown-toggle icon'  data-bs-toggle="dropdown"/>
          <ul class="dropdown-menu" style={{marginLeft:"660px"}}>
            <li><a class="dropdown-item" href="#">Profil</a></li>
            <li><a class="dropdown-item" href="#">Créer un compte</a></li>
            <li><a class="dropdown-item" href="#">Deconnexion</a></li>
          </ul>
</div>
            
        </div>
      </nav>
      <div className="container" style={{paddingLeft:"35px"}}>
       <Routes>
        <Route path='/' element={<Acceuil/>}/>
        <Route path='/article' element={<Article/>}/>
        <Route path='/bonentree' element={<BonEntree/>}/>
        <Route path='/bonsortie' element={<BonSortie/>}/>
        <Route path='/créer/compte' element={<CreateCompte/>}></Route>
        <Route path='/profil' element={<Profil/>}/>
       </Routes>
      </div>
      </div>
    </>
  )
}
