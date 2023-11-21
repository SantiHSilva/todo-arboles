class Nodo {
  constructor(valor, id) {
    this.id = id;
    this.izquierda = null;
    this.valor = valor;
    this.proyectos = new Arbol();
    this.tareas = [];
    this.derecha = null;
  }
}

class Arbol {
  constructor() {
    this.numNodos = 0;
    this.nodes = [];
    this.edges = [];
    this.padre = null;
  }

  agregar(valor) {
    if(valor === "" ||valor === null || valor === undefined) return;
    if(this._existe(valor)) return;
    this.numNodos++;
    const nodo = new Nodo(valor, this.numNodos);
    this.nodes.push({id: this.numNodos, label: valor.toString()});
    if (this.padre === null) {
      this.padre = nodo;
    } else {
      this._agregarNodo(this.padre, nodo);
    }
  }

  agregar_proyecto(nodeID, valor) {
    const nodo = this.buscar_info_id(nodeID);
    if(nodo.proyectos._existe(valor)) return;
    nodo.proyectos.agregar(valor);
  }

  agregar_tarea(proyectID, categoriaID, valor, prioridad) {
    const nodo = this.buscar_info_id(proyectID);
    const categoria = nodo.proyectos.buscar_info_id(categoriaID);
    categoria.tareas.push({
      proyectID: proyectID,
      categoriaID: categoriaID,
      valor: valor,
      prioridad: prioridad
    });
  }

  _agregarNodo(padre, nodo) {
    if (nodo.valor < padre.valor) {
      if (padre.izquierda === null) {
        padre.izquierda = nodo;
        this.edges.push({from: padre.id, to: nodo.id});
      } else {
        this._agregarNodo(padre.izquierda, nodo);
      }
    } else {
      if (padre.derecha === null) {
        padre.derecha = nodo;
        this.edges.push({from: padre.id, to: nodo.id});
      } else {
        this._agregarNodo(padre.derecha, nodo);
      }
    }
  }

  _existe(valor){
    if(this.padre === null){
      return false;
    }else{
      return this._buscarNodo(this.padre, valor);
    }
  }

  _buscarNodo(padre, valor){
    if(padre === null){
      return false;
    }else if(padre.valor === valor){
      return true;
    }else if(valor < padre.valor){
      return this._buscarNodo(padre.izquierda, valor);
    }else{
      return this._buscarNodo(padre.derecha, valor);
    }
  }

  buscar_info_id(id) {
    if (this.padre === null) {
      return 'No existe el arbol';
    } else {
      return this._buscarInfoPorID(this.padre, id);
    }
  }

  _buscarInfoPorID(padre, id) {
    if (padre === null) {
      return false
    } else if (padre.id === id) {
      return padre;
    } else {
      return this._buscarInfoPorID(padre.izquierda, id) || this._buscarInfoPorID(padre.derecha, id);
    }
  }
}

const arbol = new Arbol();

export default arbol;