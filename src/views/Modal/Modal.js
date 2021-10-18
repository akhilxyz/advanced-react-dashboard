import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import {ModalContext} from './Context'

const DeleteModal = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <ModalContext.Consumer>
      {context => {
        if (context.showModal) {
          return (
            <div >
              <Modal isOpen={context.showModal} toggle={toggle} className={className}>
                <ModalBody style={{textAlign :"center"}}>
                <i className="fas fa-exclamation-triangle" style={{color : 'red', fontSize : "80px", marginBottom :"10px"}}></i>
                <br/>
                Are you sure you want to delete this item ? Once deleted permanently, they cannot be recovered
                </ModalBody>
                <ModalFooter style={{justifyContent :"center"}}>
                  <Button color="danger" onClick={context.deleteItem}>Delete</Button>{' '}
                  <Button color="secondary" onClick={context.toggleModal}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
          );
        }
        return null;
      }
    }
    </ModalContext.Consumer>
  );
}

export default DeleteModal;