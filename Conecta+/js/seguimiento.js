var datosCompletosSeg = [],
    renglonesSeg = [];

var nacionalSeg = [],
    direccionSeg = [],
    plazaSeg = [],
    distritoSeg = [];

var semAnioSeg = [];


$("#seguimiento").click(function() {

    let valor = "",
        segmento = "",
        seleccion = "";

    document.getElementById("productividad").style.backgroundColor = "rgb(63, 124, 191)";
    document.getElementById("reincidencias").style.backgroundColor = "rgb(63, 124, 191)";
    document.getElementById("seguimiento").style.backgroundColor = "rgb(31, 77, 155)";

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

    } else if ((selecReincidencias == 1) && (selecTR == 0)) {

        $("#desDireccion").show();
        $("#tablaReincidencias").hide();
        $("#divReinTitulo").hide();

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
        
    } else {

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
