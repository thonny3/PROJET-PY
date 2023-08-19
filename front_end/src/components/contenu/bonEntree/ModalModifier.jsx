import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios'

export default function ModalModifier({showModalEdit,numArticle}) {
    console.log(numArticle.numBonEntree);
    const[Article,setArticle] = useState([])
    const  test = {
        numProduit:"",
        numBonEntree:"",
        qteEntree:"",
        dateEntree:""
    }
    const[donne,setDonne] = useState(test)
    
    const fetchData = ()=>{
        axios.get("http://127.0.0.1:5000/api/produit")
        .then(res=>{
            setArticle(res.data)
            console.log(res.data);
            
        })
        .catch(error=>console.log(error))
    }
    const modifierBonEntree= ()=>{ 
        fetchData()
    }
    useEffect(()=>{
        fetchData()
       
    },[])
    

  return (
    <>
   
    </>
  )
}
