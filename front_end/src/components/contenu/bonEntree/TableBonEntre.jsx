import React, { useEffect, useState } from "react";
import { BiPencil,BiTrashAlt,BiPlus} from "react-icons/bi";
import axios from 'axios'
import ModalAjout from "./ModalAjout";
import ModalModifier from "./ModalModifier";
import { Button, Modal } from 'react-bootstrap';

import ModalSupprimer from "./ModalSupprimer";
import {toast,ToastContainer} from 'react-toastify'
export default function TableBonEntre() {
    const[BonEntree, setBonEntree] = useState([]) 
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete,setshowModalDelete] =useState(false)
    const[numArticle,setNumArticle] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const[Article,setArticle] = useState([])
    const itemsPerPage= 5
    const  test = {
        numProduit:"",
        numBonEntree:"",
        qteEntree:"",
        dateEntree:""
    }
    const[donne,setDonne] = useState(test)

    const handleCloseModal = () => {
        setShowModal(false);
      };
    
      const handleShowModal = () => {
        setShowModal(true);
      };
      const handleShowModalEdit = (id) => {
        setShowModalEdit(true);
        axios.get(`http://127.0.0.1:5000/api/bondeEntree/${id}`)
        .then(res=>{
          const data= res.data[0]
          donne.numBonEntree = data.numBonEntree
          donne.numProduit = data.numProduit
          donne.qteEntree =data.qteEntree
          fetchBonEntree()
      })
      .catch(error=>console.log(error))
      };
      const fetchData = ()=>{
        axios.get("http://127.0.0.1:5000/api/produit")
        .then(res=>{
            setArticle(res.data)
            console.log(res.data);
            
        })
        .catch(error=>console.log(error))
    }
    
    const fetchBonEntree = ()=>{
        axios.get("http://127.0.0.1:5000/api/bondeEntree")
        .then(res=>{
            setBonEntree(res.data)
            console.log(res.data);
        })
        .catch(error=>console.log(error))
    }
    const createBonEntree = (data)=>{
        axios.post("http://127.0.0.1:5000/api/bondeEntree",data)
        .then(res=>{
            handleCloseModal();
            fetchBonEntree()
            console.log(res.data);
            toast.success("sucesss  ",{theme:'colored',autoClose:1000})
        })
        .catch(error=>console.log(error))
    }

    
      // Calcule le nombre total de pages
  const totalPages = Math.ceil(BonEntree.length / itemsPerPage);
    // Récupère les données à afficher sur la page courante
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = BonEntree.slice(indexOfFirstItem, indexOfLastItem);
     // Change de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const modifierBonEntree = ()=>{
    axios.put(`http://127.0.0.1:5000/api/bondeEntree/${donne.numBonEntree}`,donne)
    .then(res=>{
        fetchBonEntree()
        setShowModalEdit(false)
      console.log(res.data);
      toast.success("success ",{theme:'colored',autoClose:1000})
  })
  .catch(error=>console.log(error))
  
  }
  const handleShowModalDelete = (id)=>{
    setshowModalDelete(true)
    setNumArticle(id)
  }
  const deleteBonArticle = (id)=>{
    axios.delete(`http://127.0.0.1:5000/api/bondeEntree/${id}`)
    .then(res=>{
        fetchBonEntree()
        setshowModalDelete(false)
        toast.success("success ",{theme:'colored',autoClose:1000})
  })
  .catch(error=>console.log(error))
  }
    useEffect(()=>{
        fetchBonEntree()
        fetchData()
    },[])
  return (

    <>
    {/* MODAL AJOUT  */}
    <ToastContainer/>
    <ModalAjout showModal ={showModal} handleCloseModal={handleCloseModal} createBonEntree={createBonEntree}/>
    <ModalSupprimer showModalDelete={showModalDelete} numArticle={numArticle} deleteBonArticle={deleteBonArticle}/>
    <Modal show={showModalEdit} centered >
        <Modal.Header closeButton>
          <Modal.Title>AJOUT BON ENTRE ARTICLE </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Modal content goes here */}
          <form>
            <div className="form-group">
              <label htmlFor="" style={{ fontWeight: "bold" }} className="mb-2">
                Numéro du Bon entrée
              </label>
              <input
                type="text"
                style={{ width: "100%" }}
                disabled
                placeholder="Veuillez saisir numéro "
                value={donne.numBonEntree}
                onChange={(e)=>setDonne({...donne,numBonEntree:e.target.value})}
                
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="" style={{ fontWeight: "bold" }} className="mb-2">
                Article
              </label>
              <select name="" id="" className="form-control"   onChange={(e)=>setDonne({...donne,numProduit:e.target.value})}>
                <option >{donne.numProduit} </option>
                {
                    Article.map((item,index)=>(
                        <option value={item.numProduit} key={index}>{item.design}</option>
                    ))
                }
              </select>
              
            </div>
            <div className="form-group mt-2">
              <label htmlFor="" style={{ fontWeight: "bold" }} className="mb-2">
                Quantité de l'article
                
              </label>
              <input
                type="number"
                style={{ width: "100%" }}
                placeholder="Veuillez saisir prix "
                value={donne.qteEntree}
                onChange={(e)=>setDonne({...donne,qteEntree:e.target.value})}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="" style={{ fontWeight: "bold" }} className="mb-2">
                Date d'entrée
              </label>
              <input
                type="date"
                style={{ width: "100%" }}
                placeholder="Veuillez saisir prix "
                
                onChange={(e)=>setDonne({...donne,dateEntree:e.target.value})}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modifierBonEntree}>
            Modifier
          </Button>
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
      <div className="contenu_article">
        <div className="article_table shadow-sm p-3 mb-5 bg-body rounded ">
          <div
            className="recherche"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button className="ajout"onClick={handleShowModal} >
              <BiPlus />
            </button>

            <input type="text" placeholder="recherche..." />
          </div>
          <table className="table mt-3 table-borderless">
            <thead>
              <th>Numéro</th>
              <th>numéro d'article</th>
              <th>Quantité entre </th>
              <th>Date d'entre</th>
              <th>Action</th>
            </thead>
            <tbody>
                {
                    currentItems.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.numBonEntree}</td>
                            <td>{item.numProduit }</td>
                            <td>{item.qteEntree }</td>
                            <td>{item.dateEntree }</td>
                            <button className="btn text-success" onClick={()=>handleShowModalEdit(item.numBonEntree)}><BiPencil/></button>
                            <button className="btn text-danger" onClick={()=>handleShowModalDelete(item.numBonEntree)}><BiTrashAlt/></button>
                        </tr>
                    ))
                }
            </tbody>
          </table>
           {/* Créez la pagination avec les boutons "Précédent" et "Suivant" */}
    <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Précédent
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Suivant
            </button>
          </li>
        </ul>
      </nav>
        </div>
      </div>
    </>
  );
}
