class Nodo {
  constructor(valor, id) {
    this.id = id;
    this.izquierda = null;
    this.valor = valor;
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

}



export const arbol = new Arbol();