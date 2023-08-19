import React, { useState } from 'react'
import axios from 'axios'
export default function Form() {
    const donne = {
        numProduit:"",
        design:"",
        prix:0
    }
    const[data,setData] = useState(donne)
    const submitData = ()=>{
        axios.post("http://127.0.0.1:5000/api/produit",data)
            .then(res=>{
                setData(donne)
                console.log(res.data);
            })
            .catch(error=>console.log(error))
    }
  return (
    <>
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
            <div className="form-group mt-2">
              <button type="button" onClick={submitData}>Valider</button>
            </div>
          </form>
    </>
  )
}
