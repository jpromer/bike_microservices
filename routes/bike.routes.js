const bike = require("../src/controller/bike.controller");

module.exports = function(app) {

    var router = require("express").Router();

    //Agregar bicicletas 
    router.post("/", bike.create);

    //Buscar bicicletas
    router.get("/", bike.findAll);

     //Buscar bicicleta especifica
    router.get("/:idBike", bike.findOne);


    //Actualizar estudiante
    router.put("/:idBike", bike.update)


    //Eliminar 1 estudiantes por numero de documeto
    router.delete("/:idBike", bike.deleteOne);

    //Ruta predeterminada
    app.use('/api/bike', router);

}

