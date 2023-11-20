import {Container} from "react-bootstrap";
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
      <form onSubmit={subir}>
        <label>Añade una nueva categoria</label>
        <input type="text" name='nodo'/>
        <button>
          Añadir
        </button>
      </form>

      <section
      className='d-flex justify-content-center'
      >
        <Proyecto
          nodes={nodes}
          edges={edges}
          arbol={arbol}
        />
      </section>

    </Container>
  )
}

export default App
