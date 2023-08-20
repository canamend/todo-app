const Todo = require('./todo')
const colors = require('colors');

class Todos {

    _listado = {};

    get listadoArray() {
        const listado = [];
        Object.keys(this._listado).forEach(llave => {
            // listado.push( this._listado[llave].desc );
            listado.push( this._listado[llave] )
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ){

        if( this._listado[id] ){
            delete this._listado[id];
        }

    }

    cargarTodosFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[ tarea.id ] = tarea;
        });

    }

    listadoCompleto() {
        console.log();
        this.listadoArray.forEach( (elemento, indice) => {
            console.log(`${ indice }.`.green + ` ${ elemento.desc } :: ${ (elemento.completadoEn !== null ) ? 'Completado'.green : 'Pendiente'.red }`);
        });
    }

    listarPendientesCompletadas( completadas = true ) {
        let contador = 1;
        console.log();
        this.listadoArray.forEach( (elemento) => {
            if( elemento.completadoEn !== null && completadas ){
                console.log(`${ contador }.`.green + ` ${ elemento.desc } :: ${ elemento.completadoEn.green }`);
                contador += 1;
            }else{
                if( !completadas && !elemento.completadoEn ){
                    console.log(`${ contador }.`.green + ` ${ elemento.desc } :: ${ 'Pendiente'.red }`);
                    contador += 1;
                }
            }
            
        });
    }

    crearTodo(desc = '') {

        const todo = new Todo(desc);
        this._listado[todo.id] = todo;

    }

    toggleCompletadas(ids = [] ){
        ids.forEach( id => {
            const todo = this._listado[id];
            if( !todo.completadoEn ){
                todo.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArray.forEach(tarea => {
            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         = null;
            }
        });

    }

}

module.exports = Todos;
