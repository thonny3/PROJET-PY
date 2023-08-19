import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BiPencil,BiTrashAlt,BiPlus} from "react-icons/bi";
import ModalAjout from './ModalAjout';
import {toast,ToastContainer} from 'react-toastify'
export default function TableBonSortie() {
    const[bonSortie,setbonSortie]=useState([])
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
      };
    
      const handleShowModal = () => {
        setShowModal(true);
      };{}
      const createBonSortie = (data)=>{
        axios.post("http://127.0.0.1:5000/api/bondeSortie",data)
        .then(res=>{
            handleCloseModal();
            fetchBonSortie()
            console.log(res.data);
        })
        .catch(error=>console.log(error))
      }

      const deleteBonArticle = (id)=>{
        axios.delete(`http://127.0.0.1:5000/api/bondeSortie/${id}`)
        .then(res=>{
          fetchBonSortie()
            toast.success("success ",{theme:'colored',autoClose:1000})
      })
      .catch(error=>console.log(error))
      }

    const fetchBonSortie = ()=>{
        axios.get("http://127.0.0.1:5000/api/bondeSortie")
        .then(res=>{
            setbonSortie(res.data)
            console.log(res.data);
        })
        .catch(error=>console.log(error))
    }
    useEffect(()=>(
        fetchBonSortie()
    ),[])
  return (
        <>
        <ToastContainer/>
    {/* MODAL  AJOUT ARTICLE SORTIE  */}
    <ModalAjout showModal={showModal}  createBonSortie={createBonSortie}/>
      <div className="contenu_article">
        <div className="article_table shadow-sm p-3 mb-5 bg-body rounded ">
          <div
            className="recherche"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button className="ajout" onClick={handleShowModal} handleCloseModal={handleCloseModal}>
              <BiPlus />
            </button>

            <input type="text" placeholder="recherche..." />
          </div>
          <table className="table mt-3 table-borderless">
            <thead>
              <th>Numéro</th>
              <th>numéro d'article</th>
              <th>Quantité Sortie </th>
              <th>Date de sortie </th>
              <th>Action</th>
            </thead>
            <tbody>
                {
                    bonSortie.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.numBonSortie}</td>
                            <td>{item.numProduit }</td>
                            <td>{item.qteSortie }</td>
                            <td>{item.dateSortie }</td>
                            <button className="btn text-success" ><BiPencil/></button>
                            <button className="btn text-danger" onClick={()=>deleteBonArticle(item.numBonSortie)}><BiTrashAlt/></button>
                        </tr>
                    ))
                }
            </tbody>
          </table>
    
        </div>
      </div>
        </>
  )
}
