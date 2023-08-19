import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios'
export default function ModalAjout({showModal,handleCloseModal,createBonEntree}) {
    const[data,setData] = useState([])
    const[donne,setDonne] = useState({
        numProduit:"",
        numBonEntree:"",
        qteEntree:"",
        dateEntree:""
    })
    const fetchData = ()=>{
        axios.get("http://127.0.0.1:5000/api/produit")
        .then(res=>{
            setData(res.data)
            console.log(res.data);
        })
        .catch(error=>console.log(error))
    }
    const submitDonne = ()=>{
        createBonEntree(donne)
    }

    useEffect(()=>{
        fetchData()
    },[])

  return (
    <>
    <Modal show={showModal} centered onHide={handleCloseModal}>
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
                placeholder="Veuillez saisir numéro "
                onChange={(e)=>setDonne({...donne,numBonEntree:e.target.value})}
                
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="" style={{ fontWeight: "bold" }} className="mb-2">
                Article
              </label>
              <select name="" id="" className="form-control"   onChange={(e)=>setDonne({...donne,numProduit:e.target.value})}>
                <option value="">Selectionnez l'article </option>
                {
                    data.map((item,index)=>(
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
          <Button variant="secondary" onClick={submitDonne}>
            Enregistrer
          </Button>
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
    </>
  )
}
