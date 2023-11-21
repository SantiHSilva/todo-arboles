import {useEffect, useState} from "react";
import {Network} from "vis-network";
import Categoria from "./Categoria.jsx";

export default function Proyecto({nodes, edges, arbol}){

  const [categoriaID, setCategoriaID] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  function createNetwork(){
    const container = document.getElementById('proyectos')

    const data = {
      nodes: nodes,
      edges: edges,
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
      const clickedNode = this.getNodeAt(params.pointer.DOM);
      if(clickedNode !== undefined){
        setCategoriaID(clickedNode)
      }
    });
  }

  useEffect(() => {
    if(categoriaID === 0) return
    console.log("se abrio el modal", categoriaID)
    setOpenModal(true)
  }, [categoriaID]);

  useEffect(() => {
    if (openModal) return;
    console.log("se cerro el modal")
    setCategoriaID(0);
  }, [openModal]);

  useEffect(() => {
    createNetwork();
  }, [nodes, edges])

  return(
    <section>

      <h2 className='text-center font-italic'>
        Árbol de categorias
      </h2>

      <div
        id={'proyectos'}
        style={{
          width: "600px",
          height: "600px",
          border: "1px solid lightgray",
        }}
      />

      <Categoria
        CategoriaID={categoriaID}
        openModal={openModal}
        setOpenModal={setOpenModal}
        arbol={arbol}
      />
    </section>
  )
}