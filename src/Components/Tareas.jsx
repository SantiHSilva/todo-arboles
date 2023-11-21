import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function Tareas({projectID, categoriaID, arbol, openModal, setOpenModalTareas}){

  const [proyecto, setProyecto] = useState("arbol.buscar_proyecto_id(categoriaID, projectID)")
  const [tareas, setTareas] = useState([])
  const [update, setUpdate] = useState(false)

  function handleClose() {
    console.log("Intentando cerrar panel de tareas")
    setProyecto('')
    setOpenModalTareas(0)

    document.getElementById('categoriaModal').style.display = 'block'
  }

  const handleOpen = () => {
    console.log("Abriendo panel de tareas")
    console.log(projectID, categoriaID)
    //setProyecto(arbol.buscar_proyecto_id(categoriaID, projectID))
    setProyecto(arbol.buscar_info_id(categoriaID).proyectos.buscar_info_id(projectID))
    setUpdate(true)

    document.getElementById('categoriaModal').style.display = 'none'
  }

  useEffect(() => {
    console.log("Proyecto cambiado")
    if(update === false) return;
    setTareas(proyecto.tareas)
    setUpdate(false)
  }, [update]);

  useEffect(() => {
    console.log(tareas)
  }, [tareas]);

  function addTareas(e){
    const tarea = e.target.tarea.value
    const prioridad = e.target.prioridad.value
    arbol.agregar_tarea(categoriaID, projectID, tarea, prioridad)
    setProyecto(arbol.buscar_info_id(categoriaID).proyectos.buscar_info_id(projectID))
    e.target.tarea.value = ''
    setUpdate(true)
    e.preventDefault()
  }

  function mostrarTareas(){
    if(tareas.length === 0){
      return(
        <p>No hay tareas</p>
      )
    }
    console.log("tareas",tareas)
    const tareasFiltradasPorID = tareas.filter(tarea => tarea.proyectID === projectID)
    console.log("tAReas filtradas",tareasFiltradasPorID)
    return(
      <table className='table table-responsive'>
        <thead>
        <tr>
          <th>Tarea</th>
          <th>Prioridad</th>
        </tr>
        </thead>
        <tbody>
            {tareas.map(tarea => {
              return(
                <tr key={tarea.id}>
                  <td>{tarea.valor}</td>
                  <td>{tarea.prioridad}</td>
                </tr>
                )
                })}
        </tbody>
      </table>
    )
  }


  return(
    <Modal show={openModal} onShow={handleOpen} onHide={handleClose} size={"xl"} style={{
      /*blur*/
      backdropFilter: "blur(5px)",
    }}>
      <Modal.Header closeButton>
        <Modal.Title>Mirando tareas de: '{proyecto.valor}'</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form onSubmit={addTareas}>
          <label>Ingrese el nombre de la tarea</label>
          <input type="text" name="tarea"/>
          <label>Ingrese la prioridad</label>
          <select name="prioridad">
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          <button>Añadir</button>
        </form>

        <section>
          {mostrarTareas()}
        </section>

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