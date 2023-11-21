import {Button, Col, Container, Modal, Row} from "react-bootstrap";
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
        <table className='table table-responsive table-bordered'>
          <thead>
          <tr>
            <th>Tarea</th>
            <th>Prioridad</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td colSpan={2} className='fw-bold text-decoration-underline'>No hay tareas</td>
          </tr>
          </tbody>
        </table>
      )
    }
    return(
      <table className='table table-responsive table-bordered'>
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
    <Modal centered show={openModal} onShow={handleOpen} onHide={handleClose} size={"xl"} style={{
      /*blur*/
      backdropFilter: "blur(5px)",
    }}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className='d-flex'>
            Gestionando las tareas de:&nbsp;<section className='fw-bold'>{proyecto.valor}</section>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Container>
          <Row>
            <Col xs={5} className={'align-self-center'}>
              <form onSubmit={addTareas}>
                <section>
                  <label className='form-label'>Ingrese el nombre de la tarea</label>
                  <input type="text" name="tarea" className='form-control'/>
                </section>

                <section>
                  <label className='form-label'>Ingrese la prioridad</label>
                  <select name="prioridad" className='form-select'>
                    <option value="ALTA">Alta</option>
                    <option value="MEDIA">Media</option>
                    <option value="BAJA">Baja</option>
                  </select>
                </section>

                <div className="form-text">Las tareas se mostraran reflejados por orden lexicografico</div>

                <br/>
                <button
                  className={'btn btn-primary'}
                >
                  Añadir
                </button>
              </form>
            </Col>
            <Col xs={7} className={'align-self-baseline text-center'}>
              <section>
                {mostrarTareas()}
              </section>
            </Col>
          </Row>
        </Container>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}