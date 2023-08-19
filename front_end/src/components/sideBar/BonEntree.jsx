import React, { useState } from 'react'
import "../../article/article.css";
import TableBonEntre from '../contenu/bonEntree/TableBonEntre';
export default function BonEntree() {
 
  return (
    <>
    <div className="alert text-center shadow p-3 mb-2  rounded"  style={{
        backgroundColor:"deepskyblue",
        color:"#fff"
      }}>
        <h5>GERER LE BON D'ENTREE ARTICLE </h5>
      </div>
      <TableBonEntre/>
    </>
  )
}
