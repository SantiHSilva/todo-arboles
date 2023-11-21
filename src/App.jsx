import {Col, Container, Row} from "react-bootstrap";
import arbol from "./Arbol";
import Proyecto from "./Components/Proyecto.jsx";
import {useEffect, useState} from "react";

function App() {

  const [update, setUpdate] = useState(false)
  const [edges, setEdges] = useState(arbol.edges)
  const [nodes, setNodes] = useState(arbol.nodes)

  function actualizar(){
    setUpdate(true)
  }

  useEffect(() => {
    if(!update) return;
    console.log('update')
    setEdges([...arbol.edges])
    setNodes([...arbol.nodes])
    setUpdate(false)
  }, [update]);

  function subir(e){
    const nodo = e.target.nodo.value
    e.target.nodo.value = ''
    arbol.agregar(nodo)
    actualizar();
    e.preventDefault()
  }

  return (
    <Container>
      <Row
        style={{
          /* Que ocupe toda la altura de la página*/
          height: '100vh',
        }}
      >
        <Col xs={6} className={'align-self-center'}>
          <section className='d-flex justify-content-center'>
            <form onSubmit={subir}>
              <label className='form-label'>Añade una nueva categoria</label>
              <input type="text" name='nodo' className='form-control'/>
              <div className="form-text">Los nodos se mostraran reflejados por orden lexicografico</div>
              <br/>
              <button className='btn btn-primary '>
                Añadir
              </button>
            </form>
          </section>
        </Col>

        <Col xs={6} className={'align-self-center'}>
          <section
            className='d-flex justify-content-center'
          >
            <Proyecto
              nodes={nodes}
              edges={edges}
              arbol={arbol}
            />
          </section>
        </Col>

      </Row>


    </Container>
  )
}

export default App
