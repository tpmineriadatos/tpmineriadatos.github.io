var datosGenerales = [],
    renglones = [],
    direccion = [],
    region = [],
    distrito = [],
    cluster = [],
    mes = [],
    semana = [],
    direcRegion = [],
    regDistrito = [],
    disCluster = [];

var ejeYDatosNacSemanal = ["datos6hrs"],
    ejeYDatosNacMensual = ["datos6hrs"],
    ejeYDatosNacSemanal4 = ["datos4hrs"],
    ejeYDatosNacMensual4 = ["datos4hrs"];
var ejeXSemanas = ["semanas", "Semana 01", "Semana 02", "Semana 03", "Semana 04", "Semana 05",
                    "Semana 06", "Semana 07", "Semana 08", "Semana 09", "Semana 10",
                    "Semana 11", "Semana 12", "Semana 13", "Semana 14", "Semana 15",
                    "Semana 16", "Semana 17", "Semana 18", "Semana 19", "Semana 20",
                    "Semana 21", "Semana 22", "Semana 23", "Semana 24", "Semana 25",
                    "Semana 26", "Semana 27", "Semana 28", "Semana 29", "Semana 30",
                    "Semana 31", "Semana 32", "Semana 33", "Semana 34", "Semana 35",
                    "Semana 36", "Semana 37", "Semana 38", "Semana 39", "Semana 40",
                    "Semana 41", "Semana 42", "Semana 43", "Semana 44", "Semana 45",
                    "Semana 46", "Semana 47", "Semana 48", "Semana 49", "Semana 50",
                    "Semana 51", "Semana 52"],
    ejeXSemInd = ["Semana 01", "Semana 02", "Semana 03", "Semana 04", "Semana 05",
                    "Semana 06", "Semana 07", "Semana 08", "Semana 09", "Semana 10",
                    "Semana 11", "Semana 12", "Semana 13", "Semana 14", "Semana 15",
                    "Semana 16", "Semana 17", "Semana 18", "Semana 19", "Semana 20",
                    "Semana 21", "Semana 22", "Semana 23", "Semana 24", "Semana 25",
                    "Semana 26", "Semana 27", "Semana 28", "Semana 29", "Semana 30",
                    "Semana 31", "Semana 32", "Semana 33", "Semana 34", "Semana 35",
                    "Semana 36", "Semana 37", "Semana 38", "Semana 39", "Semana 40",
                    "Semana 41", "Semana 42", "Semana 43", "Semana 44", "Semana 45",
                    "Semana 46", "Semana 47", "Semana 48", "Semana 49", "Semana 50",
                    "Semana 51", "Semana 52"],
    ejeXMeses = ["meses", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    ejeXMesesInd = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var meses = {"ene": "Enero", "feb": "Febrero", "mar": "Marzo", "abr": "Abril", "may": "Mayo", "jun": "Junio",
                "jul": "Julio", "ago": "Agosto", "sep": "Septiembre", "oct": "Octubre", "nov": "Noviembre", "dic": "Diciembre"
            };

var datosGrafDirSemanal = new Object(),
    datosGrafRegSemanal = new Object(),
    datosGrafDisSemanal = new Object(),
    datosGrafClusSemanal = new Object(),
    datosGrafDirMensual = new Object(),
    datosGrafRegMensual = new Object(),
    datosGrafDisMensual = new Object(),
    datosGrafClusMensual = new Object();

var chart;

var inicio, fin;


$(document).ready(function () {

    inicio = window.performance.now();

    document.getElementById("efectividad").style.backgroundColor = "rgb(31, 77, 155)";

    $("#desRegion").hide();
    $("#desDistrito").hide();
    $("#desCluster").hide();
    $("#desPlaza").hide();
    $("#desBtnPresentacion").show();

    lecturaCSV("fuentes/EfectividadYasa.csv");

    $("#opcDireccion").on("change", function (e) {
        cambioOpcDireccion($("#opcDireccion").val());
    });

    $("#opcRegion").on("change", function (e) {
        cambioOpcRegion($("#opcRegion").val());
    });

    $("#opcDistrito").on("change", function (e) {
        cambioOpcDistrito($("#opcDistrito").val());
    });

    $("#opcCluster").on("change", function (e) {
        cambioOpcCluster($("#opcCluster option:selected").val());
    });

    $("#cambioGrafica").on("click", function (e) {

        if ($("#mensual").prop("checked")) {
            clickMensual();
        } else if ($("#semanal").prop("checked")) {
            clickSemanal();
        } else if ($("#diario").prop("checked")) {
            clickDiario();
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

});


function lecturaCSV(documento) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglones = data.split(/\r\n|\n/);
            renglones = renglones.filter((e, i) => i > 0);

            for (let i = 0; i < renglones.length; i++) {
                datosGenerales.push(renglones[i].split(","));
            }

            llenadoArreglos();

        }

    });

}


function llenadoArreglos() {

    for (let i = 0; i < datosGenerales.length; i++) {

        const element = datosGenerales[i];

        direccion.push(element[0]);
        region.push(element[1]);
        distrito.push(element[2]);
        cluster.push(element[3]);
        mes.push(element[4]);
        semana.push(element[5]);

    }

    const listDist = new Set(direccion);
    const listDist2 = new Set(region);
    const listDist3 = new Set(distrito);
    const listDist4 = new Set(cluster);
    const listDist5 = new Set(mes);
    const listDist6 = new Set(semana);

    direccion = [...listDist];
    region = [...listDist2];
    distrito = [...listDist3];
    cluster = [...listDist4];
    mes = [...listDist5];
    semana = [...listDist6];

    for (let j = 0; j < region.length; j++) {

        let existe = 0;

        for (let i = 0; i < datosGenerales.length; i++) {

            const element = datosGenerales[i];

            if ((element[1] == region[j] && existe == 0)) {
                direcRegion.push([element[0], element[1]]);
                existe++;
            }

        }

    }

    for (let j = 0; j < distrito.length; j++) {

        let existe = 0;

        for (let i = 0; i < datosGenerales.length; i++) {

            const element = datosGenerales[i];

            if ((element[2] == distrito[j] && existe == 0)) {
                regDistrito.push([element[1], element[2]]);
                existe++;
            }

        }

    }

    for (let j = 0; j < cluster.length; j++) {

        let existe = 0;

        for (let i = 0; i < datosGenerales.length; i++) {

            const element = datosGenerales[i];

            if ((element[3] == cluster[j] && existe == 0)) {
                disCluster.push([element[2], element[3]]);
                existe++;
            }

        }

    }

    /**
     * Datos Semanales
     */
    for (let k = 0; k < direccion.length; k++) {

        let direc = direccion[k];
        let datosDirec = [direc];

        for (let j = 1; j < 53; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];

                if ((element[5] == j) && (element[0] == direc)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            efectividad = (efectividad != 0) ? efectividad : "NA";
            datosDirec.push(efectividad);

        }

        datosGrafDirSemanal[direc] = datosDirec;

    }

    for (let k = 0; k < region.length; k++) {

        let reg = region[k];
        let datosReg = [reg];

        for (let j = 1; j < 53; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];

                if ((element[5] == j) && (element[1] == reg)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            efectividad = (efectividad != 0) ? efectividad : "NA";
            datosReg.push(efectividad);

        }

        datosGrafRegSemanal[reg] = datosReg;

    }
    

    /**
     * Datos Mensuales
     */
    for (let k = 0; k < direccion.length; k++) {

        let direc = direccion[k];
        let datosDirec = [direc];

        for (let j = 1; j < ejeXMeses.length; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];
                // let mesDatosGen = element[4];
                let mes = meses[element[4]];

                if ((mes == ejeXMeses[j]) && (element[0] == direc)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            efectividad = (efectividad != 0) ? efectividad : "NA";
            datosDirec.push(efectividad);

        }

        datosGrafDirMensual[direc] = datosDirec;

    }

    for (let k = 0; k < region.length; k++) {

        let reg = region[k];
        let datosReg = [reg];

        for (let j = 1; j < ejeXMeses.length; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];
                // let mesDatosGen = element[5].substr(3, 2);
                let mes = meses[element[4]];

                if ((mes == ejeXMeses[j]) && (element[1] == reg)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            efectividad = (efectividad != 0) ? efectividad : "NA";
            datosReg.push(efectividad);

        }

        datosGrafRegMensual[reg] = datosReg;

    }


    for (let i = 0; i < direccion.length; i++) {
        $("#opcDireccion").append($("<option>", { value: direccion[i], text: direccion[i] }));
    }

    armaDatosGrafica();

}


function armaDatosGrafica() {

    // Datos mensuales nacionales
    for (let j = 1; j < ejeXMeses.length; j++) {

        var numerador = 0,
            denominador = 0,
            numerador4 = 0,
            efectividad = "",
            efectividad4 = "";

        for (let i = 0; i < datosGenerales.length; i++) {

            const element = datosGenerales[i];
            // let mesDatosGen = element[4];
            let mes = meses[element[4]];

            if (mes == ejeXMeses[j]) {
                denominador += parseInt(element[6]);
                numerador += parseInt(element[7]);
                numerador4 += parseInt(element[8]);
            }

        }

        // console.log(ejeXMeses[j], numerador, denominador);

        efectividad = (denominador != 0) ? (numerador / denominador).toFixed(4) : "NA";
        efectividad = (efectividad != 0) ? efectividad : "NA";
        efectividad4 = (denominador != 0) ? (numerador4 / denominador).toFixed(4) : "NA";
        efectividad4 = (efectividad4 != 0) ? efectividad4 : "NA";

        ejeYDatosNacMensual.push(efectividad);
        ejeYDatosNacMensual4.push(efectividad4);

    }

    // Datos semanales nacionales
    for (let j = 1; j < 53; j++) {

        var numerador = 0,
            numerador4 = 0,
            denominador = 0,
            efectividad = "",
            efectividad4 = "";

        for (let i = 0; i < datosGenerales.length; i++) {

            const element = datosGenerales[i];

            if ((element[5] == j) && (element[9] == element[10])) {
                denominador += parseInt(element[6]);
                numerador += parseInt(element[7]);
                numerador4 += parseInt(element[8]);
            }

        }

        efectividad = (denominador != 0) ? (numerador / denominador).toFixed(4) : "NA";
        efectividad = (efectividad != 0) ? efectividad : "NA";
        efectividad4 = (denominador != 0) ? (numerador4 / denominador).toFixed(4) : "NA";
        efectividad4 = (efectividad4 != 0) ? efectividad4 : "NA";

        ejeYDatosNacSemanal.push(efectividad);
        ejeYDatosNacSemanal4.push(efectividad4);

    }

    // dibujaGrafica("#grafica1", ejeXSemanas, "semanas", ejeYDatosNacSemanal);
    dibujaGraficaBarra("#grafica1", ejeXSemInd, ejeYDatosNacSemanal4, ejeYDatosNacSemanal);

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


function grafSoloNacional() {

    chart.load({
        columns: [
            ejeYDatosNacSemanal
        ]
    });

    for (let i = 0; i < direccion.length; i++) {

        chart.unload({
            ids: direccion[i]
        });

    }

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

    fin = window.performance.now();

    console.log((fin - inicio) + " mseg");

}


function dibujaGraficaBarra(idGrafica, ejeX, datos4hrs, datos6hrs) {

    chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datos4hrs,
                datos6hrs
            ],
            type: "bar",
            groups: [
                ["datos4hrs", "datos6hrs"]
            ],
            order: null,
            colors: {
                datos4hrs: "#1E78B6",
                datos6hrs: "#FF7E10"
            },
            names: {
                datos4hrs: "Menor a 4 horas",
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
                    format: d3.format(",.2%")
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


function cambioOpcDireccion(direccionSelec) {

    if (direccionSelec == "NACIONAL") {

        $("#desRegion").hide();
        $("#desDistrito").hide();
        $("#desCluster").hide();
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

                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDirSemanal[direccion[0]]);

                for (let i = 1; i < direccion.length; i++) {

                    chart.load({
                        columns: [
                            datosGrafDirSemanal[direccion[i]]
                        ]
                    });

                }

            } else if ($("#diario").prop("checked")) {

                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDirDiario[direccion[0]]);

                for (let i = 1; i < direccion.length; i++) {

                    chart.load({
                        columns: [
                            datosGrafDirDiario[direccion[i]]
                        ]
                    });

                }

            }

        } else {

            if ($("#mensual").prop("checked")) {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", ejeYDatosNacMensual);
            } else if ($("#semanal").prop("checked")) {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", ejeYDatosNacSemanal);
            } else if ($("#diario").prop("checked")) {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", ejeYDatosNacDiario);
            }

        }

    } else {

        $("#opcRegion").empty().append("<option selected disabled>Seleccionar</option>");
        $("#opcPlaza").empty().append("<option selected disabled>Seleccionar</option>");

        for (let i = 0; i < direcRegion.length; i++) {

            const element = direcRegion[i];

            if (element[0] == direccionSelec) {
                $("#opcRegion").append($("<option>", { value: element[1], text: element[1] }));
            }

        }

        // Cambiar por el listado de las plazas
        for (let i = 0; i < direcRegion.length; i++) {

            const element = direcRegion[i];

            if (element[0] == direccionSelec) {
                $("#opcPlaza").append($("<option>", { value: element[1], text: element[1] }));
            }

        }

        $("#desRegion").show();
        $("#desPlaza").show();
        $("#desDistrito").hide();
        $("#desCluster").hide();
        $("#desBtnPresentacion").show();

        $("#grafica1").html("");

        if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

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

            } else if ($("#diario").prop("checked")) {

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == direccionSelec) {
                        dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == direccionSelec) {

                        chart.load({
                            columns: [
                                datosGrafRegDiario[element[1]]
                            ]
                        });

                    }

                }

            }

        } else {

            if ($("#mensual").prop("checked")) {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDirMensual[direccionSelec]);
            } else if ($("#semanal").prop("checked")) {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDirSemanal[direccionSelec]);
            } else if ($("#diario").prop("checked")) {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDirDiario[direccionSelec]);
            }

        }

    }

}


function cambioOpcRegion(regionSelec) {

    datosGrafDisSemanal = new Object();
    datosGrafDisMensual = new Object();
    datosGrafDisDiario = new Object();

    for (let k = 0; k < regDistrito.length; k++) {

        const element = regDistrito[k];

        if (element[0] == regionSelec) {
            
            let dis = element[1];
            let datosDis = [dis];

            for (let j = 1; j < 53; j++) {

                var numerador = 0,
                    denominador = 0,
                    efectividad = "";

                for (let i = 0; i < datosGenerales.length; i++) {

                    const element = datosGenerales[i];

                    if ((element[4] == j) && (element[2] == dis)) {
                        numerador += parseInt(element[7]);
                        denominador += parseInt(element[6]);
                    }

                }

                efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
                efectividad = (efectividad != 0) ? efectividad : "NA";
                datosDis.push(efectividad);

            }

            datosGrafDisSemanal[dis] = datosDis;
            
        }

    }

    for (let k = 0; k < regDistrito.length; k++) {

        const element = regDistrito[k];

        if (element[0] == regionSelec) {

            let dis = element[1];
            let datosDis = [dis];

            for (let j = 1; j < ejeXMeses.length; j++) {

                var numerador = 0,
                    denominador = 0,
                    efectividad = "";

                for (let i = 0; i < datosGenerales.length; i++) {

                    const element = datosGenerales[i];
                    let mesDatosGen = element[5].substr(3, 2);
                    let mes = meses[mesDatosGen];

                    if ((mes == ejeXMeses[j]) && (element[2] == dis)) {
                        numerador += parseInt(element[7]);
                        denominador += parseInt(element[6]);
                    }

                }

                efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
                efectividad = (efectividad != 0) ? efectividad : "NA";
                datosDis.push(efectividad);

            }

            datosGrafDisMensual[dis] = datosDis;
        
        }

    }

    // for (let k = 0; k < regDistrito.length; k++) {

    //     const element = regDistrito[k];

    //     if (element[0] == regionSelec) {

    //         let dis = element[1];
    //         let datosDis = [dis];

    //         for (let j = 1; j < ejeXDiario.length; j++) {

    //             var numerador = 0,
    //                 denominador = 0,
    //                 efectividad = "";

    //             for (let i = 0; i < datosGenerales.length; i++) {

    //                 const element = datosGenerales[i];

    //                 if ((element[5] == ejeXDiario[j]) && (element[2] == dis)) {
    //                     numerador += parseInt(element[7]);
    //                     denominador += parseInt(element[6]);
    //                 }

    //             }

    //             efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
    //             efectividad = (efectividad != 0) ? efectividad : "NA";
    //             datosDis.push(efectividad);

    //         }

    //         datosGrafDisDiario[dis] = datosDis;

    //     }

    // }


    $("#opcDistrito").empty().append("<option selected disabled>Seleccionar</option>");

    for (let i = 0; i < regDistrito.length; i++) {

        const element = regDistrito[i];

        if (element[0] == regionSelec) {
            $("#opcDistrito").append($("<option>", { value: element[1], text: element[1] }));
        }

    }

    $("#desDistrito").show();
    $("#desCluster").hide();
    $("#desBtnPresentacion").show();

    $("#grafica1").html("");

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

        } else if ($("#diario").prop("checked")) {

            for (let i = 0; i < regDistrito.length; i++) {

                const element = regDistrito[i];

                if (element[0] == regionSelec) {
                    dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDisDiario[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < regDistrito.length; i++) {

                const element = regDistrito[i];

                if (element[0] == regionSelec) {

                    chart.load({
                        columns: [
                            datosGrafDisDiario[element[1]]
                        ]
                    });

                }

            }

        }



    } else {

        if ($("#mensual").prop("checked")) {
            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[regionSelec]);
        } else if ($("#semanal").prop("checked")) {
            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[regionSelec]);
        } else if ($("#diario").prop("checked")) {
            dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[regionSelec]);
        }

    }

}


function cambioOpcDistrito(distritoSelec) {

    datosGrafClusSemanal = new Object();
    datosGrafClusMensual = new Object();
    datosGrafClusDiario = new Object();

    for (let k = 0; k < disCluster.length; k++) {

        const element = disCluster[k];

        if (element[0] == distritoSelec) {

            let clus = element[1];
            let datosClus = [clus];

            for (let j = 1; j < 53; j++) {

                var numerador = 0,
                    denominador = 0,
                    efectividad = "";

                for (let i = 0; i < datosGenerales.length; i++) {

                    const element = datosGenerales[i];

                    if ((element[4] == j) && (element[3] == clus)) {
                        numerador += parseInt(element[7]);
                        denominador += parseInt(element[6]);
                    }

                }

                efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
                efectividad = (efectividad != 0) ? efectividad : "NA";
                datosClus.push(efectividad);

            }

            datosGrafClusSemanal[clus] = datosClus;

        }

    }

    for (let k = 0; k < disCluster.length; k++) {

        const element = disCluster[k];

        if (element[0] == distritoSelec) {

            let clus = element[1];
            let datosClus = [clus];

            for (let j = 1; j < ejeXMeses.length; j++) {

                var numerador = 0,
                    denominador = 0,
                    efectividad = "";

                for (let i = 0; i < datosGenerales.length; i++) {

                    const element = datosGenerales[i];
                    let mesDatosGen = element[5].substr(3, 2);
                    let mes = meses[mesDatosGen];

                    if ((mes == ejeXMeses[j]) && (element[3] == clus)) {
                        numerador += parseInt(element[7]);
                        denominador += parseInt(element[6]);
                    }

                }

                efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
                efectividad = (efectividad != 0) ? efectividad : "NA";
                datosClus.push(efectividad);

            }

            datosGrafClusMensual[clus] = datosClus;

        }

    }

    // for (let k = 0; k < disCluster.length; k++) {

    //     const element = disCluster[k];

    //     if (element[0] == distritoSelec) {

    //         let clus = element[1];
    //         let datosClus = [clus];

    //         for (let j = 1; j < ejeXDiario.length; j++) {

    //             var numerador = 0,
    //                 denominador = 0,
    //                 efectividad = "";

    //             for (let i = 0; i < datosGenerales.length; i++) {

    //                 const element = datosGenerales[i];

    //                 if ((element[5] == ejeXDiario[j]) && (element[3] == clus)) {
    //                     numerador += parseInt(element[7]);
    //                     denominador += parseInt(element[6]);
    //                 }

    //             }

    //             efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
    //             datosClus.push(efectividad);

    //         }

    //         datosGrafClusDiario[clus] = datosClus;

    //     }

    // }


    $("#opcCluster").empty().append("<option selected disabled>Seleccionar</option>");

    for (let i = 0; i < disCluster.length; i++) {

        const element = disCluster[i];

        if (element[0] == distritoSelec) {
            $("#opcCluster").append($("<option>", { value: element[1], text: element[1] }));
        }

    }

    $("#desCluster").show();
    $("#desBtnPresentacion").show();

    $("#grafica1").html("");

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        if ($("#mensual").prop("checked")) {

            for (let i = 0; i < disCluster.length; i++) {

                const element = disCluster[i];

                if (element[0] == distritoSelec) {
                    dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafClusMensual[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < disCluster.length; i++) {

                const element = disCluster[i];

                if (element[0] == distritoSelec) {

                    chart.load({
                        columns: [
                            datosGrafClusMensual[element[1]]
                        ]
                    });

                }

            }

        } else if ($("#semanal").prop("checked")) {

            for (let i = 0; i < disCluster.length; i++) {

                const element = disCluster[i];

                if (element[0] == distritoSelec) {
                    dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafClusSemanal[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < disCluster.length; i++) {

                const element = disCluster[i];

                if (element[0] == distritoSelec) {

                    chart.load({
                        columns: [
                            datosGrafClusSemanal[element[1]]
                        ]
                    });

                }

            }

        } else if ($("#diario").prop("checked")) {

            for (let i = 0; i < disCluster.length; i++) {

                const element = disCluster[i];

                if (element[0] == distritoSelec) {
                    dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafClusDiario[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < disCluster.length; i++) {

                const element = disCluster[i];

                if (element[0] == distritoSelec) {

                    chart.load({
                        columns: [
                            datosGrafClusDiario[element[1]]
                        ]
                    });

                }

            }

        }

    } else {

        if ($("#mensual").prop("checked")) {
            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[distritoSelec]);
        } else if ($("#semanal").prop("checked")) {
            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[distritoSelec]);
        } else if ($("#diario").prop("checked")) {
            dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDisDiario[distritoSelec]);
        }

    }

}


function cambioOpcCluster(clusterSelec) {

    $("#desBtnPresentacion").hide();
    $("#grafica1").html("");

    if ($("#mensual").prop("checked")) {
        dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafClusMensual[clusterSelec]);
    } else if ($("#semanal").prop("checked")) {
        dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafClusSemanal[clusterSelec]);
    } else if ($("#diario").prop("checked")) {
        dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafClusDiario[clusterSelec]);
    }

}


function cambioSemanalInput() {

    let valor = "";
    $("#grafica1").html("");

    if ($("#cambioGrafica")[0].innerHTML == "Mostrar Segmentación") {

        if ($("#desCluster").is(":visible")) {

            valor = $("#opcCluster option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafClusSemanal[valor]);
            } else {
                valor = $("#opcDistrito option:selected").val();
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[valor]);
            }

        } else if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[valor]);
            } else {
                valor = $("#opcRegion option:selected").val();
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[valor]);
            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[regionSelec]);
            } else {
                valor = $("#opcDireccion option:selected").val();
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDirSemanal[valor]);
            }

        } else {
            // dibujaGrafica("#grafica1", ejeXSemanas, "semanas", ejeYDatosNacSemanal);
            dibujaGraficaBarra("#grafica1", ejeXSemInd, ejeYDatosNacSemanal4, ejeYDatosNacSemanal);
        }

    } else {

        if ($("#desCluster").is(":visible")) {

            valor = $("#opcCluster option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafClusSemanal[valor]);
            } else {

                valor = $("#opcDistrito option:selected").val();
                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafClusSemanal[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusSemanal[element[1]]
                            ]
                        });

                    }

                }

            }

        } else if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafClusSemanal[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusSemanal[element[1]]
                            ]
                        });

                    }

                }

            } else {

                valor = $("#opcRegion option:selected").val();

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

            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Región");
            } else {

                valor = $("#opcDireccion option:selected").val();

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

            }

        } else {

            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDirSemanal[direccion[0]]);

            for (let i = 1; i < direccion.length; i++) {

                chart.load({
                    columns: [
                        datosGrafDirSemanal[direccion[i]]
                    ]
                });

            }

        }

    }

}


function cambioMensualInput() {

    let valor = "";
    $("#grafica1").html("");

    if ($("#cambioGrafica")[0].innerHTML == "Mostrar Segmentación") {

        if ($("#desCluster").is(":visible")) {

            valor = $("#opcCluster option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafClusMensual[valor]);
            } else {
                valor = $("#opcDistrito option:selected").val();
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[valor]);
            }

        } else if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Distrito");
            } else {
                valor = $("#opcRegion option:selected").val();
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[valor]);
            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[valor]);
            } else {
                valor = $("#opcDireccion option:selected").val();
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDirMensual[valor]);
            }

        } else {
            // dibujaGrafica("#grafica1", ejeXMeses, "meses", ejeYDatosNacMensual);
            dibujaGraficaBarra("#grafica1", ejeXMesesInd, ejeYDatosNacMensual4, ejeYDatosNacMensual);
        }

    } else {

        if ($("#desCluster").is(":visible")) {

            valor = $("#opcCluster option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafClusMensual[valor]);
            } else {

                valor = $("#opcDistrito option:selected").val();

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafClusMensual[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusMensual[element[1]]
                            ]
                        });

                    }

                }

            }

        } else if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Distrito");
            } else {

                valor = $("#opcRegion option:selected").val();

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

            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Región");
            } else {

                valor = $("#opcDireccion option:selected").val();

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


function cambioDiarioInput() {

    let valor = "";
    $("#grafica1").html("");

    if ($("#cambioGrafica")[0].innerHTML == "Mostrar Segmentación") {

        if ($("#desCluster").is(":visible")) {

            valor = $("#opcCluster option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafClusDiario[valor]);
            } else {
                valor = $("#opcDistrito option:selected").val();
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDisDiario[valor]);
            }

        } else if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Distrito");
            } else {
                valor = $("#opcRegion option:selected").val();
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[valor]);
            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[valor]);
            } else {
                valor = $("#opcDireccion option:selected").val();
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDirDiario[valor]);
            }

        } else {
            dibujaGrafica("#grafica1", ejeXDiario, "diario", ejeYDatosNacDiario);
        }

    } else {

        if ($("#desCluster").is(":visible")) {

            valor = $("#opcCluster option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafClusDiario[valor]);
            } else {

                valor = $("#opcDistrito option:selected").val();

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafClusDiario[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusDiario[element[1]]
                            ]
                        });

                    }

                }

            }

        } else if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Distrito");
            } else {

                valor = $("#opcRegion option:selected").val();

                for (let i = 0; i < regDistrito.length; i++) {

                    const element = regDistrito[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDisDiario[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < regDistrito.length; i++) {

                    const element = regDistrito[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafDisDiario[element[1]]
                            ]
                        });

                    }

                }

            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Región");
            } else {

                valor = $("#opcDireccion option:selected").val();

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafRegDiario[element[1]]
                            ]
                        });

                    }

                }

            }

        } else {

            dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDirDiario[direccion[0]]);

            for (let i = 1; i < direccion.length; i++) {

                chart.load({
                    columns: [
                        datosGrafDirDiario[direccion[i]]
                    ]
                });

            }

        }

    }

}


function clickSemanal() {

    let valor = "";

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();
            $("#grafica1").html("");

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[valor]);
            } else {
                valor = $("#opcRegion option:selected").val();
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[valor]);
            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                $("#grafica1").html("");
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[regionSelec]);
            } else {

                valor = $("#opcDireccion option:selected").val();

                $("#grafica1").html("");

                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDirSemanal[valor]);

            }

        } else {
            $("#grafica1").html("");
            dibujaGraficaBarra("#grafica1", ejeXSemInd, ejeYDatosNacSemanal4, ejeYDatosNacSemanal);
        }

        $("#cambioGrafica")[0].innerHTML = "Mostrar Segmentación";

    } else {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusSemanal[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            } else {

                valor = $("#opcRegion option:selected").val();

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

                chart.unload({
                    ids: valor
                });

            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Región");
            } else {

                valor = $("#opcDireccion option:selected").val();

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

                chart.unload({
                    ids: valor
                });

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

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[valor]);
            } else {
                valor = $("#opcRegion option:selected").val();
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[valor]);
            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[valor]);
            } else {
                valor = $("#opcDireccion option:selected").val();
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDirMensual[valor]);
            }

        } else {
            // dibujaGrafica("#grafica1", ejeXMeses, "meses", ejeYDatosNacMensual);
            dibujaGraficaBarra("#grafica1", ejeXMesesInd, ejeYDatosNacMensual4, ejeYDatosNacMensual);
        }

        $("#cambioGrafica")[0].innerHTML = "Mostrar Segmentación";

    } else {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusMensual[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            } else {

                valor = $("#opcRegion option:selected").val();

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

                chart.unload({
                    ids: valor
                });

            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Región");
            } else {

                valor = $("#opcDireccion option:selected").val();

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

                chart.unload({
                    ids: valor
                });

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


function clickDiario() {

    let valor = "";

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        $("#grafica1").html("");

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDisDiario[valor]);
            } else {
                valor = $("#opcRegion option:selected").val();
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[valor]);
            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[valor]);
            } else {
                valor = $("#opcDireccion option:selected").val();
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDirDiario[valor]);
            }

        } else {
            dibujaGrafica("#grafica1", ejeXDiario, "diario", ejeYDatosNacDiario);
        }

        $("#cambioGrafica")[0].innerHTML = "Mostrar Segmentación";

    } else {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusDiario[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            } else {

                valor = $("#opcRegion option:selected").val();

                for (let i = 0; i < regDistrito.length; i++) {

                    const element = regDistrito[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafDisDiario[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Región");
            } else {

                valor = $("#opcDireccion option:selected").val();

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafRegDiario[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            }

        } else {

            for (let i = 0; i < direccion.length; i++) {

                chart.load({
                    columns: [
                        datosGrafDirDiario[direccion[i]]
                    ]
                });

            }

            chart.unload({
                ids: "nacional"
            });

        }

        $("#cambioGrafica")[0].innerHTML = "Ocultar Segmentación";

    }

}
