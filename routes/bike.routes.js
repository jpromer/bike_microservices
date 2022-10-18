const bike = require("../src/controller/bike.controller");

module.exports = function(app) {

    var router = require("express").Router();

    //Agregar bicicletas 
    app.post("/", bike.create);

    //Buscar bicicletas
    app.get("/", bike.findAll);

     //Buscar bicicleta especifica
    app.get("/:idBike", bike.findOne);


    //Actualizar estudiante
    app.put("/:idBike", bike.update)


    //Eliminar 1 estudiantes por numero de documeto
    app.delete('/:idBike', bike.deleteOne);

    //Ruta predeterminada
    app.use('/api/bike', router);

}

