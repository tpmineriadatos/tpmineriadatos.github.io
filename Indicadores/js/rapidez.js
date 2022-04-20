var datosGeneralesRegion = [],
    datosGeneralesPlaza = [],
    renglones = [];

var direccion = [],
    region = [],
    plaza = [],
    distrito = [],
    mes = [],
    semana = [],
    direcRegion = [],
    direcPlaza = [],
    regDistrito = [],
    plazaDistrito = [];

var nacionalSem6hrs = ["datos6hrs"],
    nacionalSem4hrs = ["datos4hrs"],
    nacionalSem2hrs = ["datos2hrs"],
    nacionalMes6hrs = ["datos6hrs"],
    nacionalMes4hrs = ["datos4hrs"],
    nacionalMes2hrs = ["datos2hrs"];

var direccionSem6hrs = ["datos6hrs"],
    direccionSem4hrs = ["datos4hrs"],
    direccionSem2hrs = ["datos2hrs"],
    direccionMes6hrs = ["datos6hrs"],
    direccionMes4hrs = ["datos4hrs"],
    direccionMes2hrs = ["datos2hrs"];

var regionSem6hrs = ["datos6hrs"],
    regionSem4hrs = ["datos4hrs"],
    regionSem2hrs = ["datos2hrs"],
    regionMes6hrs = ["datos6hrs"],
    regionMes4hrs = ["datos4hrs"],
    regionMes2hrs = ["datos2hrs"];

var distritoSem6hrs = ["datos6hrs"],
    distritoSem4hrs = ["datos4hrs"],
    distritoSem2hrs = ["datos2hrs"],
    distritoMes6hrs = ["datos6hrs"],
    distritoMes4hrs = ["datos4hrs"],
    distritoMes2hrs = ["datos2hrs"];

var plazaSem6hrs = ["datos6hrs"],
    plazaSem4hrs = ["datos4hrs"],
    plazaSem2hrs = ["datos2hrs"],
    plazaMes6hrs = ["datos6hrs"],
    plazaMes4hrs = ["datos4hrs"],
    plazaMes2hrs = ["datos2hrs"];

var direccionSemanal = new Object(),
    direccionMensual = new Object(),
    regionSemanal = new Object(),
    regionMensual = new Object(),
    distritoSemanal = new Object(),
    distritoMensual = new Object(),
    plazaSemanal = new Object(),
    plazaMensual = new Object();

var datosGrafDirSemanal = new Object(),
    datosGrafDirMensual = new Object(),
    datosGrafRegSemanal = new Object(),
    datosGrafRegMensual = new Object(),
    datosGrafDisSemanal = new Object(),
    datosGrafDisMensual = new Object(),
    datosGrafPlazaSemanal = new Object(),
    datosGrafPlazaMensual = new Object();

// var ejeXSemanas = ["semanas", "Semana 01", "Semana 02", "Semana 03", "Semana 04", "Semana 05",
//                     "Semana 06", "Semana 07", "Semana 08", "Semana 09", "Semana 10",
//                     "Semana 11", "Semana 12", "Semana 13", "Semana 14", "Semana 15",
//                     "Semana 16", "Semana 17", "Semana 18", "Semana 19", "Semana 20",
//                     "Semana 21", "Semana 22", "Semana 23", "Semana 24", "Semana 25",
//                     "Semana 26", "Semana 27", "Semana 28", "Semana 29", "Semana 30",
//                     "Semana 31", "Semana 32", "Semana 33", "Semana 34", "Semana 35",
//                     "Semana 36", "Semana 37", "Semana 38", "Semana 39", "Semana 40",
//                     "Semana 41", "Semana 42", "Semana 43", "Semana 44", "Semana 45",
//                     "Semana 46", "Semana 47", "Semana 48", "Semana 49", "Semana 50",
//                     "Semana 51", "Semana 52"],
    // ejeXSemInd = ["Semana 01", "Semana 02", "Semana 03", "Semana 04", "Semana 05",
    //                 "Semana 06", "Semana 07", "Semana 08", "Semana 09", "Semana 10",
    //                 "Semana 11", "Semana 12", "Semana 13", "Semana 14", "Semana 15",
    //                 "Semana 16", "Semana 17", "Semana 18", "Semana 19", "Semana 20",
    //                 "Semana 21", "Semana 22", "Semana 23", "Semana 24", "Semana 25",
    //                 "Semana 26", "Semana 27", "Semana 28", "Semana 29", "Semana 30",
    //                 "Semana 31", "Semana 32", "Semana 33", "Semana 34", "Semana 35",
    //                 "Semana 36", "Semana 37", "Semana 38", "Semana 39", "Semana 40",
    //                 "Semana 41", "Semana 42", "Semana 43", "Semana 44", "Semana 45",
    //                 "Semana 46", "Semana 47", "Semana 48", "Semana 49", "Semana 50",
    //                 "Semana 51", "Semana 52"],
    // ejeXMeses = ["meses", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    //                 "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    // ejeXMesesInd = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var meses = {"ene": "Enero", "feb": "Febrero", "mar": "Marzo", "abr": "Abril", "may": "Mayo", "jun": "Junio",
                "jul": "Julio", "ago": "Agosto", "sep": "Septiembre", "oct": "Octubre", "nov": "Noviembre", "dic": "Diciembre"};

var ejeXSemInd = [],
    ejeXMesesInd = [],
    ejeXSemanas = [],
    ejeXMeses = [];



$(document).ready(function () {

    document.getElementById("efectividad").style.backgroundColor = "rgb(31, 77, 155)";

    $("#desRegionPlaza").hide();
    $("#desDistrito").hide();
    $("#desBtnPresentacion").show();

    lecturaCSV1("fuentes/EfectividadRegion.csv");
    
    $("#opcDireccion").on("change", function (e) {
        cambioOpcDireccion($("#opcDireccion").val());
    });

    $("#opcRegionPlaza").on("change", function (e) {

        if ($("#region").prop("checked")) {
            cambioOpcRegion($("#opcRegionPlaza").val());
        } else if ($("#plaza").prop("checked")) {
            cambioOpcPlaza($("#opcRegionPlaza").val());
        }
        
    });

    $("#opcDistrito").on("change", function (e) {
        cambioOpcDistrito($("#opcDistrito").val());
    });

    $(document).on("input", "input[name=segmentacion]", function () {

        let opcionSelec = $(this).val();

        if (opcionSelec == "region") {
            cambioRegionInput();
        } else if (opcionSelec == "plaza") {
            cambioPlazaInput();
        }

    });

    $(document).on("input", "input[name=temporalidad]", function () {

        let opcionSelec = $(this).val();

        if (opcionSelec == "mensual") {
            cambioMensualInput();
        } else if (opcionSelec == "semanal") {
            cambioSemanalInput();
        }

    });

    $("#cambioGrafica").on("click", function (e) {

        if ($("#mensual").prop("checked")) {
            clickMensual();
        } else if ($("#semanal").prop("checked")) {
            clickSemanal();
        }

    });

});


function lecturaCSV1(documento) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglones = data.split(/\r\n|\n/);
            renglones = renglones.filter((e, i) => i > 0);

            for (let i = 0; i < renglones.length; i++) {
                datosGeneralesRegion.push(renglones[i].split(","));
            }

            lecturaCSV2("fuentes/EfectividadPlaza.csv");

        }

    });

}


function lecturaCSV2(documento) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglones = data.split(/\r\n|\n/);
            renglones = renglones.filter((e, i) => i > 0);

            for (let i = 0; i < renglones.length; i++) {
                datosGeneralesPlaza.push(renglones[i].split(","));
            }

            llenadoArreglosRelacion();
            dibujaGraficaBarra("#grafica1", ejeXSemInd, nacionalSem2hrs, nacionalSem4hrs, nacionalSem6hrs);

        }

    });

}


function llenadoArreglosRelacion() {

    // TODO trabajar en armar el año de la información dada
    let anio = datosGeneralesRegion[0][10];
    
    ejeXSemInd.length = 0;
    ejeXSemanas = ["semanas"];
    ejeXMesesInd.length = 0;
    ejeXMeses = ["meses"];

    for (let i = 0; i < datosGeneralesRegion.length; i++) {

        const element = datosGeneralesRegion[i];

        direccion.push(element[0]);
        region.push(element[1]);
        distrito.push(element[2]);
        mes.push(element[3]);
        // semana.push(element[4]);

    }

    for (let i = 0; i < datosGeneralesRegion.length; i++) {

        const element = datosGeneralesRegion[i];

        if (element[9] == element[10]) {
            semana.push(parseInt(element[4]));
        }
        
    }

    for (let i = 0; i < datosGeneralesPlaza.length; i++) {
        const element = datosGeneralesPlaza[i];
        plaza.push(element[1]);
    }

    const listDist = new Set(direccion);
    const listDist2 = new Set(region);
    const listDist3 = new Set(distrito);
    const listDist4 = new Set(plaza);
    const listDist5 = new Set(mes);
    const listDist6 = new Set(semana);

    direccion = [...listDist];
    region = [...listDist2];
    distrito = [...listDist3];
    plaza = [...listDist4];
    mes = [...listDist5];
    semana = [...listDist6];

    let ultSemana = Math.max(...semana) + 1;
    let ultMes = mes.length + 1;

    // Relación entre dirección - región
    for (let j = 0; j < region.length; j++) {

        let existe = 0;

        for (let i = 0; i < datosGeneralesRegion.length; i++) {

            const element = datosGeneralesRegion[i];

            if ((element[1] == region[j] && existe == 0)) {
                direcRegion.push([element[0], element[1]]);
                existe++;
            }

        }

    }

    // Relación entre región - distrito
    for (let j = 0; j < distrito.length; j++) {

        let existe = 0;

        for (let i = 0; i < datosGeneralesRegion.length; i++) {

            const element = datosGeneralesRegion[i];

            if ((element[2] == distrito[j] && existe == 0)) {
                regDistrito.push([element[1], element[2]]);
                existe++;
            }

        }

    }

    // Relación entre dirección - plaza
    for (let j = 0; j < plaza.length; j++) {

        let existe = 0;

        for (let i = 0; i < datosGeneralesPlaza.length; i++) {

            const element = datosGeneralesPlaza[i];

            if ((element[1] == plaza[j] && existe == 0)) {
                direcPlaza.push([element[0], element[1]]);
                existe++;
            }

        }

    }

    // Relación entre plaza - distrito
    for (let j = 0; j < distrito.length; j++) {

        let existe = 0;

        for (let i = 0; i < datosGeneralesPlaza.length; i++) {

            const element = datosGeneralesPlaza[i];

            if ((element[2] == distrito[j] && existe == 0)) {
                plazaDistrito.push([element[1], element[2]]);
                existe++;
            }

        }

    }

    // Arreglo ejeX semanas
    for (let i = 0; i < semana.length; i++) {
        let datoX = "Sem " + ("0" + semana[i]).slice(-2) + "-" + anio;
        ejeXSemInd.push(datoX);
        ejeXSemanas.push(datoX);
    }

    // Arreglo ejeX meses
    for (let i = 0; i < mes.length; i++) {
        let datoX = meses[mes[i]] + " " + anio;
        ejeXMesesInd.push(datoX);
        ejeXMeses.push(datoX);
    }


    /**
     * Datos Semanales
     */

    // Nacional
    for (let j = 1; j < ultSemana; j++) {

        var numerador6hrs = 0,
            numerador4hrs = 0,
            numerador2hrs = 0,
            denominador = 0,
            efectividad6hrs = "",
            efectividad4hrs = "",
            efectividad2hrs = "";

        for (let i = 0; i < datosGeneralesRegion.length; i++) {

            const element = datosGeneralesRegion[i];

            if ((element[4] == j) && (element[9] == element[10])) {

                numerador2hrs += parseInt(element[8]);
                numerador4hrs += parseInt(element[7]) - parseInt(element[8]);
                numerador6hrs += parseInt(element[6]) - parseInt(element[7]);
                denominador += parseInt(element[5]);

            }

        }

        efectividad2hrs = (denominador != 0) ? (numerador2hrs / denominador).toFixed(4) : "NA";
        efectividad2hrs = (efectividad2hrs != 0) ? efectividad2hrs : "NA";

        efectividad4hrs = (denominador != 0) ? (numerador4hrs / denominador).toFixed(4) : "NA";
        efectividad4hrs = (efectividad4hrs != 0) ? efectividad4hrs : "NA";

        efectividad6hrs = (denominador != 0) ? (numerador6hrs / denominador).toFixed(4) : "NA";
        efectividad6hrs = (efectividad6hrs != 0) ? efectividad6hrs : "NA";

        nacionalSem2hrs.push(efectividad2hrs);
        nacionalSem4hrs.push(efectividad4hrs);
        nacionalSem6hrs.push(efectividad6hrs);

    }

    // Direcciones
    for (let k = 0; k < direccion.length; k++) {

        let direc = direccion[k];
        let datosDirec = [direc];

        direccionSem2hrs = ["datos2hrs"];
        direccionSem4hrs = ["datos4hrs"];
        direccionSem6hrs = ["datos6hrs"];

        for (let j = 1; j < ultSemana; j++) {

            var numerador6hrs = 0,
                numerador4hrs = 0,
                numerador2hrs = 0,
                numeradorGrafica = 0,
                denominador = 0,
                efectividad6hrs = "",
                efectividad4hrs = "",
                efectividad2hrs = "",
                efectividadGrafica = "";

            for (let i = 0; i < datosGeneralesRegion.length; i++) {

                const element = datosGeneralesRegion[i];

                if ((element[4] == j) && (element[9] == element[10]) && (element[0] == direc)) {

                    numerador2hrs += parseInt(element[8]);
                    numerador4hrs += parseInt(element[7]) - parseInt(element[8]);
                    numerador6hrs += parseInt(element[6]) - parseInt(element[7]);
                    numeradorGrafica += parseInt(element[6]);
                    denominador += parseInt(element[5]);

                }

            }

            efectividad2hrs = (denominador != 0) ? (numerador2hrs / denominador).toFixed(4) : "NA";
            efectividad2hrs = (efectividad2hrs != 0) ? efectividad2hrs : "NA";

            efectividad4hrs = (denominador != 0) ? (numerador4hrs / denominador).toFixed(4) : "NA";
            efectividad4hrs = (efectividad4hrs != 0) ? efectividad4hrs : "NA";

            efectividad6hrs = (denominador != 0) ? (numerador6hrs / denominador).toFixed(4) : "NA";
            efectividad6hrs = (efectividad6hrs != 0) ? efectividad6hrs : "NA";

            efectividadGrafica = (denominador != 0) ? (numeradorGrafica / denominador).toFixed(4) : "NA";
            efectividadGrafica = (efectividadGrafica != 0) ? efectividadGrafica : "NA";

            direccionSem2hrs.push(efectividad2hrs);
            direccionSem4hrs.push(efectividad4hrs);
            direccionSem6hrs.push(efectividad6hrs);
            datosDirec.push(efectividadGrafica);

        }

        direccionSemanal[direc] = [direccionSem2hrs, direccionSem4hrs, direccionSem6hrs];
        datosGrafDirSemanal[direc] = datosDirec;

    }

    // Regiones
    for (let k = 0; k < region.length; k++) {

        let reg = region[k];
        let datosReg = [reg];

        regionSem2hrs = ["datos2hrs"];
        regionSem4hrs = ["datos4hrs"];
        regionSem6hrs = ["datos6hrs"];

        for (let j = 1; j < ultSemana; j++) {

            var numerador6hrs = 0,
                numerador4hrs = 0,
                numerador2hrs = 0,
                numeradorGrafica = 0,
                denominador = 0,
                efectividad6hrs = "",
                efectividad4hrs = "",
                efectividad2hrs = "",
                efectividadGrafica = "";

            for (let i = 0; i < datosGeneralesRegion.length; i++) {

                const element = datosGeneralesRegion[i];

                if ((element[4] == j) && (element[9] == element[10]) && (element[1] == reg)) {
                    
                    numerador2hrs += parseInt(element[8]);
                    numerador4hrs += parseInt(element[7]) - parseInt(element[8]);
                    numerador6hrs += parseInt(element[6]) - parseInt(element[7]);
                    numeradorGrafica += parseInt(element[6]);
                    denominador += parseInt(element[5]);

                }

            }

            efectividad2hrs = (denominador != 0) ? (numerador2hrs / denominador).toFixed(4) : "NA";
            efectividad2hrs = (efectividad2hrs != 0) ? efectividad2hrs : "NA";

            efectividad4hrs = (denominador != 0) ? (numerador4hrs / denominador).toFixed(4) : "NA";
            efectividad4hrs = (efectividad4hrs != 0) ? efectividad4hrs : "NA";

            efectividad6hrs = (denominador != 0) ? (numerador6hrs / denominador).toFixed(4) : "NA";
            efectividad6hrs = (efectividad6hrs != 0) ? efectividad6hrs : "NA";

            efectividadGrafica = (denominador != 0) ? (numeradorGrafica / denominador).toFixed(4) : "NA";
            efectividadGrafica = (efectividadGrafica != 0) ? efectividadGrafica : "NA";

            regionSem2hrs.push(efectividad2hrs);
            regionSem4hrs.push(efectividad4hrs);
            regionSem6hrs.push(efectividad6hrs);
            datosReg.push(efectividadGrafica);

        }

        regionSemanal[reg] = [regionSem2hrs, regionSem4hrs, regionSem6hrs];
        datosGrafRegSemanal[reg] = datosReg;

    }

    // Distritos
    for (let k = 0; k < distrito.length; k++) {

        let dis = distrito[k];
        let datosDis = [dis];

        distritoSem2hrs = ["datos2hrs"];
        distritoSem4hrs = ["datos4hrs"];
        distritoSem6hrs = ["datos6hrs"];

        for (let j = 1; j < ultSemana; j++) {

            var numerador6hrs = 0,
                numerador4hrs = 0,
                numerador2hrs = 0,
                numeradorGrafica = 0,
                denominador = 0,
                efectividad6hrs = "",
                efectividad4hrs = "",
                efectividad2hrs = "",
                efectividadGrafica = "";

            for (let i = 0; i < datosGeneralesRegion.length; i++) {

                const element = datosGeneralesRegion[i];

                if ((element[4] == j) && (element[9] == element[10]) && (element[2] == dis)) {

                    numerador2hrs += parseInt(element[8]);
                    numerador4hrs += parseInt(element[7]) - parseInt(element[8]);
                    numerador6hrs += parseInt(element[6]) - parseInt(element[7]);
                    numeradorGrafica += parseInt(element[6]);
                    denominador += parseInt(element[5]);

                }

            }

            efectividad2hrs = (denominador != 0) ? (numerador2hrs / denominador).toFixed(4) : "NA";
            efectividad2hrs = (efectividad2hrs != 0) ? efectividad2hrs : "NA";

            efectividad4hrs = (denominador != 0) ? (numerador4hrs / denominador).toFixed(4) : "NA";
            efectividad4hrs = (efectividad4hrs != 0) ? efectividad4hrs : "NA";

            efectividad6hrs = (denominador != 0) ? (numerador6hrs / denominador).toFixed(4) : "NA";
            efectividad6hrs = (efectividad6hrs != 0) ? efectividad6hrs : "NA";

            efectividadGrafica = (denominador != 0) ? (numeradorGrafica / denominador).toFixed(4) : "NA";
            efectividadGrafica = (efectividadGrafica != 0) ? efectividadGrafica : "NA";

            distritoSem2hrs.push(efectividad2hrs);
            distritoSem4hrs.push(efectividad4hrs);
            distritoSem6hrs.push(efectividad6hrs);
            datosDis.push(efectividadGrafica);

        }

        distritoSemanal[dis] = [distritoSem2hrs, distritoSem4hrs, distritoSem6hrs];
        datosGrafDisSemanal[dis] = datosDis;

    }

    // Plazas
    for (let k = 0; k < plaza.length; k++) {

        let pla = plaza[k];
        let datosPlaza = [pla];

        plazaSem2hrs = ["datos2hrs"];
        plazaSem4hrs = ["datos4hrs"];
        plazaSem6hrs = ["datos6hrs"];

        for (let j = 1; j < ultSemana; j++) {

            var numerador6hrs = 0,
                numerador4hrs = 0,
                numerador2hrs = 0,
                numeradorGrafica = 0,
                denominador = 0,
                efectividad6hrs = "",
                efectividad4hrs = "",
                efectividad2hrs = "",
                efectividadGrafica = "";

            for (let i = 0; i < datosGeneralesPlaza.length; i++) {

                const element = datosGeneralesPlaza[i];

                if ((element[4] == j) && (element[9] == element[10]) && (element[1] == pla)) {

                    numerador2hrs += parseInt(element[8]);
                    numerador4hrs += parseInt(element[7]) - parseInt(element[8]);
                    numerador6hrs += parseInt(element[6]) - parseInt(element[7]);
                    numeradorGrafica += parseInt(element[6]);
                    denominador += parseInt(element[5]);

                }

            }

            efectividad2hrs = (denominador != 0) ? (numerador2hrs / denominador).toFixed(4) : "NA";
            efectividad2hrs = (efectividad2hrs != 0) ? efectividad2hrs : "NA";

            efectividad4hrs = (denominador != 0) ? (numerador4hrs / denominador).toFixed(4) : "NA";
            efectividad4hrs = (efectividad4hrs != 0) ? efectividad4hrs : "NA";

            efectividad6hrs = (denominador != 0) ? (numerador6hrs / denominador).toFixed(4) : "NA";
            efectividad6hrs = (efectividad6hrs != 0) ? efectividad6hrs : "NA";

            efectividadGrafica = (denominador != 0) ? (numeradorGrafica / denominador).toFixed(4) : "NA";
            efectividadGrafica = (efectividadGrafica != 0) ? efectividadGrafica : "NA";

            plazaSem2hrs.push(efectividad2hrs);
            plazaSem4hrs.push(efectividad4hrs);
            plazaSem6hrs.push(efectividad6hrs);
            datosPlaza.push(efectividadGrafica);

        }

        plazaSemanal[pla] = [plazaSem2hrs, plazaSem4hrs, plazaSem6hrs];
        datosGrafPlazaSemanal[pla] = datosPlaza;

    }


    /**
     * Datos Mensuales
     */

    // Nacional
    for (let j = 1; j < ultMes; j++) {

        var numerador6hrs = 0,
            numerador4hrs = 0,
            numerador2hrs = 0,
            denominador = 0,
            efectividad6hrs = "",
            efectividad4hrs = "",
            efectividad2hrs = "";

        for (let i = 0; i < datosGeneralesRegion.length; i++) {

            const element = datosGeneralesRegion[i];
            let mes = meses[element[3]] + " " + anio;

            if (mes == ejeXMeses[j]) {

                numerador2hrs += parseInt(element[8]);
                numerador4hrs += parseInt(element[7]) - parseInt(element[8]);
                numerador6hrs += parseInt(element[6]) - parseInt(element[7]);
                denominador += parseInt(element[5]);

            }

        }

        efectividad2hrs = (denominador != 0) ? (numerador2hrs / denominador).toFixed(4) : "NA";
        efectividad2hrs = (efectividad2hrs != 0) ? efectividad2hrs : "NA";

        efectividad4hrs = (denominador != 0) ? (numerador4hrs / denominador).toFixed(4) : "NA";
        efectividad4hrs = (efectividad4hrs != 0) ? efectividad4hrs : "NA";

        efectividad6hrs = (denominador != 0) ? (numerador6hrs / denominador).toFixed(4) : "NA";
        efectividad6hrs = (efectividad6hrs != 0) ? efectividad6hrs : "NA";

        nacionalMes2hrs.push(efectividad2hrs);
        nacionalMes4hrs.push(efectividad4hrs);
        nacionalMes6hrs.push(efectividad6hrs);

    }

    // Direcciones
    for (let k = 0; k < direccion.length; k++) {

        let direc = direccion[k];
        let datosDirec = [direc];

        direccionMes6hrs = ["datos6hrs"];
        direccionMes4hrs = ["datos4hrs"];
        direccionMes2hrs = ["datos2hrs"];

        for (let j = 1; j < ultMes; j++) {

            var numerador6hrs = 0,
                numerador4hrs = 0,
                numerador2hrs = 0,
                numeradorGrafica = 0,
                denominador = 0,
                efectividad6hrs = "",
                efectividad4hrs = "",
                efectividad2hrs = "",
                efectividadGrafica = "";

            for (let i = 0; i < datosGeneralesRegion.length; i++) {

                const element = datosGeneralesRegion[i];
                let mes = meses[element[3]] + " " + anio;

                if ((mes == ejeXMeses[j]) && (element[0] == direc)) {

                    numerador2hrs += parseInt(element[8]);
                    numerador4hrs += parseInt(element[7]) - parseInt(element[8]);
                    numerador6hrs += parseInt(element[6]) - parseInt(element[7]);
                    numeradorGrafica += parseInt(element[6]);
                    denominador += parseInt(element[5]);

                }

            }

            efectividad2hrs = (denominador != 0) ? (numerador2hrs / denominador).toFixed(4) : "NA";
            efectividad2hrs = (efectividad2hrs != 0) ? efectividad2hrs : "NA";

            efectividad4hrs = (denominador != 0) ? (numerador4hrs / denominador).toFixed(4) : "NA";
            efectividad4hrs = (efectividad4hrs != 0) ? efectividad4hrs : "NA";

            efectividad6hrs = (denominador != 0) ? (numerador6hrs / denominador).toFixed(4) : "NA";
            efectividad6hrs = (efectividad6hrs != 0) ? efectividad6hrs : "NA";

            efectividadGrafica = (denominador != 0) ? (numeradorGrafica / denominador).toFixed(4) : "NA";
            efectividadGrafica = (efectividadGrafica != 0) ? efectividadGrafica : "NA";

            direccionMes2hrs.push(efectividad2hrs);
            direccionMes4hrs.push(efectividad4hrs);
            direccionMes6hrs.push(efectividad6hrs);
            datosDirec.push(efectividadGrafica);

        }

        direccionMensual[direc] = [direccionMes2hrs, direccionMes4hrs, direccionMes6hrs];
        datosGrafDirMensual[direc] = datosDirec;

    }

    // Regiones
    for (let k = 0; k < region.length; k++) {

        let reg = region[k];
        let datosReg = [reg];

        regionMes2hrs = ["datos2hrs"];
        regionMes4hrs = ["datos4hrs"];
        regionMes6hrs = ["datos6hrs"];

        for (let j = 1; j < ultMes; j++) {

            var numerador6hrs = 0,
                numerador4hrs = 0,
                numerador2hrs = 0,
                numeradorGrafica = 0,
                denominador = 0,
                efectividad6hrs = "",
                efectividad4hrs = "",
                efectividad2hrs = "",
                efectividadGrafica = "";

            for (let i = 0; i < datosGeneralesRegion.length; i++) {

                const element = datosGeneralesRegion[i];
                let mes = meses[element[3]] + " " + anio;

                if ((mes == ejeXMeses[j]) && (element[1] == reg)) {
                    
                    numerador2hrs += parseInt(element[8]);
                    numerador4hrs += parseInt(element[7]) - parseInt(element[8]);
                    numerador6hrs += parseInt(element[6]) - parseInt(element[7]);
                    numeradorGrafica += parseInt(element[6]);
                    denominador += parseInt(element[5]);

                }

            }

            efectividad2hrs = (denominador != 0) ? (numerador2hrs / denominador).toFixed(4) : "NA";
            efectividad2hrs = (efectividad2hrs != 0) ? efectividad2hrs : "NA";

            efectividad4hrs = (denominador != 0) ? (numerador4hrs / denominador).toFixed(4) : "NA";
            efectividad4hrs = (efectividad4hrs != 0) ? efectividad4hrs : "NA";

            efectividad6hrs = (denominador != 0) ? (numerador6hrs / denominador).toFixed(4) : "NA";
            efectividad6hrs = (efectividad6hrs != 0) ? efectividad6hrs : "NA";

            efectividadGrafica = (denominador != 0) ? (numeradorGrafica / denominador).toFixed(4) : "NA";
            efectividadGrafica = (efectividadGrafica != 0) ? efectividadGrafica : "NA";

            regionMes2hrs.push(efectividad2hrs);
            regionMes4hrs.push(efectividad4hrs);
            regionMes6hrs.push(efectividad6hrs);
            datosReg.push(efectividadGrafica);

        }

        regionMensual[reg] = [regionMes2hrs, regionMes4hrs, regionMes6hrs];
        datosGrafRegMensual[reg] = datosReg;

    }

    // Distritos
    for (let k = 0; k < distrito.length; k++) {

        let dis = distrito[k];
        let datosDis = [dis];

        distritoMes2hrs = ["datos2hrs"];
        distritoMes4hrs = ["datos4hrs"];
        distritoMes6hrs = ["datos6hrs"];

        for (let j = 1; j < ultMes; j++) {

            var numerador6hrs = 0,
                numerador4hrs = 0,
                numerador2hrs = 0,
                numeradorGrafica = 0,
                denominador = 0,
                efectividad6hrs = "",
                efectividad4hrs = "",
                efectividad2hrs = "",
                efectividadGrafica = "";

            for (let i = 0; i < datosGeneralesRegion.length; i++) {

                const element = datosGeneralesRegion[i];
                let mes = meses[element[3]] + " " + anio;

                if ((mes == ejeXMeses[j]) && (element[2] == dis)) {

                    numerador2hrs += parseInt(element[8]);
                    numerador4hrs += parseInt(element[7]) - parseInt(element[8]);
                    numerador6hrs += parseInt(element[6]) - parseInt(element[7]);
                    numeradorGrafica += parseInt(element[6]);
                    denominador += parseInt(element[5]);

                }

            }

            efectividad2hrs = (denominador != 0) ? (numerador2hrs / denominador).toFixed(4) : "NA";
            efectividad2hrs = (efectividad2hrs != 0) ? efectividad2hrs : "NA";

            efectividad4hrs = (denominador != 0) ? (numerador4hrs / denominador).toFixed(4) : "NA";
            efectividad4hrs = (efectividad4hrs != 0) ? efectividad4hrs : "NA";

            efectividad6hrs = (denominador != 0) ? (numerador6hrs / denominador).toFixed(4) : "NA";
            efectividad6hrs = (efectividad6hrs != 0) ? efectividad6hrs : "NA";

            efectividadGrafica = (denominador != 0) ? (numeradorGrafica / denominador).toFixed(4) : "NA";
            efectividadGrafica = (efectividadGrafica != 0) ? efectividadGrafica : "NA";

            distritoMes2hrs.push(efectividad2hrs);
            distritoMes4hrs.push(efectividad4hrs);
            distritoMes6hrs.push(efectividad6hrs);
            datosDis.push(efectividadGrafica);

        }

        distritoMensual[dis] = [distritoMes2hrs, distritoMes4hrs, distritoMes6hrs];
        datosGrafDisMensual[dis] = datosDis;

    }

    // Plazas
    for (let k = 0; k < plaza.length; k++) {

        let pla = plaza[k];
        let datosPlaza = [pla];

        plazaMes2hrs = ["datos2hrs"];
        plazaMes4hrs = ["datos4hrs"];
        plazaMes6hrs = ["datos6hrs"];

        for (let j = 1; j < ultMes; j++) {

            var numerador6hrs = 0,
                numerador4hrs = 0,
                numerador2hrs = 0,
                numeradorGrafica = 0,
                denominador = 0,
                efectividad6hrs = "",
                efectividad4hrs = "",
                efectividad2hrs = "",
                efectividadGrafica = "";

            for (let i = 0; i < datosGeneralesPlaza.length; i++) {

                const element = datosGeneralesPlaza[i];
                let mes = meses[element[3]] + " " + anio;

                if ((mes == ejeXMeses[j]) && (element[1] == pla)) {

                    numerador2hrs += parseInt(element[8]);
                    numerador4hrs += parseInt(element[7]) - parseInt(element[8]);
                    numerador6hrs += parseInt(element[6]) - parseInt(element[7]);
                    numeradorGrafica += parseInt(element[6]);
                    denominador += parseInt(element[5]);

                }

            }

            efectividad2hrs = (denominador != 0) ? (numerador2hrs / denominador).toFixed(4) : "NA";
            efectividad2hrs = (efectividad2hrs != 0) ? efectividad2hrs : "NA";

            efectividad4hrs = (denominador != 0) ? (numerador4hrs / denominador).toFixed(4) : "NA";
            efectividad4hrs = (efectividad4hrs != 0) ? efectividad4hrs : "NA";

            efectividad6hrs = (denominador != 0) ? (numerador6hrs / denominador).toFixed(4) : "NA";
            efectividad6hrs = (efectividad6hrs != 0) ? efectividad6hrs : "NA";

            efectividadGrafica = (denominador != 0) ? (numeradorGrafica / denominador).toFixed(4) : "NA";
            efectividadGrafica = (efectividadGrafica != 0) ? efectividadGrafica : "NA";

            plazaMes2hrs.push(efectividad2hrs);
            plazaMes4hrs.push(efectividad4hrs);
            plazaMes6hrs.push(efectividad6hrs);
            datosPlaza.push(efectividadGrafica);

        }

        plazaMensual[pla] = [plazaMes2hrs, plazaMes4hrs, plazaMes6hrs];
        datosGrafPlazaMensual[pla] = datosPlaza;

    }
    
    // Llena el combo Dirección con el listado de las direcciones
    for (let i = 0; i < direccion.length; i++) {
        $("#opcDireccion").append($("<option>", { value: direccion[i], text: direccion[i] }));
    }

}


function dibujaGraficaBarra(idGrafica, ejeX, datos2hrs, datos4hrs, datos6hrs) {

    chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datos2hrs,
                datos4hrs,
                datos6hrs
            ],
            type: "bar",
            // labels: true,
            groups: [
                ["datos2hrs", "datos4hrs", "datos6hrs"]
            ],
            order: null,
            colors: {
                datos2hrs: "#9CDE32",
                datos4hrs: "#437F97",
                datos6hrs: "#FFB30F"
            },
            names: {
                datos2hrs: "De 0 a 2 horas",
                datos4hrs: "De 2 a 4 horas",
                datos6hrs: "De 4 a 6 horas"
            }
        },
        bar: {
            with: {
                ratio: 0.5
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: ejeX,
                tick: {
                    rotate: -90,
                    multiline: false,
                    culling: {
                        max: 40
                    }
                },
                height: 80
            },
            y: {
                tick: {
                    format: d3.format(",.0%")
                }
            }
        },
        zoom: {
            enabled: true
        }

    });

    setTimeout(function () {
        chart.resize();
    }, 300);

}


function dibujaGrafica(idGrafica, datosXGrafica, tipoX, datosYGrafica) {

    chart = c3.generate({
        bindto: idGrafica,
        data: {
            x: tipoX, // "semanas",
            columns: [datosXGrafica, datosYGrafica],
            colors: {
                nacional: "#C70039"
            },
            names: {
                nacional: "NACIONAL"
            }
        },
        point: {
            show: false
        },
        axis: {
            x: {
                type: "category",
                tick: {
                    rotate: -90,
                    multiline: false,
                    culling: {
                        max: 40
                    }
                },
                height: 80
            },
            y: {
                tick: {
                    format: d3.format(",.0%")
                }
            }
        },
        zoom: {
            enabled: true
        }

    });

    setTimeout(function () {
        chart.resize();
    }, 300);

}


function cambioRegionInput() {

    let direccionSelec = $("#opcDireccion").val();

    $("#desDistrito").hide();
    $("#desBtnPresentacion").show();

    $("#opcRegionPlaza").empty().append("<option selected disabled>Seleccionar</option>");

    for (let i = 0; i < direcRegion.length; i++) {

        const element = direcRegion[i];

        if (element[0] == direccionSelec) {
            $("#opcRegionPlaza").append($("<option>", { value: element[1], text: element[1] }));
        }

    }

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        $("#grafica1").html("");

        if ($("#mensual").prop("checked")) {

            for (let i = 0; i < direcRegion.length; i++) {

                const element = direcRegion[i];

                if (element[0] == direccionSelec) {
                    dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < direcRegion.length; i++) {

                const element = direcRegion[i];

                if (element[0] == direccionSelec) {

                    chart.load({
                        columns: [
                            datosGrafRegMensual[element[1]]
                        ]
                    });

                }

            }

        } else if ($("#semanal").prop("checked")) {

            for (let i = 0; i < direcRegion.length; i++) {

                const element = direcRegion[i];

                if (element[0] == direccionSelec) {
                    dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < direcRegion.length; i++) {

                const element = direcRegion[i];

                if (element[0] == direccionSelec) {

                    chart.load({
                        columns: [
                            datosGrafRegSemanal[element[1]]
                        ]
                    });

                }

            }

        }

    }
    
}


function cambioPlazaInput() {

    let direccionSelec = $("#opcDireccion").val();

    $("#desDistrito").hide();
    $("#desBtnPresentacion").show();

    $("#opcRegionPlaza").empty().append("<option selected disabled>Seleccionar</option>");

    for (let i = 0; i < direcPlaza.length; i++) {

        const element = direcPlaza[i];

        if (element[0] == direccionSelec) {
            $("#opcRegionPlaza").append($("<option>", { value: element[1], text: element[1] }));
        }

    }

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        $("#grafica1").html("");

        if ($("#mensual").prop("checked")) {

            for (let i = 0; i < direcPlaza.length; i++) {

                const element = direcPlaza[i];

                if (element[0] == direccionSelec) {
                    dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafPlazaMensual[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < direcPlaza.length; i++) {

                const element = direcPlaza[i];

                if (element[0] == direccionSelec) {

                    chart.load({
                        columns: [
                            datosGrafPlazaMensual[element[1]]
                        ]
                    });

                }

            }

        } else if ($("#semanal").prop("checked")) {

            for (let i = 0; i < direcPlaza.length; i++) {

                const element = direcPlaza[i];

                if (element[0] == direccionSelec) {
                    dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafPlazaSemanal[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < direcPlaza.length; i++) {

                const element = direcPlaza[i];

                if (element[0] == direccionSelec) {

                    chart.load({
                        columns: [
                            datosGrafPlazaSemanal[element[1]]
                        ]
                    });

                }

            }

        }

    }

}


function cambioOpcDireccion(direccionSelec) {

    if (direccionSelec == "NACIONAL") {

        $("#desRegionPlaza").hide();
        $("#desDistrito").hide();
        $("#desBtnPresentacion").show();
        $("#grafica1").html("");

        if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

            if ($("#mensual").prop("checked")) {

                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDirMensual[direccion[0]]);

                for (let i = 1; i < direccion.length; i++) {

                    chart.load({
                        columns: [
                            datosGrafDirMensual[direccion[i]]
                        ]
                    });

                }

            } else if ($("#semanal").prop("checked")) {
                datosDesgNacional();
            }

        } else {

            if ($("#mensual").prop("checked")) {
                dibujaGraficaBarra("#grafica1", ejeXMesesInd, nacionalMes2hrs, nacionalMes4hrs, nacionalMes6hrs);
            } else if ($("#semanal").prop("checked")) {
                dibujaGraficaBarra("#grafica1", ejeXSemInd, nacionalSem2hrs, nacionalSem4hrs, nacionalSem6hrs);
            }

        }

    } else {

        $("#desRegionPlaza").show();
        $("#desDistrito").hide();
        $("#desBtnPresentacion").show();
        $("#grafica1").html("");

        $("#opcRegionPlaza").empty().append("<option selected disabled>Seleccionar</option>");

        // LLenado del combo region-plaza dependiendo la selección
        if ($("#region").prop("checked")) {
            
            for (let i = 0; i < direcRegion.length; i++) {

                const element = direcRegion[i];

                if (element[0] == direccionSelec) {
                    $("#opcRegionPlaza").append($("<option>", { value: element[1], text: element[1] }));
                }

            }

        } else if ($("#plaza").prop("checked")) {
            
            for (let i = 0; i < direcPlaza.length; i++) {

                const element = direcPlaza[i];

                if (element[0] == direccionSelec) {
                    $("#opcRegionPlaza").append($("<option>", { value: element[1], text: element[1] }));
                }

            }

        }

        // Dibuja gráficas
        if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

            if ($("#mensual").prop("checked")) {

                if ($("#region").prop("checked")) {

                    for (let i = 0; i < direcRegion.length; i++) {

                        const element = direcRegion[i];

                        if (element[0] == direccionSelec) {
                            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < direcRegion.length; i++) {

                        const element = direcRegion[i];

                        if (element[0] == direccionSelec) {

                            chart.load({
                                columns: [
                                    datosGrafRegMensual[element[1]]
                                ]
                            });

                        }

                    }


                } else if ($("#plaza").prop("checked")) {

                    for (let i = 0; i < direcPlaza.length; i++) {

                        const element = direcPlaza[i];

                        if (element[0] == direccionSelec) {
                            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafPlazaMensual[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < direcPlaza.length; i++) {

                        const element = direcPlaza[i];

                        if (element[0] == direccionSelec) {

                            chart.load({
                                columns: [
                                    datosGrafPlazaMensual[element[1]]
                                ]
                            });

                        }

                    }

                }

            } else if ($("#semanal").prop("checked")) {

                if ($("#region").prop("checked")) {

                    for (let i = 0; i < direcRegion.length; i++) {

                        const element = direcRegion[i];

                        if (element[0] == direccionSelec) {
                            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < direcRegion.length; i++) {

                        const element = direcRegion[i];

                        if (element[0] == direccionSelec) {

                            chart.load({
                                columns: [
                                    datosGrafRegSemanal[element[1]]
                                ]
                            });

                        }

                    }


                } else if ($("#plaza").prop("checked")) {

                    for (let i = 0; i < direcPlaza.length; i++) {

                        const element = direcPlaza[i];

                        if (element[0] == direccionSelec) {
                            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafPlazaSemanal[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < direcPlaza.length; i++) {

                        const element = direcPlaza[i];

                        if (element[0] == direccionSelec) {

                            chart.load({
                                columns: [
                                    datosGrafPlazaSemanal[element[1]]
                                ]
                            });

                        }

                    }

                }

            }

        } else {

            if ($("#mensual").prop("checked")) {
                dibujaGraficaBarra("#grafica1", ejeXMesesInd, direccionMensual[direccionSelec][0], direccionMensual[direccionSelec][1], direccionMensual[direccionSelec][2]);
            } else if ($("#semanal").prop("checked")) {
                dibujaGraficaBarra("#grafica1", ejeXSemInd, direccionSemanal[direccionSelec][0], direccionSemanal[direccionSelec][1], direccionSemanal[direccionSelec][2]);
            }

        }

    }

}


function cambioOpcRegion(regionSelec) {

    $("#desDistrito").show();
    $("#desBtnPresentacion").show();
    $("#grafica1").html("");

    $("#opcDistrito").empty().append("<option selected disabled>Seleccionar</option>");

    for (let i = 0; i < regDistrito.length; i++) {

        const element = regDistrito[i];

        if (element[0] == regionSelec) {
            $("#opcDistrito").append($("<option>", { value: element[1], text: element[1] }));
        }

    }

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        if ($("#mensual").prop("checked")) {

            for (let i = 0; i < regDistrito.length; i++) {

                const element = regDistrito[i];

                if (element[0] == regionSelec) {
                    dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < regDistrito.length; i++) {

                const element = regDistrito[i];

                if (element[0] == regionSelec) {

                    chart.load({
                        columns: [
                            datosGrafDisMensual[element[1]]
                        ]
                    });

                }

            }

        } else if ($("#semanal").prop("checked")) {

            for (let i = 0; i < regDistrito.length; i++) {

                const element = regDistrito[i];

                if (element[0] == regionSelec) {
                    dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < regDistrito.length; i++) {

                const element = regDistrito[i];

                if (element[0] == regionSelec) {

                    chart.load({
                        columns: [
                            datosGrafDisSemanal[element[1]]
                        ]
                    });

                }

            }

        }

    } else {

        if ($("#mensual").prop("checked")) {
            dibujaGraficaBarra("#grafica1", ejeXMesesInd, regionMensual[regionSelec][0], regionMensual[regionSelec][1], regionMensual[regionSelec][2]);
        } else if ($("#semanal").prop("checked")) {
            dibujaGraficaBarra("#grafica1", ejeXSemInd, regionSemanal[regionSelec][0], regionSemanal[regionSelec][1], regionSemanal[regionSelec][2]);
        }

    }

}


function cambioOpcPlaza(plazaSelec) {

    $("#desDistrito").show();
    $("#desBtnPresentacion").show();
    $("#grafica1").html("");

    $("#opcDistrito").empty().append("<option selected disabled>Seleccionar</option>");

    for (let i = 0; i < plazaDistrito.length; i++) {

        const element = plazaDistrito[i];

        if (element[0] == plazaSelec) {
            $("#opcDistrito").append($("<option>", { value: element[1], text: element[1] }));
        }

    }

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        if ($("#mensual").prop("checked")) {

            for (let i = 0; i < plazaDistrito.length; i++) {

                const element = plazaDistrito[i];

                if (element[0] == plazaSelec) {
                    dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < plazaDistrito.length; i++) {

                const element = plazaDistrito[i];

                if (element[0] == plazaSelec) {

                    chart.load({
                        columns: [
                            datosGrafDisMensual[element[1]]
                        ]
                    });

                }

            }

        } else if ($("#semanal").prop("checked")) {

            for (let i = 0; i < plazaDistrito.length; i++) {

                const element = plazaDistrito[i];

                if (element[0] == plazaSelec) {
                    dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < plazaDistrito.length; i++) {

                const element = plazaDistrito[i];

                if (element[0] == plazaSelec) {

                    chart.load({
                        columns: [
                            datosGrafDisSemanal[element[1]]
                        ]
                    });

                }

            }

        }

    } else {

        if ($("#mensual").prop("checked")) {
            dibujaGraficaBarra("#grafica1", ejeXMesesInd, plazaMensual[plazaSelec][0], plazaMensual[plazaSelec][1], plazaMensual[plazaSelec][2]);
        } else if ($("#semanal").prop("checked")) {
            dibujaGraficaBarra("#grafica1", ejeXSemInd, plazaSemanal[plazaSelec][0], plazaSemanal[plazaSelec][1], plazaSemanal[plazaSelec][2]);
        }

    }

}


function cambioOpcDistrito(distritoSelec) {

    $("#desBtnPresentacion").hide();
    $("#grafica1").html("");

    if ($("#mensual").prop("checked")) {
        dibujaGraficaBarra("#grafica1", ejeXMesesInd, distritoMensual[distritoSelec][0], distritoMensual[distritoSelec][1], distritoMensual[distritoSelec][2]);
    } else if ($("#semanal").prop("checked")) {
        dibujaGraficaBarra("#grafica1", ejeXSemInd, distritoSemanal[distritoSelec][0], distritoSemanal[distritoSelec][1], distritoSemanal[distritoSelec][2]);
    }

}


function cambioMensualInput() {

    let valor = "";
    $("#grafica1").html("");

    if ($("#cambioGrafica")[0].innerHTML == "Mostrar Segmentación") {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGraficaBarra("#grafica1", ejeXMesesInd, distritoMensual[valor][0], distritoMensual[valor][1], distritoMensual[valor][2]);
            } else {

                valor = $("#opcRegionPlaza option:selected").val();

                if ($("#region").prop("checked")) {
                    dibujaGraficaBarra("#grafica1", ejeXMesesInd, regionMensual[valor][0], regionMensual[valor][1], regionMensual[valor][2]);
                } else if ($("#plaza").prop("checked")) {
                    dibujaGraficaBarra("#grafica1", ejeXMesesInd, plazaMensual[valor][0], plazaMensual[valor][1], plazaMensual[valor][2]);
                }

            }

        } else if ($("#desRegionPlaza").is(":visible")) {

            valor = $("#opcRegionPlaza option:selected").val();

            if (valor == "Seleccionar") {
                valor = $("#opcDireccion option:selected").val();
                dibujaGraficaBarra("#grafica1", ejeXMesesInd, direccionMensual[valor][0], direccionMensual[valor][1], direccionMensual[valor][2]);
            }

        } else {
            dibujaGraficaBarra("#grafica1", ejeXMesesInd, nacionalMes2hrs, nacionalMes4hrs, nacionalMes6hrs);
        }

    } else {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor == "Seleccionar") {

                valor = $("#opcRegionPlaza option:selected").val();

                if ($("#region").prop("checked")) {

                    for (let i = 0; i < regDistrito.length; i++) {

                        const element = regDistrito[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < regDistrito.length; i++) {

                        const element = regDistrito[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafDisMensual[element[1]]
                                ]
                            });

                        }

                    }


                } else if ($("#plaza").prop("checked")) {

                    for (let i = 0; i < plazaDistrito.length; i++) {

                        const element = plazaDistrito[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < plazaDistrito.length; i++) {

                        const element = plazaDistrito[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafDisMensual[element[1]]
                                ]
                            });

                        }

                    }

                }

            } else {
                dibujaGraficaBarra("#grafica1", ejeXMesesInd, distritoMensual[valor][0], distritoMensual[valor][1], distritoMensual[valor][2]);
            }

        } else if ($("#desRegionPlaza").is(":visible")) {

            valor = $("#opcRegionPlaza option:selected").val();

            if (valor == "Seleccionar") {
                
                valor = $("#opcDireccion option:selected").val();

                if ($("#region").prop("checked")) {

                    for (let i = 0; i < direcRegion.length; i++) {

                        const element = direcRegion[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < direcRegion.length; i++) {

                        const element = direcRegion[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafRegMensual[element[1]]
                                ]
                            });

                        }

                    }


                } else if ($("#plaza").prop("checked")) {

                    for (let i = 0; i < direcPlaza.length; i++) {

                        const element = direcPlaza[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafPlazaMensual[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < direcPlaza.length; i++) {

                        const element = direcPlaza[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafPlazaMensual[element[1]]
                                ]
                            });

                        }

                    }

                }

            }

        } else {

            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDirMensual[direccion[0]]);

            for (let i = 1; i < direccion.length; i++) {

                chart.load({
                    columns: [
                        datosGrafDirMensual[direccion[i]]
                    ]
                });

            }

        }

    }

}


function cambioSemanalInput() {

    let valor = "";
    $("#grafica1").html("");

    if ($("#cambioGrafica")[0].innerHTML == "Mostrar Segmentación") {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGraficaBarra("#grafica1", ejeXSemInd, distritoSemanal[valor][0], distritoSemanal[valor][1], distritoSemanal[valor][2]);
            } else {

                valor = $("#opcRegionPlaza option:selected").val();

                if ($("#region").prop("checked")) {
                    dibujaGraficaBarra("#grafica1", ejeXSemInd, regionSemanal[valor][0], regionSemanal[valor][1], regionSemanal[valor][2]);
                } else if ($("#plaza").prop("checked")) {
                    dibujaGraficaBarra("#grafica1", ejeXSemInd, plazaSemanal[valor][0], plazaSemanal[valor][1], plazaSemanal[valor][2]);
                }

            }

        } else if ($("#desRegionPlaza").is(":visible")) {

            valor = $("#opcRegionPlaza option:selected").val();

            if (valor == "Seleccionar") {
                valor = $("#opcDireccion option:selected").val();
                dibujaGraficaBarra("#grafica1", ejeXSemInd, direccionSemanal[valor][0], direccionSemanal[valor][1], direccionSemanal[valor][2]);
            }

        } else {
            dibujaGraficaBarra("#grafica1", ejeXSemInd, nacionalSem2hrs, nacionalSem4hrs, nacionalSem6hrs);
        }

    } else {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor == "Seleccionar") {

                valor = $("#opcRegionPlaza option:selected").val();

                if ($("#region").prop("checked")) {

                    for (let i = 0; i < regDistrito.length; i++) {

                        const element = regDistrito[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < regDistrito.length; i++) {

                        const element = regDistrito[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafDisSemanal[element[1]]
                                ]
                            });

                        }

                    }


                } else if ($("#plaza").prop("checked")) {

                    for (let i = 0; i < plazaDistrito.length; i++) {

                        const element = plazaDistrito[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < plazaDistrito.length; i++) {

                        const element = plazaDistrito[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafDisSemanal[element[1]]
                                ]
                            });

                        }

                    }

                }

            } else {
                dibujaGraficaBarra("#grafica1", ejeXSemInd, distritoSemanal[valor][0], distritoSemanal[valor][1], distritoSemanal[valor][2]);
            }

        } else if ($("#desRegionPlaza").is(":visible")) {

            valor = $("#opcRegionPlaza option:selected").val();

            if (valor == "Seleccionar") {

                valor = $("#opcDireccion option:selected").val();

                if ($("#region").prop("checked")) {

                    for (let i = 0; i < direcRegion.length; i++) {

                        const element = direcRegion[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < direcRegion.length; i++) {

                        const element = direcRegion[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafRegSemanal[element[1]]
                                ]
                            });

                        }

                    }


                } else if ($("#plaza").prop("checked")) {

                    for (let i = 0; i < direcPlaza.length; i++) {

                        const element = direcPlaza[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafPlazaSemanal[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < direcPlaza.length; i++) {

                        const element = direcPlaza[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafPlazaSemanal[element[1]]
                                ]
                            });

                        }

                    }

                }

            }

        } else {
            datosDesgNacional();
        }

    }

}


function clickSemanal() {

    let valor = "";

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();
            $("#grafica1").html("");

            if (valor == "Seleccionar") {

                valor = $("#opcRegionPlaza option:selected").val();

                if ($("#region").prop("checked")) {
                    dibujaGraficaBarra("#grafica1", ejeXSemInd, regionSemanal[valor][0], regionSemanal[valor][1], regionSemanal[valor][2]);
                } else if ($("#plaza").prop("checked")) {
                    dibujaGraficaBarra("#grafica1", ejeXSemInd, plazaSemanal[valor][0], plazaSemanal[valor][1], plazaSemanal[valor][2]);
                }

            }

        } else if ($("#desRegionPlaza").is(":visible")) {

            valor = $("#opcRegionPlaza option:selected").val();

            if (valor == "Seleccionar") {
                valor = $("#opcDireccion option:selected").val();
                $("#grafica1").html("");
                dibujaGraficaBarra("#grafica1", ejeXSemInd, direccionSemanal[valor][0], direccionSemanal[valor][1], direccionSemanal[valor][2]);
            }

        } else {
            $("#grafica1").html("");
            dibujaGraficaBarra("#grafica1", ejeXSemInd, nacionalSem2hrs, nacionalSem4hrs, nacionalSem6hrs);
        }

        $("#cambioGrafica")[0].innerHTML = "Mostrar Segmentación";

    } else {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor == "Seleccionar") {

                valor = $("#opcRegionPlaza option:selected").val();

                if ($("#region").prop("checked")) {

                    for (let i = 0; i < regDistrito.length; i++) {

                        const element = regDistrito[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < regDistrito.length; i++) {

                        const element = regDistrito[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafDisSemanal[element[1]]
                                ]
                            });

                        }

                    }


                } else if ($("#plaza").prop("checked")) {

                    for (let i = 0; i < plazaDistrito.length; i++) {

                        const element = plazaDistrito[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < plazaDistrito.length; i++) {

                        const element = plazaDistrito[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafDisSemanal[element[1]]
                                ]
                            });

                        }

                    }

                }

            }

        } else if ($("#desRegionPlaza").is(":visible")) {

            valor = $("#opcRegionPlaza option:selected").val();

            if (valor == "Seleccionar") {
                
                valor = $("#opcDireccion option:selected").val();

                if ($("#region").prop("checked")) {

                    for (let i = 0; i < direcRegion.length; i++) {

                        const element = direcRegion[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < direcRegion.length; i++) {

                        const element = direcRegion[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafRegSemanal[element[1]]
                                ]
                            });

                        }

                    }

                    
                } else if ($("#plaza").prop("checked")) {

                    for (let i = 0; i < direcPlaza.length; i++) {

                        const element = direcPlaza[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafPlazaSemanal[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < direcPlaza.length; i++) {

                        const element = direcPlaza[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafPlazaSemanal[element[1]]
                                ]
                            });

                        }

                    }
                    
                }

            }

        } else {
            datosDesgNacional();
        }

        $("#cambioGrafica")[0].innerHTML = "Ocultar Segmentación";

    }

}


function clickMensual() {

    let valor = "";

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        $("#grafica1").html("");

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor == "Seleccionar") {
                
                valor = $("#opcRegionPlaza option:selected").val();

                if ($("#region").prop("checked")) {
                    dibujaGraficaBarra("#grafica1", ejeXMesesInd, regionMensual[valor][0], regionMensual[valor][1], regionMensual[valor][2]);
                } else if ($("#plaza").prop("checked")) {
                    dibujaGraficaBarra("#grafica1", ejeXMesesInd, plazaMensual[valor][0], plazaMensual[valor][1], plazaMensual[valor][2]);
                }

            }

        } else if ($("#desRegionPlaza").is(":visible")) {

            valor = $("#opcRegionPlaza option:selected").val();

            if (valor == "Seleccionar") {
                valor = $("#opcDireccion option:selected").val();
                $("#grafica1").html("");
                dibujaGraficaBarra("#grafica1", ejeXMesesInd, direccionMensual[valor][0], direccionMensual[valor][1], direccionMensual[valor][2]);
            }

        } else {
            dibujaGraficaBarra("#grafica1", ejeXMesesInd, nacionalMes2hrs, nacionalMes4hrs, nacionalMes6hrs);
        }

        $("#cambioGrafica")[0].innerHTML = "Mostrar Segmentación";

    } else {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor == "Seleccionar") {

                valor = $("#opcRegionPlaza option:selected").val();

                if ($("#region").prop("checked")) {

                    for (let i = 0; i < regDistrito.length; i++) {

                        const element = regDistrito[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < regDistrito.length; i++) {

                        const element = regDistrito[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafDisMensual[element[1]]
                                ]
                            });

                        }

                    }


                } else if ($("#plaza").prop("checked")) {

                    for (let i = 0; i < plazaDistrito.length; i++) {

                        const element = plazaDistrito[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < plazaDistrito.length; i++) {

                        const element = plazaDistrito[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafDisMensual[element[1]]
                                ]
                            });

                        }

                    }

                }

            }

        } else if ($("#desRegionPlaza").is(":visible")) {

            valor = $("#opcRegionPlaza option:selected").val();

            if (valor == "Seleccionar") {
                
                valor = $("#opcDireccion option:selected").val();

                if ($("#region").prop("checked")) {

                    for (let i = 0; i < direcRegion.length; i++) {

                        const element = direcRegion[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < direcRegion.length; i++) {

                        const element = direcRegion[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafRegMensual[element[1]]
                                ]
                            });

                        }

                    }


                } else if ($("#plaza").prop("checked")) {

                    for (let i = 0; i < direcPlaza.length; i++) {

                        const element = direcPlaza[i];

                        if (element[0] == valor) {
                            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafPlazaMensual[element[1]]);
                            break;
                        }

                    }

                    for (let i = 0; i < direcPlaza.length; i++) {

                        const element = direcPlaza[i];

                        if (element[0] == valor) {

                            chart.load({
                                columns: [
                                    datosGrafPlazaMensual[element[1]]
                                ]
                            });

                        }

                    }

                }

            }

        } else {

            $("#grafica1").html("");

            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDirMensual[direccion[0]]);

            for (let i = 1; i < direccion.length; i++) {

                chart.load({
                    columns: [
                        datosGrafDirMensual[direccion[i]]
                    ]
                });

            }

        }

        $("#cambioGrafica")[0].innerHTML = "Ocultar Segmentación";

    }

}


function datosDesgNacional() {

    $("#grafica1").html("");

    dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDirSemanal[direccion[0]]);

    for (let i = 1; i < direccion.length; i++) {

        chart.load({
            columns: [
                datosGrafDirSemanal[direccion[i]]
            ]
        });

    }

}
