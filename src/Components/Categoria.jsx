import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Network} from "vis-network";
import Tareas from "./Tareas.jsx";

export default function Categoria({CategoriaID, openModal, setOpenModal, arbol}){

  const [CategoriaInfo, setCategoriaInfo] = useState(arbol.buscar_info_id(CategoriaID))
  const [openTareas, setOpenTareas] = useState(false)
  const [projectID, setProjectID] = useState(0)

  useEffect(() => {
    if(projectID === 0) {
      setOpenTareas(false)
      createNetwork();
      return;
    }
    console.log("abriendo modal de tareas 2")
    setOpenTareas(true)
  }, [projectID]);

  useEffect(() => {
    console.log("openModal", openModal)
    if(!openModal){
      console.log("cerrando modal de tareas, reseteando projectID")
      setProjectID(0)
    }
  }, [openTareas]);

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
    createNetwork()
  }, [CategoriaInfo]);

  function createNetwork(){
    let container = document.getElementById('categoria')
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
    new Network(container, data, options).on("click", function (params) {
      params.event = "[original event]";
      const proyectoNodeID = this.getNodeAt(params.pointer.DOM);
      if(proyectoNodeID !== undefined){
        console.log("intentando abrir modal de tareas")
        //console.log(CategoriaInfo.proyectos.buscar_info_id(proyectoNodeID))
        setProjectID(proyectoNodeID)
      }
    });
  }

  function submit(e) {
    e.preventDefault()
    const proyecto = e.target.proyecto.value
    createProyect(proyecto)
    createNetwork()
    e.target.proyecto.value = ''
  }

  return(
    <>
      <Tareas projectID={projectID} categoriaID={CategoriaID} arbol={arbol} openModal={openTareas} setOpenModalTareas={setProjectID} />
      <Modal show={openModal} onShow={handleOpen} onHide={handleClose} size='xl' id={'categoriaModal'}>
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
    </>
  )
}
