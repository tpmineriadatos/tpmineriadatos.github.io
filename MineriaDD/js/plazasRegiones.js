$(document).on("input", "input[name=segmentacion]", function () {

    let opcionSelec = $(this).val();

    if (opcionSelec == "region") {
        cambioRegionInput();
    } else if (opcionSelec == "plaza") {
        cambioPlazaInput();
    }

});


function cambioRegionInput() {

    let direccionSelec = $("#opcDireccion").val();

    $("#desDistrito").hide();
    $("#opcRegionPlaza").empty().append("<option selected disabled>Seleccionar</option>");

    listaRegiones.length = 0;

    for (let i = 1; i < renglones2.length; i++) {

        const element = renglones2[i].split(",");

        if (element[0] == direccionSelec) {

            if ((listaRegiones.length == 0) || !(listaRegiones.includes(element[1]))) {
                // datoRepetido = element[1];
                listaRegiones.push(element[1]);
                $("#opcRegionPlaza").append($("<option>", { value: element[1], text: element[1] }));
            }

        }

    }

    // graficasCeros($("#desDistrito").is(":visible"));

}


function cambioPlazaInput() {

    let direccionSelec = $("#opcDireccion").val();

    $("#desDistrito").hide();
    $("#opcRegionPlaza").empty().append("<option selected disabled>Seleccionar</option>");

    listaPlazas.length = 0;

    for (let i = 1; i < renglones2.length; i++) {

        const element = renglones2[i].split(",");

        if (element[0] == direccionSelec) {

            if ((listaPlazas.length == 0) || !(listaPlazas.includes(element[2]))) {
                // datoRepetido = element[2];
                listaPlazas.push(element[2]);
                $("#opcRegionPlaza").append($("<option>", { value: element[2], text: element[2] }));
            }

        }

    }

    // graficasCeros($("#desDistrito").is(":visible"));

}
