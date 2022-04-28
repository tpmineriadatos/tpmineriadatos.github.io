var datosNacionalFijos = [];

var auxColor = [];


// SELECCIÓN DE TARJETA
function cambioColorTarjeta(color) {

    // console.log("nivelActualTabla:", nivelActualTabla);
    // console.log("color:", color);

    let valor = "";

    tarjetaNacional(color);

    if (nivelActualTabla == "nacional") {
        imprimeTabla(datosFiltroNacional, "nacional");
    } else if (nivelActualTabla == "direccion") {
        valor = $("#opcDireccion option:selected").val();
        tarjetaDireccion(valor);
        imprimeTabla(datosFiltroDireccion, nivelActualTabla);
    } else if (nivelActualTabla == "region") {

        valor = $("#opcDireccion option:selected").val();
        tarjetaDireccion(valor);
        valor = $("#opcPlaza option:selected").val();
        tarjetaRegion(valor);
        imprimeTabla(datosFiltroRegion, nivelActualTabla);

    } else if (nivelActualTabla == "distrito") {

        valor = $("#opcDireccion option:selected").val();
        tarjetaDireccion(valor);
        valor = $("#opcPlaza option:selected").val();
        tarjetaRegion(valor);
        valor = $("#opcDistrito option:selected").val();
        tarjetaDistrito(valor);
        imprimeTabla(datosFiltroDistrito, nivelActualTabla);

    } else if (nivelActualTabla == "supervisor") {

        valor = $("#opcDireccion option:selected").val();
        tarjetaDireccion(valor);
        valor = $("#opcPlaza option:selected").val();
        tarjetaRegion(valor);
        valor = $("#opcDistrito option:selected").val();
        tarjetaDistrito(valor);
        valor = $("#opcSupervisor option:selected").val();
        tarjetaSupervisor(valor);
        imprimeTabla(datosFiltroSupervisor, nivelActualTabla);

    }

}


function tarjetaNacional(color) {
    
    auxColor.length = 0;
    datosFiltroNacional.length = 0;

    if (color == "todo") {

        for (let i = 0; i < datosNacionalFijos.length; i++) {
            const element = datosNacionalFijos[i];
            datosFiltroNacional.push(element);
        }
        
    } else {

        let tarjeta = (color == "sinTarjeta") ? "-" : color;

        for (let i = 0; i < datosNacionalFijos.length; i++) {

            const element = datosNacionalFijos[i];

            if (element.tarjetaamarilla.toLowerCase() == tarjeta) {
                auxColor.push(element);
            }

        }

        // datosFiltroNacional.length = 0;

        for (let i = 0; i < auxColor.length; i++) {
            const element = auxColor[i];
            datosFiltroNacional.push(element);
        }
        
    }

    // console.log("datosFiltroNacional");
    // console.log(datosFiltroNacional);

}


function tarjetaDireccion(direccion) {

    auxColor.length = 0;
    datosFiltroDireccion.length = 0;

    for (let i = 0; i < datosFiltroNacional.length; i++) {

        const element = datosFiltroNacional[i];

        if (element.direccion == direccion) {
            auxColor.push(element);
        }

    }

    for (let i = 0; i < auxColor.length; i++) {
        const element = auxColor[i];
        datosFiltroDireccion.push(element);
    }

    // console.log("datosFiltroDireccion");
    // console.log(datosFiltroDireccion);

}


function tarjetaRegion(region) {

    auxColor.length = 0;
    datosFiltroRegion.length = 0;

    for (let i = 0; i < datosFiltroDireccion.length; i++) {

        const element = datosFiltroDireccion[i];

        if (element.region == region) {
            auxColor.push(element);
        }

    }

    for (let i = 0; i < auxColor.length; i++) {
        const element = auxColor[i];
        datosFiltroRegion.push(element);
    }

    // console.log("datosFiltroRegion");
    // console.log(datosFiltroRegion);

}


function tarjetaDistrito(distrito) {

    auxColor.length = 0;
    datosFiltroDistrito.length = 0;

    for (let i = 0; i < datosFiltroRegion.length; i++) {

        const element = datosFiltroRegion[i];

        if (element.distrito == distrito) {
            auxColor.push(element);
        }

    }

    for (let i = 0; i < auxColor.length; i++) {
        const element = auxColor[i];
        datosFiltroDistrito.push(element);
    }

    // console.log("datosFiltroDistrito");
    // console.log(datosFiltroDistrito);

}


function tarjetaSupervisor(supervisor) {

    auxColor.length = 0;
    datosFiltroSupervisor.length = 0;

    for (let i = 0; i < datosFiltroDistrito.length; i++) {

        const element = datosFiltroDistrito[i];

        if (element.nombresupervisor == supervisor) {
            auxColor.push(element);
        }

    }

    for (let i = 0; i < auxColor.length; i++) {
        const element = auxColor[i];
        datosFiltroSupervisor.push(element);
    }

    // console.log("datosFiltroSupervisor");
    // console.log(datosFiltroSupervisor);

}


// SELECCIÓN DE SEMANA A MOSTRAR
function datosSemM2(chek) {

    let color = $("#opcTarjeta option:selected").val();

    if (chek) {

        for (let i = 0; i < datosCompleto.length; i++) {

            const element = datosCompleto[i];
            var row = {};

            if (element.semana == semanasReporte[1]) {

                row["semana"] = element.semana;
                row["direccion"] = element.direccion;
                row["region"] = element.region;
                row["distrito"] = element.distrito;
                row["nsupervisor"] = element.nsupervisor;
                row["nombresupervisor"] = element.nombresupervisor;
                row["ninstalador"] = element.ninstalador;
                row["nombreinstalador"] = element.nombreinstalador;
                row["empresa"] = element.empresa;
                row["productividad"] = element.productividad;
                row["numordenes"] = element.numordenes;
                row["numreincidencias"] = element.numreincidencias;
                row["porcreincidencias"] = element.porcreincidencias;
                row["diastrabajados"] = element.diastrabajados;
                row["ventatecnico"] = element.ventatecnico;
                row["calificacion"] = element.calificacion;

                row["addon"] = element.addon;
                row["cddInstalaciones"] = element.cddInstalaciones;
                row["empresarialHS"] = element.empresarialHS;
                row["soporteProactiva"] = element.soporteProactiva;
                row["recolecciones"] = element.recolecciones;

                row["tarjetaamarilla"] = element.tarjetaamarilla;
                row["fechaultcurso"] = element.fechaultcurso;
                row["curso"] = element.curso;

                datosNacionalFijos.push(row);

            }

        }

        datosNacionalFijos.sort(function (a, b) {
            return a.calificacion - b.calificacion;
        });
        
        cambioColorTarjeta(color);
        
    } else {
        datosNacionalFijos = datosNacionalFijos.filter((e, i) => e.semana != semanasReporte[1] );
        cambioColorTarjeta(color);
    }

}


function datosSemM3(chek) {

    let color = $("#opcTarjeta option:selected").val();

    if (chek) {

        for (let i = 0; i < datosCompleto.length; i++) {

            const element = datosCompleto[i];
            var row = {};

            if (element.semana == semanasReporte[2]) {

                row["semana"] = element.semana;
                row["direccion"] = element.direccion;
                row["region"] = element.region;
                row["distrito"] = element.distrito;
                row["nsupervisor"] = element.nsupervisor;
                row["nombresupervisor"] = element.nombresupervisor;
                row["ninstalador"] = element.ninstalador;
                row["nombreinstalador"] = element.nombreinstalador;
                row["empresa"] = element.empresa;
                row["productividad"] = element.productividad;
                row["numordenes"] = element.numordenes;
                row["numreincidencias"] = element.numreincidencias;
                row["porcreincidencias"] = element.porcreincidencias;
                row["diastrabajados"] = element.diastrabajados;
                row["ventatecnico"] = element.ventatecnico;
                row["calificacion"] = element.calificacion;

                row["addon"] = element.addon;
                row["cddInstalaciones"] = element.cddInstalaciones;
                row["empresarialHS"] = element.empresarialHS;
                row["soporteProactiva"] = element.soporteProactiva;
                row["recolecciones"] = element.recolecciones;

                row["tarjetaamarilla"] = element.tarjetaamarilla;
                row["fechaultcurso"] = element.fechaultcurso;
                row["curso"] = element.curso;

                datosNacionalFijos.push(row);

            }

        }

        datosNacionalFijos.sort(function (a, b) {
            return a.calificacion - b.calificacion;
        });

        cambioColorTarjeta(color);

    } else {
        datosNacionalFijos = datosNacionalFijos.filter((e, i) => e.semana != semanasReporte[2]);
        cambioColorTarjeta(color);
    }

}


function datosSemM4(chek) {

    let color = $("#opcTarjeta option:selected").val();

    if (chek) {

        for (let i = 0; i < datosCompleto.length; i++) {

            const element = datosCompleto[i];
            var row = {};

            if (element.semana == semanasReporte[3]) {

                row["semana"] = element.semana;
                row["direccion"] = element.direccion;
                row["region"] = element.region;
                row["distrito"] = element.distrito;
                row["nsupervisor"] = element.nsupervisor;
                row["nombresupervisor"] = element.nombresupervisor;
                row["ninstalador"] = element.ninstalador;
                row["nombreinstalador"] = element.nombreinstalador;
                row["empresa"] = element.empresa;
                row["productividad"] = element.productividad;
                row["numordenes"] = element.numordenes;
                row["numreincidencias"] = element.numreincidencias;
                row["porcreincidencias"] = element.porcreincidencias;
                row["diastrabajados"] = element.diastrabajados;
                row["ventatecnico"] = element.ventatecnico;
                row["calificacion"] = element.calificacion;

                row["addon"] = element.addon;
                row["cddInstalaciones"] = element.cddInstalaciones;
                row["empresarialHS"] = element.empresarialHS;
                row["soporteProactiva"] = element.soporteProactiva;
                row["recolecciones"] = element.recolecciones;

                row["tarjetaamarilla"] = element.tarjetaamarilla;
                row["fechaultcurso"] = element.fechaultcurso;
                row["curso"] = element.curso;

                datosNacionalFijos.push(row);

            }

        }

        datosNacionalFijos.sort(function (a, b) {
            return a.calificacion - b.calificacion;
        });

        cambioColorTarjeta(color);

    } else {
        datosNacionalFijos = datosNacionalFijos.filter((e, i) => e.semana != semanasReporte[3]);
        cambioColorTarjeta(color);
    }

}


function datosSemM5(chek) {

    let color = $("#opcTarjeta option:selected").val();

    if (chek) {

        for (let i = 0; i < datosCompleto.length; i++) {

            const element = datosCompleto[i];
            var row = {};

            if (element.semana == semanasReporte[4]) {

                row["semana"] = element.semana;
                row["direccion"] = element.direccion;
                row["region"] = element.region;
                row["distrito"] = element.distrito;
                row["nsupervisor"] = element.nsupervisor;
                row["nombresupervisor"] = element.nombresupervisor;
                row["ninstalador"] = element.ninstalador;
                row["nombreinstalador"] = element.nombreinstalador;
                row["empresa"] = element.empresa;
                row["productividad"] = element.productividad;
                row["numordenes"] = element.numordenes;
                row["numreincidencias"] = element.numreincidencias;
                row["porcreincidencias"] = element.porcreincidencias;
                row["diastrabajados"] = element.diastrabajados;
                row["ventatecnico"] = element.ventatecnico;
                row["calificacion"] = element.calificacion;

                row["addon"] = element.addon;
                row["cddInstalaciones"] = element.cddInstalaciones;
                row["empresarialHS"] = element.empresarialHS;
                row["soporteProactiva"] = element.soporteProactiva;
                row["recolecciones"] = element.recolecciones;

                row["tarjetaamarilla"] = element.tarjetaamarilla;
                row["fechaultcurso"] = element.fechaultcurso;
                row["curso"] = element.curso;

                datosNacionalFijos.push(row);

            }

        }

        datosNacionalFijos.sort(function (a, b) {
            return a.calificacion - b.calificacion;
        });

        cambioColorTarjeta(color);

    } else {
        datosNacionalFijos = datosNacionalFijos.filter((e, i) => e.semana != semanasReporte[4]);
        cambioColorTarjeta(color);
    }

}


// SELECCIÓN DE NACIONAL EN EL COMBO DIRECCIÓN
function nacionalFiltros(k) {

    let idChek = "#semM" + (k + 1);

    // console.log(idChek + $(idChek).prop("checked"));
    
    if ($(idChek).prop("checked")) {

        for (let i = 0; i < datosCompleto.length; i++) {

            const element = datosCompleto[i];
            var row = {};

            if (element.semana == semanasReporte[k]) {

                row["semana"] = element.semana;
                row["direccion"] = element.direccion;
                row["region"] = element.region;
                row["distrito"] = element.distrito;
                row["nsupervisor"] = element.nsupervisor;
                row["nombresupervisor"] = element.nombresupervisor;
                row["ninstalador"] = element.ninstalador;
                row["nombreinstalador"] = element.nombreinstalador;
                row["empresa"] = element.empresa;
                row["productividad"] = element.productividad;
                row["numordenes"] = element.numordenes;
                row["numreincidencias"] = element.numreincidencias;
                row["porcreincidencias"] = element.porcreincidencias;
                row["diastrabajados"] = element.diastrabajados;
                row["ventatecnico"] = element.ventatecnico;
                row["calificacion"] = element.calificacion;

                row["addon"] = element.addon;
                row["cddInstalaciones"] = element.cddInstalaciones;
                row["empresarialHS"] = element.empresarialHS;
                row["soporteProactiva"] = element.soporteProactiva;
                row["recolecciones"] = element.recolecciones;

                row["tarjetaamarilla"] = element.tarjetaamarilla;
                row["fechaultcurso"] = element.fechaultcurso;
                row["curso"] = element.curso;

                datosNacionalFijos.push(row);

            }

        }

    }

}
