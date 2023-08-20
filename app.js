const { 
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecks,
    } = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const Todo = require('./models/todo');
const Todos = require('./models/todos');
const main = async() => {

    let opt = ''
    const todos = new Todos();

    const tareasDB = leerDB();
    if( tareasDB ) {
        todos.cargarTodosFromArray( tareasDB );
    }

    do{
        opt = await inquireMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Proporcione la descripción de la tarea:');
                todos.crearTodo(desc);
            break;

            case '2':
                // console.log( todos.listadoArray );
                todos.listadoCompleto();
            break;

            case '3':
                todos.listarPendientesCompletadas(true);
            break;

            case '4':
                todos.listarPendientesCompletadas(false);
            break;                    

            case '5':
                const ids = await mostrarListadoChecks( todos.listadoArray );
                todos.toggleCompletadas(ids);
            break;                    

            case '6':
                const id = await listadoTareasBorrar( todos.listadoArray );
                if( id !== '0'){
                    const check = await confirmar(`¿Está seguro?`);
                    if(check){
                        todos.borrarTarea(id);
                        console.log('Tarea borrada exitosamente.');
                    }
                }
            break;                

            case '7':
            break;                    

            default:
            break;

        }

        guardarDB( todos.listadoArray );

        await pausa();
        
    }while( opt !== '0');
}

main();