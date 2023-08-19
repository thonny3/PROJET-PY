import React from 'react'
import { Button, Modal } from 'react-bootstrap';
export default function ModalSupprimer({showModalDelete,numArticle,deleteBonArticle}) {
    const deleteBOn =()=>{
        deleteBonArticle(numArticle)
    }
  return (
    <>
     <Modal show={showModalDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
       
        <Modal.Footer>
          <Button variant="secondary" >
            NON
          </Button>
          <Button variant="danger" onClick={deleteBOn}>
            OUI
          </Button>
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
    </>
  )
}
