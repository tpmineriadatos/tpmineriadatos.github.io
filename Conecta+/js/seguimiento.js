var datosCompletosSeg = [],
    renglonesSeg = [],
    datosCompletosCos = [],
    renglonesCos = [],
    datosCompletosCosTar = [],
    renglonesCosTar = [],
    datosCompletosCosTec = [],
    renglonesCosTec = [],
    datosCosTec = [],
    datosTecnicoCos = [];

var nacionalSeg = [],
    direccionSeg = [],
    plazaSeg = [],
    distritoSeg = [];

var semAnioSeg = [],
    tecnicosSemana = [],
    tecnicosSemanaDesc = [];

var semanaSeleccionada = "";


$("#seguimiento").click(function () {
    document.getElementById("productividad").style.backgroundColor = "rgb(63, 124, 191)";
    document.getElementById("reincidencias").style.backgroundColor = "rgb(63, 124, 191)";
    document.getElementById("seguimiento").style.backgroundColor = "rgb(31, 77, 155)";
});

$("#segIndicadores").click(function() {

    let valor = "",
        segmento = "",
        seleccion = "";

    // document.getElementById("productividad").style.backgroundColor = "rgb(63, 124, 191)";
    // document.getElementById("reincidencias").style.backgroundColor = "rgb(63, 124, 191)";
    // document.getElementById("seguimiento").style.backgroundColor = "rgb(31, 77, 155)";

    $("#divSeguimiento").show();
    $("#imgConecta").show();

    if (selecProductividad == 1) {
        
        valor = $("#opcDireccion option:selected").val();
        segmento = "direccion";
        seleccion = valor;

        $("#divTabla").hide();
        $("#divAct").hide();
        $("#kpiTodos").hide();
        $("#segundoNivel").hide();
        $("#kpiSegundoNivel").hide();
        $("#desDistrito").hide();
        $("#lblOpcPlaza").html("Plaza");

        if (valor != "NACIONAL") {

            $("#desPlaza").show();
            $("#opcPlaza").empty();
            $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

            llenaListasPlaza(valor);

        } else {
            $("#desPlaza").hide();
        }

    } else if (((selecReincidencias == 1) && (selecTR == 0)) || cosecha == 1) {

        $("#desDireccion").show();
        $("#tablaReincidencias").hide();
        $("#divReinTitulo").hide();
        $("#combosCosecha").hide();
        $("#divCosecha").hide();

        valor = $("#opcDireccion option:selected").val();
        segmento = "direccion";
        seleccion = valor;

        if (valor != "NACIONAL") {

            $("#desPlaza").show();
            $("#opcPlaza").empty();
            $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

            llenaListasPlaza(valor);

        } else {
            $("#desPlaza").hide();
        }
        
    } else if ((selecReincidencias == 1) && (selecTR == 1)) {

        $("#divGrafReincidencias").hide();

        if (($("#desDistrito").is(":visible")) && ($("#opcDistrito option:selected").val() != "Seleccionar")) {
            segmento = "distrito";
            seleccion = $("#opcDistrito option:selected").val();
        } else if (($("#desPlaza").is(":visible")) && ($("#opcPlaza option:selected").val() != "Seleccionar")) {
            segmento = "plaza";
            seleccion = $("#opcPlaza option:selected").val();
        } else {
            segmento = "direccion";
            seleccion = $("#opcDireccion option:selected").val();;
        }

    }

    // Coloca bandera de locación
    selecProductividad = 0;
    selecReincidencias = 0;
    selecTR = 0;
    seguimiento = 1;
    cosecha = 0;

    // console.log(segmento, seleccion);

    lecturaSeg("fuentes/TicketRepetidoSemanal.csv", segmento, seleccion);
    lecturaRetro("fuentes/Retroalimentacion.csv", segmento, seleccion);
    lecturaCapa("fuentes/Capacitacion.csv", segmento, seleccion);
    lecturaCMCC("fuentes/CursosCCMC.csv", segmento, seleccion);
    lecturaDetalle("fuentes/DetalleCursos.csv", segmento, seleccion);
    lecturaTopDist("fuentes/TopSupMejores.csv", segmento, seleccion);
    lecturaTopSuper("fuentes/TopSupPeores.csv", segmento, seleccion);
    lecturaTarjTR("fuentes/TarjetasTR.csv", segmento, seleccion);

});

$("#segCosecha").click(function() {

    $("#divTabla").hide();
    $("#divAct").hide();
    $("#desDireccion").hide();
    $("#desPlaza").hide();
    $("#desDistrito").hide();
    $("#kpiTodos").hide();
    $("#segundoNivel").hide();
    $("#kpiSegundoNivel").hide();
    $("#divSeguimiento").hide();
    $("#imgConecta").show();
    $("#tablaReincidencias").hide();
    $("#divReinTitulo").hide();
    $("#divGrafReincidencias").hide();
    $("#tituloReincidencias").hide();
    $("#combosCosecha").show();
    $("#divCosecha").show();
    $("#graficasCosecha").show();
    $("#graficasTecnicos").hide();

    // Coloca bandera de locación
    selecProductividad = 0;
    selecReincidencias = 0;
    selecTR = 0;
    seguimiento = 0;
    cosecha = 1;

    lecturaCos("fuentes/historicoReincidencias.csv");
    // lecturaCosTar("fuentes/historicoTarjetas.csv");

});


// Manejo de combos para Cosecha
$("#opcSemana").on("change", function (event) {

    semanaSeleccionada = $("#opcSemana option:selected").val();

    $("#graficasCosecha").show();
    $("#graficasTecnicos").hide();
    $("#opcTecnico option:first").prop("selected", true);

    selecSemanaCosecha(semanaSeleccionada);
    selecSemanaCosechaTar(semanaSeleccionada);

});

$("#opcDistritoCos").on("change", function (event) {

    distritoSeleccionado = $("#opcDistritoCos option:selected").val();

    $("#graficasCosecha").show();
    $("#graficasTecnicos").hide();

    selecDistritoCos(distritoSeleccionado);

    // $("#graficasCosecha").show();
    // $("#graficasTecnicos").hide();
    // $("#opcTecnico option:first").prop("selected", true);

    // selecSemanaCosecha(semanaSeleccionada);
    // selecSemanaCosechaTar(semanaSeleccionada);

});

$("#opcTecnico").on("change", function (event) {

    let tecnicoSeleccionado = $("#opcTecnico option:selected").val();

    if (tecnicoSeleccionado == "TODOS") {
        $("#graficasCosecha").show();
        $("#graficasTecnicos").hide();
    } else {
        selecTecnico(tecnicoSeleccionado);
        $("#graficasCosecha").hide();
        $("#graficasTecnicos").show();
    }

});


function lecturaSeg(documento, segmento, seleccion) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesSeg = data.split(/\r\n|\n/);
            renglonesSeg = renglonesSeg.filter((e, i) => i > 0);
            renglonesSeg = renglonesSeg.filter((e, i) => i < (renglonesSeg.length - 1));
            datosCompletosSeg.length = 0;

            for (let i = 0; i < renglonesSeg.length; i++) {
                const element = renglonesSeg[i].split(",");
                datosCompletosSeg.push(element);
            }

            llenaInfoSeg(segmento, seleccion);

        }

    });

}


function llenaInfoSeg(segmento, seleccion) {

    // let valor = $("#opcDireccion option:selected").val();

    semAnioSeg = [];
    direccionSeg = [];
    plazaSeg = [];
    distritoSeg = [];

    for (let i = 0; i < datosCompletosSeg.length; i++) {
        const element = datosCompletosSeg[i];
        // listadoSeg.push(element[1]);
        semAnioSeg.push(element[7]);
    }

    // const listDist1 = new Set(listadoSeg);
    const listDist2 = new Set(semAnioSeg);

    // listadoSeg = [...listDist1];
    semAnioSeg = [...listDist2];

    // listadoSeg.sort();
    semAnioSeg.sort();

    for (let i = 0; i < datosCompletosSeg.length; i++) {

        const element = datosCompletosSeg[i];

        if (element[0] == "NACIONAL") {
            // nacionalSeg.push([element[1], element[4], element[6]]);
            direccionSeg.push([element[1], element[4], element[6]]);
        } else if (element[0] == "DIRECCION") {
            direccionSeg.push([element[1], element[4], element[6]]);
        } else if (element[0] == "PLAZA") {
            plazaSeg.push([element[1], element[4], element[6]]);
        } else if (element[0] == "DISTRITO") {
            distritoSeg.push([element[1], element[4], element[6]]);
        }

    }

    if (segmento == "direccion") {
        selecDirecSeg(seleccion);
    } else if (segmento == "plaza") {
        selecPlazaSeg(seleccion);
    } else {
        selecDistSeg(seleccion);
    }

}


function selecDirecSeg(direccion) {

    let datosYOrdenes = ["numOrdenes"],
        datosYTR = ["porcTicketRepetido"];
    
    for (let i = 0; i < direccionSeg.length; i++) {

        const element = direccionSeg[i];

        if (element[0] == direccion) {
            datosYOrdenes.push(element[1]);
            datosYTR.push(element[2]);
        }

    }

    graficaTRSemanal("#grafTRS", datosYOrdenes, datosYTR);

}


function selecPlazaSeg(plaza) {

    let datosYOrdenes = ["numOrdenes"],
        datosYTR = ["porcTicketRepetido"];

    for (let i = 0; i < plazaSeg.length; i++) {

        const element = plazaSeg[i];

        if (element[0] == plaza) {
            datosYOrdenes.push(element[1]);
            datosYTR.push(element[2]);
        }

    }

    graficaTRSemanal("#grafTRS", datosYOrdenes, datosYTR);

}


function selecDistSeg(distrito) {

    let datosYOrdenes = ["numOrdenes"],
        datosYTR = ["porcTicketRepetido"];

    for (let i = 0; i < distritoSeg.length; i++) {

        const element = distritoSeg[i];

        if (element[0] == distrito) {
            datosYOrdenes.push(element[1]);
            datosYTR.push(element[2]);
        }

    }

    graficaTRSemanal("#grafTRS", datosYOrdenes, datosYTR);

}


function graficaTRSemanal(idGrafica, datosNumOrdenes, datosTicketRepetido) {

    let optimos = datosTicketRepetido.filter((e, i) => i > 0);
    let maxY2 = Math.max(...optimos),
        minY2 = Math.min(...optimos),
        maxEjeY2 = parseFloat(maxY2.toFixed(1)),
        minEjeY2 = parseFloat(minY2.toFixed(1));

    maxEjeY2 += (maxEjeY2 > maxY2) ? 0 : 0.1;
    minEjeY2 -= (minEjeY2 < minY2) ? 0 : 0.1;

    maxEjeY2 = parseFloat(maxEjeY2.toFixed(1));
    minEjeY2 = parseFloat(minEjeY2.toFixed(1));

    maxEjeY2 -= ((maxEjeY2 - maxY2) > 0.05) ? 0.05 : 0;
    minEjeY2 -= ((minY2 - minEjeY2) > 0.05) ? 0 : 0.05;

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosNumOrdenes,
                datosTicketRepetido
            ],
            type: "bar",
            types: {
                porcTicketRepetido: 'line',
            },
            labels: {
                format: {
                    // numOrdenes: d3.format(","),
                    porcTicketRepetido: d3.format(",.2%")
                }
            },
            axes: {
                numOrdenes: "y",
                porcTicketRepetido: "y2",
            },
            order: null,
            colors: {
                numOrdenes: "#E8DB87", //8BBB99
                porcTicketRepetido: "#3D3B3B"
            },
            names: {
                numOrdenes: "Ingreso de Soportes",
                porcTicketRepetido: "% Ticket Repetido"
            }
        },
        axis: {
            x: {
                label: {
                    text: "Año - Semana",
                    position: "outer-center"
                },
                type: 'category',
                categories: semAnioSeg,
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
                    format: d3.format(",")
                }
            },
            y2: {
                tick: {
                    format: d3.format(",.2%")
                },
                max: maxEjeY2,
                min: minEjeY2,
                padding: {
                    // top: 0,
                    bottom: 0
                },
                show: true
            }
        },
        grid: {
            x: {
                lines: [
                    {
                        value: "2022-12",
                        class: "conectamas",
                        text: "Conecta+",
                        position: "end"
                    }
                ]
            }
        },
        tooltip: {
            format: {
                value: function (value, ratio, id) {
                    var format = id === "numOrdenes" ? d3.format(",") : d3.format(",.2%");
                    return format(value);
                }
            }
        },
        zoom: {
            enabled: true
        },
        onrendered: function () {

            d3.selectAll("#grafTRS .c3-chart-texts text.c3-text")
                .attr("transform", function (d) {
                    var textSel = d3.select(this);
                    return "rotate(270, " + textSel.attr("x") + ", " + textSel.attr("y") + ")";
                })
                .style("text-anchor", function (d) {
                    return (d.value && d.value > 0) ? "end" : "center";
                });

        }

    });

    setTimeout(function () {
        chart.resize();
    }, 1000);

}


function lecturaCos(documento) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesCos = data.split(/\r\n|\n/);
            renglonesCos = renglonesCos.filter((e, i) => i > 0);
            renglonesCos = renglonesCos.filter((e, i) => i < (renglonesCos.length - 1));
            datosCompletosCos.length = 0;

            for (let i = 0; i < renglonesCos.length; i++) {
                const element = renglonesCos[i].split(",");
                datosCompletosCos.push(element);
            }

            llenaInfoCos();

        }

    });

}


function llenaInfoCos() {

    tecnicosSemana = [];

    for (let i = 0; i < datosCompletosCos.length; i++) {
        const element = datosCompletosCos[i];
        tecnicosSemana.push(element[0]);
    }

    const listDist2 = new Set(tecnicosSemana);

    tecnicosSemana = [...listDist2];
    tecnicosSemana.sort();

    for (let i = 0; i < tecnicosSemana.length; i++) {
        
        let l = tecnicosSemana[i].length,
            ts = tecnicosSemana[i],
            tsDesc = "Técnicos Semana ";
        
        tsDesc += ts.substring(l - 2, l);

        tecnicosSemanaDesc.push(tsDesc);
        
    }

    // Llena combo semana
    $("#opcSemana").empty();

    for (let i = 0; i < tecnicosSemana.length; i++) {
        $("#opcSemana").append($("<option>", { value: tecnicosSemana[i], text: tecnicosSemanaDesc[i] }));
    }

    semanaSeleccionada = $("#opcSemana option:selected").val();

    selecSemanaCosecha(semanaSeleccionada);

}


function selecSemanaCosecha(semana) {

    let datosEjeX = [],
        datosYReincidencias = ["Reincidencias"];
    
    for (let i = 0; i < datosCompletosCos.length; i++) {

        const element = datosCompletosCos[i];

        if (element[0] == semana) {
            datosEjeX.push(element[1]);
            datosYReincidencias.push(element[2]);
        }
        
    }

    graficaReincidenciasSem("#grafica4", datosYReincidencias, datosEjeX);
    lecturaCosTar("fuentes/historicoTarjetas.csv");

}


function graficaReincidenciasSem(idGrafica, datosReincidencias, ejeX) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosReincidencias
            ],
            type: "bar",
            labels: {
                format: {
                    Reincidencias: d3.format(",")
                }
            },
            colors: {
                Reincidencias: "#5E8C91"
            },
            names: {
                Reincidencias: "Reincidencias por semana"
            }
        },
        axis: {
            x: {
                label: {
                    text: "Año - Semana",
                    position: "outer-center"
                },
                type: 'category',
                categories: ejeX,
                tick: {
                    rotate: -90,
                    multiline: false,
                    culling: {
                        max: 24
                    }
                },
                height: 80
            },
            y: {
                tick: {
                    format: d3.format(",")
                }
            }
        },
        tooltip: {
            format: {
                value: function (value, ratio, id) {
                    var format = id === "Reincidencias" ? d3.format(",") : d3.format(",.2%");
                    return format(value);
                }
            }
        },
        zoom: {
            enabled: true
        }
    });

    setTimeout(function () {
        chart.resize();
    }, 2000);

}


function lecturaCosTar(documento) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesCosTar = data.split(/\r\n|\n/);
            renglonesCosTar = renglonesCosTar.filter((e, i) => i > 0);
            renglonesCosTar = renglonesCosTar.filter((e, i) => i < (renglonesCosTar.length - 1));
            datosCompletosCosTar.length = 0;

            for (let i = 0; i < renglonesCosTar.length; i++) {
                const element = renglonesCosTar[i].split(",");
                datosCompletosCosTar.push(element);
            }

            selecSemanaCosechaTar(semanaSeleccionada);

        }

    });

}


function selecSemanaCosechaTar(semana) {

    let datosEjeX = [],
        datosYAmarillas = ["amarillas"],
        datosYNaranjas = ["naranjas"],
        datosYMoradas = ["moradas"],
        datosYRojas = ["rojas"];

    for (let i = 0; i < datosCompletosCosTar.length; i++) {

        const element = datosCompletosCosTar[i];

        if (element[0] == semana) {

            datosEjeX.push(element[1]);
            datosYAmarillas.push(parseInt(element[2]));
            datosYNaranjas.push(parseInt(element[3]));
            datosYMoradas.push(parseInt(element[4]));
            datosYRojas.push(parseInt(element[5]));

        }

    }

    graficaTarjetasSem("#grafica5", datosYAmarillas, datosYNaranjas, datosYMoradas, datosYRojas, datosEjeX);
    lecturaCosTec("fuentes/historicoTecnicosCosechas.csv");

}


function graficaTarjetasSem(idGrafica, datosAmarillas, datosNaranjas, datosMoradas, datosRojas, ejeX) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosAmarillas,
                datosNaranjas,
                datosMoradas,
                datosRojas
            ],
            type: "bar",
            labels: {
                format: {
                    rojas: function (v, id, i, j) {
                        return (datosAmarillas[i + 1] + datosNaranjas[i + 1] + datosMoradas[i + 1] + datosRojas[i + 1]);
                    }
                }
            },
            groups: [
                ["amarillas", "naranjas", "moradas", "rojas"]
            ],
            order: null,
            colors: {
                amarillas: "#ffcc05",
                naranjas: "#fc8637",
                moradas: "#7937aa",
                rojas: "#ff0505"
            },
            names: {
                amarillas: "Amarillas",
                naranjas: "Naranjas",
                moradas: "Moradas",
                rojas: "Rojas"
            }
        },
        axis: {
            x: {
                label: {
                    text: "Año - Semana",
                    position: "outer-center"
                },
                type: 'category',
                categories: ejeX,
                tick: {
                    rotate: -90,
                    multiline: false,
                    culling: {
                        max: 24
                    }
                },
                height: 80
            },
            y: {
                tick: {
                    format: d3.format(",")
                }
            }
        },
        zoom: {
            enabled: true
        }

    });

    setTimeout(function () {
        chart.resize();
    }, 2000);

}


function lecturaCosTec(documento) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesCosTec = data.split(/\r\n|\n/);
            renglonesCosTec = renglonesCosTec.filter((e, i) => i > 0);
            renglonesCosTec = renglonesCosTec.filter((e, i) => i < (renglonesCosTec.length - 1));
            datosCompletosCosTec.length = 0;

            for (let i = 0; i < renglonesCosTec.length; i++) {
                const element = renglonesCosTec[i].split(",");
                datosCompletosCosTec.push(element);
            }

            llenaInfoTec(semanaSeleccionada);

        }

    });

}


function llenaInfoTec(semana) {

    datosCosTec = [];

    let listaTecnicosSemana = ["TODOS"],
        listaDistritosCos = ["TODOS"];

    for (let i = 0; i < datosCompletosCosTec.length; i++) {

        const element = datosCompletosCosTec[i];

        if (element[0] == semana) {
            datosCosTec.push(datosCompletosCosTec[i]);
            listaTecnicosSemana.push(element[2]);
            listaDistritosCos.push(element[9]);
        }

    }

    const listDist1 = new Set(listaTecnicosSemana);
    const listDist2 = new Set(listaDistritosCos);

    listaTecnicosSemana = [...listDist1];
    listaDistritosCos = [...listDist2];
    // listaDistritosCos.sort();

    // Llena combo distritos
    $("#opcDistritoCos").empty();

    for (let i = 0; i < listaDistritosCos.length; i++) {
        $("#opcDistritoCos").append($("<option>", { value: listaDistritosCos[i], text: listaDistritosCos[i] }));
    }

    // Llena combo técnicos
    $("#opcTecnico").empty();

    for (let i = 0; i < listaTecnicosSemana.length; i++) {
        $("#opcTecnico").append($("<option>", { value: listaTecnicosSemana[i], text: listaTecnicosSemana[i] }));
    }

}


function selecTecnico(tecnico) {

    let numEmpleadoTecnico = "",
        datosEjeX = [],
        datosYAsistencia = ["Asistencia"],
        datosYProductividad = ["Productividad"],
        datosYReincidencias = ["Reincidencias"],
        datosYVentaTecnico = ["VentaTecnico"],
        datosYCalificacion = ["Calificacion"],
        datosYEvento = ["Evento"];

    datosTecnicoCos = [];

    for (let i = 0; i < datosCosTec.length; i++) {

        const element = datosCosTec[i];

        if (element[2] == tecnico) {

            let nivelEvento = (element[10] != " ") ? 1.1 : -1;

            datosTecnicoCos.push(datosCosTec[i]);

            numEmpleadoTecnico = element[3];
            datosEjeX.push(element[1]);
            datosYAsistencia.push(element[4]);
            datosYProductividad.push(parseFloat(element[5]).toFixed(2));
            datosYReincidencias.push(element[6]);
            datosYVentaTecnico.push(element[7]);
            datosYCalificacion.push(element[8]);
            datosYEvento.push(nivelEvento);

        }

    }

    // console.log(datosYEvento);

    $("#datosTecnico").html(tecnico + " - " + numEmpleadoTecnico);
    graficaTecnico("#grafica6", datosYAsistencia, datosYProductividad, datosYReincidencias, datosYVentaTecnico,
                                datosYCalificacion, datosYEvento, datosEjeX);

}


function graficaTecnico(idGrafica, datosAsistencia, datosProductividad, datosReincidencias, datosVentaTecnico,
                            datosCalificacion, datosEvento, ejeX) {

    // let optimos = datosRSS.filter((e, i) => i > 0);
    // let maxY2 = Math.max(...optimos),
    //     minY2 = Math.min(...optimos),
    //     maxEjeY2 = parseFloat(maxY2.toFixed(1)),
    //     minEjeY2 = parseFloat(minY2.toFixed(1));

    // maxEjeY2 += (maxEjeY2 > maxY2) ? 0 : 0.1;
    // minEjeY2 -= (minEjeY2 < minY2) ? 0 : 0.1;

    // maxEjeY2 = parseFloat(maxEjeY2.toFixed(1));
    // minEjeY2 = parseFloat(minEjeY2.toFixed(1));

    // maxEjeY2 -= ((maxEjeY2 - maxY2) > 0.05) ? 0.05 : 0;
    // minEjeY2 -= ((minY2 - minEjeY2) > 0.05) ? 0 : 0.05;

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosAsistencia,
                datosProductividad,
                datosReincidencias,
                datosVentaTecnico,
                datosCalificacion,
                datosEvento
            ],
            type: "bar",
            types: {
                Calificacion: "line",
                Evento: "scatter"
            },
            onclick: function (d, i) {
                if (d.id == "Evento") { muestraEvento(d, i); }
            },
            labels: true,
            labels: {
                format: {
                    // idr: function (v, id, i, j) {

                    //     let valor = parseFloat((v * 100).toFixed(2)),
                    //         simbolo = "",
                    //         etiqueta = "";

                    //     if (valor <= 0.7) {
                    //         simbolo = "  (√) ";
                    //     } else if (valor <= 1.3) {
                    //         simbolo = "  (!) ";
                    //     } else {
                    //         simbolo = "  (×) ";
                    //     }

                    //     etiqueta = simbolo + valor + "%";

                    //     return (etiqueta);

                    // },
                    // idr: d3.format(",.2%"),
                    // ids: d3.format(",.2%"),
                    Calificacion: d3.format(",.2%")
                }
            },
            axes: {
                Asistencia: "y",
                Productividad: "y",
                Reincidencias: "y",
                VentaTecnico: "y",
                Evento: "y2",
                Calificacion: "y2"
            },
            // groups: [
            //     ["idr", "ids"]
            // ],
            order: null,
            colors: {
                Asistencia: "#BFAB25", //3F7CBF //5E8C91
                Productividad: "#3F7CBF", //EE9456 //87ADD7 
                Reincidencias: "#5E8C91", //EE9456 //87ADD7 
                VentaTecnico: "#87ADD7", //EE9456 //87ADD7 
                Calificacion: "#3D3B3B",
                Evento: "#ff0000"
            },
            names: {
                VentaTecnico: "Venta Técnico",
                Calificacion: "Calificación"
            }
        },
        axis: {
            x: {
                label: {
                    text: "Año - Semana",
                    position: "outer-center"
                },
                type: 'category',
                categories: ejeX,
                tick: {
                    rotate: -90,
                    multiline: false,
                    culling: {
                        max: 24
                    }
                },
                height: 80
            },
            y: {
                // tick: {
                //     format: d3.format(",.2%")
                // },
                min: 0,
                max: 10,
                padding: {
                    // top: 0,
                    bottom: 0
                },
                show: true
            },
            y2: {
                tick: {
                    format: d3.format(",.0%")
                },
                // max: maxEjeY2,
                // min: minEjeY2,
                min: 0,
                padding: {
                    // top: 0,
                    bottom: 0
                },
                show: true
            }
        },
        // grid: {
        //     y: {
        //         lines: [
        //             { value: 0.007, text: "0.7%", class: "regular" },
        //             { value: 0.013, text: "1.3%", class: "malo" }
        //         ]
        //     }
        // },
        tooltip: {
            format: {
                value: function (value, ratio, id) {
                    var format = id !== "Calificacion" ? d3.format(",") : d3.format(",.2%");
                    return format(value);
                }
            },
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {

                let m = d[0].index,
                    eventoTooltip = datosTecnicoCos[m][10],
                    temaTooltip = datosTecnicoCos[m][12];

                // console.log(datosTecnicoCos[m]);
                // console.log(eventoTooltip);
                // console.log(temaTooltip);

                var $$ = this,
                    config = $$.config,
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat = config.tooltip_format_name || function (name) {
                        return name;
                    },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor;

                for (i = 0; i < d.length; i++) {

                    if (!(d[i] && (d[i].value || d[i].value === 0))) {
                        continue;
                    }

                    if ((d[i].name == "Evento") && (d[i].value == 0)) {
                        continue;
                    }

                    if (!text) {
                        title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                        text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                    }

                    name = (d[i].name == "Evento") ? eventoTooltip : nameFormat(d[i].name);
                    value = (d[i].name == "Evento") ? temaTooltip : valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                    bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);
                    bgcolor = (d[i].name == "Evento") ? "#F30000" : bgcolor;
                    fondo = (d[i].id == "nivel") ? (colorFondo + "text-align: center;'") : "";
                    span = (d[i].name == "Evento") ? "" : "<span style='background-color:" + bgcolor + "'></span >";
                    clase = (d[i].id == "nivel") ? "class='name' " : "";
                    text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
                    text += "<td " + clase + fondo + ">" + span + name + "</td>";
                    text += "<td class='value text-align: center;'>" + value + "</td>";
                    text += "</tr>";

                }

                return text + "</table>";

            }
        },
        zoom: {
            enabled: true
        }

    });

    setTimeout(function () {
        chart.resize();
    }, 2000);

}


function selecDistritoCos(distrito) {

    // console.log(distrito);

    let listaTecnicosSemana = ["TODOS"];

    if (distrito == "TODOS") {

        // listaTecnicosSemana.push("TODOS");

        for (let i = 0; i < datosCosTec.length; i++) {
            const element = datosCosTec[i];
            listaTecnicosSemana.push(element[2]);
        }
        
    } else {
        
        for (let i = 0; i < datosCosTec.length; i++) {
    
            const element = datosCosTec[i];
    
            if (element[9] == distrito) {
                // datosCosTec.push(datosCompletosCosTec[i]);
                listaTecnicosSemana.push(element[2]);
                // listaDistritosCos.push(element[9]);
            }
    
        }

    }

    const listDist1 = new Set(listaTecnicosSemana);
    // const listDist2 = new Set(listaDistritosCos);

    listaTecnicosSemana = [...listDist1];
    // listaDistritosCos = [...listDist2];
    // listaDistritosCos.sort();

    // Llena combo técnicos
    $("#opcTecnico").empty();

    for (let i = 0; i < listaTecnicosSemana.length; i++) {
        $("#opcTecnico").append($("<option>", { value: listaTecnicosSemana[i], text: listaTecnicosSemana[i] }));
    }

    let tecnicoSeleccionado = $("#opcTecnico option:selected").val();

    // console.log(tecnicoSeleccionado);

}


function muestraEvento(d, i) {
    
    // console.log("onclick", d, i);
    console.log(d.id);
    console.log(d.index);
    // console.log(datosTecnicoCos);

    let j = d.index,
        cuerpo = "",
        nombre = datosTecnicoCos[j][2],
        evento = datosTecnicoCos[j][10],
        tarjeta = (datosTecnicoCos[j][11] == "") ? "-" : datosTecnicoCos[j][11],
        tema = datosTecnicoCos[j][12],
        tipoCapacitacion = datosTecnicoCos[j][13],
        curso = (datosTecnicoCos[j][14] == "") ? "NA" : datosTecnicoCos[j][14],
        fechaAsistencia = (datosTecnicoCos[j][15] == "") ? "No" : datosTecnicoCos[j][15];
    
    var myModal = new bootstrap.Modal(document.getElementById("eventoTecnico"));
    var modalToggle = document.getElementById("eventoTecnico");

    $("#eventoTecnicoLabel").html(nombre);
    $("#eventoLabel").html(evento);

    if (evento.toUpperCase() == "RETROALIMENTACION") {
        
        cuerpo += "<tr><td align='center'>Tarjeta</td><td align='center'>" + tarjeta + "</td></tr>"
                    + "<tr><td align='center'>Tema</td><td align='center'>" + tema + "</td></tr>"
                    + "<tr><td align='center'>Tipo de Capacitación</td><td align='center'>" + tipoCapacitacion + "</td></tr>"
                    + "<tr><td align='center'>Curso</td><td align='center'>" + curso + "</td></tr>";

    } else {

        cuerpo += "<tr><td align='center'>Tarjeta</td><td align='center'>" + tarjeta + "</td></tr>"
                    + "<tr><td align='center'>Curso</td><td align='center'>" + curso + "</td></tr>"
                    + "<tr><td align='center'>Asistió</td><td align='center'>" + fechaAsistencia + "</td></tr>";
        
    }

    $("#eventTecnico").empty().append(cuerpo);

    myModal.show(modalToggle);

}
