import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaBeer} from 'react-icons/fa'
import { BiCart, BiCategory, BiChip,BiCog,BiHome } from "react-icons/bi";

export default function SideBar() {
  return (
    <>
      <div className="sidenav shadow-sm p-3 mb-5 bg-body rounded">
        <img src={logo} alt="" style={{ height: "45px" }} />
        <hr />
        <nav>
          <a>
            <Link to="/"><BiHome />  <span className="ml-3">Acceuil</span></Link>
          </a>
          <a>
            <Link to="/article"> <BiCart/> Article</Link>
          </a>
          <a>
            <Link to="/bonentree"> <BiCategory/> Entre Article</Link>
          </a>
          <a>
            <Link to="/bonsortie"><BiChip/> Sortie Article</Link>
          </a>
          <a>
            <Link to="/parametre" data-bs-toggle="collapse" data-bs-target="#demo"><BiCog/> Parametre</Link>
          </a>
          <div id="demo" class="collapse">
          <a>
            <Link to="/profil"><BiChip/>Profil</Link>
          </a>
          <a >
            <Link to="/créer/compte" ><BiCog/> Créer compte </Link>
          </a>
          <a>
            <Link to="/parametre"><BiCog/>Deconnexion</Link>
          </a>
         </div>
        </nav>
      </div>
    </>
  );
}
