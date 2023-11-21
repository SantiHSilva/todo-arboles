import {Button, Modal} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {Network} from "vis-network";

export default function Categoria({CategoriaID, openModal, setOpenModal, arbol}){

  const [CategoriaInfo, setCategoriaInfo] = useState(arbol.buscar_info_id(CategoriaID))
  const handleClose = () => {
    setOpenModal(false);
  }
  function handleOpen(){
    setCategoriaInfo(arbol.buscar_info_id(CategoriaID))
    updateInfo()
    createNetwork()
  }

  function createProyect(name){
    arbol.agregar_proyecto(CategoriaID, name)
    updateInfo()
  }

  function updateInfo(){
    setCategoriaInfo(arbol.buscar_info_id(CategoriaID))
  }

  useEffect(() => {
    console.log("se cambio la categoria, se actualiza la info", CategoriaInfo)
    createNetwork()
  }, [CategoriaInfo]);

  function createNetwork(){
    let container = document.getElementById('categoria')
    console.log("Create network")
    console.log(CategoriaInfo)
    if(CategoriaInfo === "No existe el arbol") return;

    const data = {
      nodes: CategoriaInfo.proyectos.nodes,
      edges: CategoriaInfo.proyectos.edges,
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
    e.preventDefault()
    const proyecto = e.target.proyecto.value
    console.log("Añadiendo", arbol)
    createProyect(proyecto)
    createNetwork()
    console.log('agregado')
    e.target.proyecto.value = ''
  }

  return(
    <Modal show={openModal} onShow={handleOpen} onHide={handleClose} size='xl'>
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