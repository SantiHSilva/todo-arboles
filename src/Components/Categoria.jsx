import {Button, Modal} from "react-bootstrap";
import {useEffect, useRef} from "react";
import {Network} from "vis-network";

export default function Categoria({CategoriaID, openModal, setOpenModal, arbol}){

  const handleClose = () => setOpenModal(false);
  const CategoriaInfo = arbol.buscar_info_id(CategoriaID)

  function createNetwork(){
    let container = document.getElementById('categoria')
    console.log('container', container)
    if(!container) return;

    const data = {
      nodes: [],
      edges: [],
    };

    const options = {
      /*Disable movement*/
      interaction: {
        zoomView: false,
      },
      physics: {
        enabled: false,
      },
      manipulation: {
        enabled: false,
      },

      nodes: {
        shape: "circle",
        size: 20,
        font: {
          size: 20,
          color: "#262c2c",
        },
        borderWidth: 2,
      },
      /* Que los nodos este en orden arriba a abajo */
      layout: {
        hierarchical: {
          direction: "UD",
          sortMethod: "directed",
        },
      },
    };
    new Network(container, data, options);
  }

  function submit(e) {
    const proyecto = e.target.proyecto.value
    alert(`Se subio el proyecto ${proyecto} a la materia ${CategoriaInfo.valor}`)
    e.target.proyecto.value = ''
    e.preventDefault()
  }

  return(
    <Modal show={openModal} onShow={createNetwork} onHide={handleClose} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>Mirando los proyectos de {CategoriaInfo.valor}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form onSubmit={submit}>
          <label>Ingrese un proyecto</label>
          <input type="text" name="proyecto" />
          <button>Subir</button>
        </form>

        <div id='categoria'/>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}