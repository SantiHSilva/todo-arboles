import {useEffect, useRef} from "react";
import {Network} from "vis-network";

export default function Visualizar({nodes, edges}){

  const visNetworkRef = useRef(null);

  useEffect(() => {
    console.log('vis2')
    let container = visNetworkRef.current;

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
        alert("Node: " + clickedNode)
      }
    });
  }, [nodes, edges])

  return(
    <div
      style={{
        width: "600px",
        height: "600px",
        border: "1px solid lightgray",
      }} ref={visNetworkRef}/>
  )
}