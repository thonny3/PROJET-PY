import React from "react";
import "../../article/article.css";
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BiPencil,BiTrashAlt,BiPlus} from "react-icons/bi";
import { Button, Modal } from 'react-bootstrap';
import {toast,ToastContainer} from 'react-toastify'
// import Form from "../contenu/article/Form";
// import Table from "../contenu/article/Table";
export default function Article() {
    const[product,setProduct] = useState([])
    const donne = {
        numProduit:"",
        design:"",
        prix:0
    }
    const[data,setData] = useState(donne)

    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit,setModalEdit]  =useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [id,setId]= useState("")
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleShowModal = () => {
      setShowModal(true);
    };
    const handleCloseModalDelete = () => {
      setShowModalDelete(false);
    };

  
    const handleShowModalDelete = (id) => {
      setShowModalDelete(true);
      setId(id)
    };
  
    const deleteProduct = ()=>{
      axios.delete(`http://127.0.0.1:5000/api/produit/${id}`)
      .then(res=>{
        fetchProduct()
        toast.success("Article a été",{theme:'colored',autoClose:1000})
        handleCloseModalDelete()
        console.log(res.data);
    })
    .catch(error=>console.log(error))
    }
    const handleCloseModalEdit = () => {
      setModalEdit(false);
    };
    const handleShowModalEdit = (id) => {
      setModalEdit(true);
      axios.get(`http://127.0.0.1:5000/api/produit/${id}`)
      .then(res=>{
        const donne = res.data[0]
        data.numProduit = donne.numProduit
        data.design = donne.design
        data.prix = donne.prix
        fetchProduct()
    })
    .catch(error=>console.log(error))      
    };
    
    const ModfierArticle = (numProduit)=>{
      axios.put(`http://127.0.0.1:5000/api/produit/${numProduit}`,data)
      .then(res=>{
        fetchProduct()
        toast.success("Article a été",{theme:'colored',autoClose:1000})
        handleCloseModalEdit()
        console.log(res.data);
    })
    .catch(error=>console.log(error))
    }

    const fetchProduct = ()=>{
        axios.get("http://127.0.0.1:5000/api/produit")
            .then(res=>{
                setProduct(res.data)
                console.log(res.data);
            })
            .catch(error=>console.log(error))
    }

    useEffect(()=>{
        fetchProduct()
    },[])
    const submitData = ()=>{
        axios.post("http://127.0.0.1:5000/api/produit",data)
            .then(res=>{
                setData(donne)
                console.log(res.data);
                fetchProduct()
                handleCloseModal()
                toast.success("Article a été",{theme:'colored',autoClose:10000})
            })
            .catch(error=>console.log(error))
    }

    const itemsPerPage = 5;
    // Filtrer les données en fonction de la valeur de recherche
   const filteredData = product.filter((item) =>
   item.design.toLowerCase().includes(searchTerm.toLowerCase())
 );
      // Calcule le nombre total de pages
  const totalPages = Math.ceil(product.length / itemsPerPage);
   const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
    {/* MODAL AJOUT  ARTICLE  */}

    <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title  style={{margin:"auto"}}>Ajouter un Article </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Modal content goes here */}
          <form>
            <div className="form-group">
              <label htmlFor="" style={{ fontWeight: "bold" }} className="mb-2">
                Numéro de l'article
              </label>
              <input
                type="text"
                style={{ width: "100%" }}
                placeholder="Veuillez saisir numéro "
                onChange={(e)=>setData({...data,numProduit:e.target.value})}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="" style={{ fontWeight: "bold" }} className="mb-2">
                Nom de l'article
              </label>
              <input
                type="text"
                style={{ width: "100%" }}
                placeholder="Veuillez saisir l'article"
                onChange={(e)=>setData({...data,design:e.target.value})}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="" style={{ fontWeight: "bold" }} className="mb-2">
                Prix de l'article
              </label>
              <input
                type="number"
                style={{ width: "100%" }}
                placeholder="Veuillez saisir prix "
                onChange={(e)=>setData({...data,prix:e.target.value})}
              />
            </div>
         
          </form>
        </Modal.Body>
        <Modal.Footer style={{display:"flex"}}>
        <Button type="button" onClick={submitData}>Valider</Button>
    
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
  
    {/* MODAL DELETE ARTCILE  */}
    <Modal show={showModalDelete} onHide={handleCloseModalDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Vous vous voulez supprimé </Modal.Title>
        </Modal.Header>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalDelete}>
            NON
          </Button>
          <button className="btn btn-danger" onClick={deleteProduct}> OUI</button>
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
    {/* MODAL UPDATE ARTICLE  */}
    <Modal show={showModalEdit} onHide={handleCloseModalEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title  style={{margin:"auto"}}>Modifier un Article </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Modal content goes here */}
          <form>
            <div className="form-group">
              <label htmlFor="" style={{ fontWeight: "bold" }} className="mb-2">
                Numéro de l'article
              </label>
              <input
                type="text"
                style={{ width: "100%" }}
                placeholder="Veuillez saisir numéro "
                value={data.numProduit}
                onChange={(e)=>setData({...data,numProduit:e.target.value})}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="" style={{ fontWeight: "bold" }} className="mb-2">
                Nom de l'article
              </label>
              <input
                type="text"
                style={{ width: "100%" }}
                value={data.design}
                placeholder="Veuillez saisir l'article"
                onChange={(e)=>setData({...data,design:e.target.value})}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="" style={{ fontWeight: "bold" }} className="mb-2">
                Prix de l'article
              </label>
              <input
                type="number"
                style={{ width: "100%" }}
                value={data.prix}
                placeholder="Veuillez saisir prix "
                onChange={(e)=>setData({...data,prix:e.target.value})}
              />
            </div>
         
          </form>
        </Modal.Body>
        <Modal.Footer style={{display:"flex"}}>
        <Button type="button" onClick={()=>ModfierArticle(data.numProduit)}>Modifier</Button>
    
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
      {/* CONTENU  ARTICLE  */}
      <div className="alert text-center shadow p-3 mb-2  rounded"  style={{
        backgroundColor:"deepskyblue",
        color:"#fff"
      }}>
        <h5>GERER L'ARTICLE</h5>
      </div>
      <div className="contenu_article">
        <div className="article_table shadow-sm p-3 mb-5 bg-body rounded ">
          <div className="recherche" style={{
            display:"flex",
            justifyContent:"space-between"
          }}>
            <button className="ajout" onClick={handleShowModal}><BiPlus/></button>
            <ToastContainer></ToastContainer>
          <input type="text" placeholder="recherche..." value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>
        <table className="table mt-3 table-borderless">
            <thead>
              <th>Numéro</th>
              <th>Designation</th>
              <th>stock</th>
              <th>prix (Ar)</th>
              <th>Action</th>
            </thead>
            <tbody>
            {
                currentItems.map((item,index)=>(
                    <tr key={index}>
                        <td>{item.numProduit}</td>
                        <td >{item.design}</td>
                        <td>{item.stock}</td>
                        <td>{item.prix}</td>
                        <td>
                            <button className="btn " onClick={()=>handleShowModalEdit(item.numProduit)}><BiPencil/></button>
                            <button className="btn " onClick={()=>handleShowModalDelete(item.numProduit)}><BiTrashAlt/></button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
          </table>
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
