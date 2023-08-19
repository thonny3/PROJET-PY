import React from 'react'
import TableBonSortie from '../contenu/bonSortie/TableBonSortie'

export default function BonSortie() {
  return (
    <>
    <div className="alert text-center shadow p-3 mb-2  rounded"  style={{
        backgroundColor:"deepskyblue",
        color:"#fff"
      }}>
        <h5>GERER LE BON SORTIE D'ARTICLE</h5>
      </div>
      <TableBonSortie/>
    </>
  )
}
