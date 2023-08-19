import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Table() {
    const[product,setProduct] = useState([])
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
  return (
    <>
     <table className="table">
            <thead>
              <th>Numéro</th>
              <th>Designation</th>
              <th>stock</th>
              <th>prix (Ar)</th>
              <th>Action</th>
            </thead>
            <tbody>
            {
                product.map((item,index)=>(
                    <tr key={index}>
                        <td>{item.numProduit}</td>
                        <td>{item.design}</td>
                        <td>{item.stock}</td>
                        <td>{item.prix}</td>
                        <td>
                            <button className="btn btn-success">edit</button>
                            <button className="btn btn-danger">delete</button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
          </table>
    </>
  )
}
