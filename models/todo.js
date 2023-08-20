const { v4: uuidv4 } = require('uuid');

class Todo {
    
    id = '';
    desc = '';
    completadoEn = null;

    constructor( desc ) {
        this.id = uuidv4();
        this.desc = desc;
    }

}

module.exports = Todo;
