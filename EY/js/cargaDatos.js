var renglonesDatos = [],
    distritosUnicos = [];

var distritosAlta = [],
    fechasDistritosAlta = [],
    datosFechaAlta = [];

var distritosProd = [],
    fechaProd = [],
    productividad = [],
    cuadrillas = [],
    ordenes = [];

var fechaProdNacional = [],
    productividadNacional = [],
    cuadrillasNacional = [],
    ordenesNacional = [];

var distritosTiempos = [],
    fechaTiempos = [],
    tiempos = [],
    tiempoTotal24 = [],
    traslados = [];

var distritosIncumplimientos = [],
    fechaIncumplimientos = [],
    incumplimientos = [];

var fechaAlta = "",
    distritoSeleccionado = "";

var fechaProdSelec = [],
    productividadSelec = [],
    cuadrillasSelecG = [],
    cuadrillasSelecE = [],
    ordenesSelec = [];

var fechaTiemposSelec = [],
    tiemposSelecG = [],
    tiemposSelecE = [],
    tiempoTotal24Selec = [],
    trasladosSelec = [];

var fechaIncumplimientosSelec = [],
    incumplimientosSelec = [];

var fIni1 = "",
    fFin1 = "",
    fIni2 = "",
    fFin2 = "",
    fIni3 = "",
    fFin3 = "";


$(document).ready(function () {

    document.getElementById("indicadores").style.backgroundColor = "rgb(31, 77, 155)";
    document.getElementById("promedios").style.backgroundColor = "rgb(63, 124, 191)";

    $("#divPromedios").hide();

    obtieneFechasAlta();

    // Seleccionar gráficas indicadores
    $("#indicadores").click(function () {

        document.getElementById("indicadores").style.backgroundColor = "rgb(31, 77, 155)";
        document.getElementById("promedios").style.backgroundColor = "rgb(63, 124, 191)";

        // $("#todosCombos").show();
        $("#divSeguimiento").show();
        $("#divPromedios").hide();

        datosGraficaProductividad();
        datosGraficaTiempos();

    });

    // Seleccionar tablas de promedios
    $("#promedios").click(function () {

        document.getElementById("indicadores").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("promedios").style.backgroundColor = "rgb(31, 77, 155)";

        // $("#todosCombos").hide();
        $("#divSeguimiento").hide();
        $("#divPromedios").show();

        calculosPeriodos();

    });

    // Combo de distrito
    $("#opcDistrito").on("change", function (event) {

            datosGraficaProductividad();
            datosGraficaTiempos();
            calculosPeriodos();

    });


    // Combos de las fechas de los periodos
    $("#fechaInicial1").on("change", function (event) {

        let inicio = $("#fechaInicial1")[0].value,
            fin = $("#fechaFinal1")[0].value;

        if (inicio > fin) {
            alert("Fecha incorrecta, debe ser menor igual que la fecha final del periodo");
            $('#fechaInicial1').val(fIni1);
        }

    });

    $("#fechaFinal1").on("change", function (event) {

        let inicio = $("#fechaInicial1")[0].value,
            fin = $("#fechaFinal1")[0].value;

        if (inicio > fin) {
            alert("Fecha incorrecta, debe ser mayor igual que la fecha inicial del periodo");
            $('#fechaFinal1').val(fFin1);
        }

    });

    $("#fechaInicial2").on("change", function (event) {

        let inicio = $("#fechaInicial2")[0].value,
            fin = $("#fechaFinal2")[0].value;

        if (inicio > fin) {
            alert("Fecha incorrecta, debe ser menor igual que la fecha final del periodo");
            $('#fechaInicial2').val(fIni2);
        }

    });

    $("#fechaFinal2").on("change", function (event) {

        let inicio = $("#fechaInicial2")[0].value,
            fin = $("#fechaFinal2")[0].value;

        if (inicio > fin) {
            alert("Fecha incorrecta, debe ser mayor igual que la fecha inicial del periodo");
            $('#fechaFinal2').val(fFin2);
        }

    });

    $("#fechaInicial3").on("change", function (event) {

        let inicio = $("#fechaInicial3")[0].value,
            fin = $("#fechaFinal3")[0].value;

        if (inicio > fin) {
            alert("Fecha incorrecta, debe ser menor igual que la fecha final del periodo");
            $('#fechaInicial3').val(fIni3);
        }

    });

    $("#fechaFinal3").on("change", function (event) {

        let inicio = $("#fechaInicial3")[0].value,
            fin = $("#fechaFinal3")[0].value;

        if (inicio > fin) {
            alert("Fecha incorrecta, debe ser mayor igual que la fecha inicial del periodo");
            $('#fechaFinal3').val(fFin3);
        }

    });


    // Botón de calcular los indicadores en los periodos seleccionados
    $("#btnCalcular").click(function () {
        calculosPeriodos();
    });


});


function obtieneFechasAlta() {

    $.ajax({
        type: "GET",
        url: "fuentes/FechasAltaAlgoritmo.csv",
        dataType: "text",
        success: function (data) {

            datosFechaAlta = data.split(/\r\n|\n/);
            datosFechaAlta = datosFechaAlta.filter((e, i) => i > 0);
            datosFechaAlta = datosFechaAlta.filter((e, i) => i < (datosFechaAlta.length - 1));

            datosFechaAlta.forEach(element => {

                const e = element.split(",");

                distritosAlta.push(e[0]);
                fechasDistritosAlta.push(e[1])

            });

            obtieneDatos("fuentes/Productividad.csv", 1);
            // obtieneDatos("fuentes/Tiempos.csv", 2);

        }
    });

}


function obtieneDatos(documento, tipo) {

    $.ajax({
        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesDatos = data.split(/\r\n|\n/);
            renglonesDatos = renglonesDatos.filter((e, i) => i > 0);
            renglonesDatos = renglonesDatos.filter((e, i) => i < (renglonesDatos.length - 1));

            if (tipo == 1) {
                datosProductividad();
            } else if (tipo == 2)  {
                datosTiempos();
            } else {
                datosIncumplimientos();
            }

        }
    });

}


function datosProductividad() {

    distritosUnicos.length = 0;

    fechaProd.length = 0;
    distritosProd.length = 0;
    productividad.length = 0;
    cuadrillas.length = 0;
    ordenes.length = 0;

    fechaProdNacional.length = 0;
    productividadNacional = ["ProdNacional"];
    cuadrillasNacional.length = 0;
    ordenesNacional.length = 0;

    renglonesDatos.forEach(element => {

        const registro = element.split(",");

        // Llenado del arreglo de los distritos y el combo
        if (!distritosUnicos.includes(registro[1])) {

            distritosUnicos.push(registro[1]);

            if (registro[1] == "PORTALES") {
                $("#opcDistrito").append("<option value=" + registro[1] + " selected>" + registro[1] + "</option>");
            } else {
                // $("#opcDistrito").append("<option value=" + registro[1] + ">" + registro[1] + "</option>");
                $("#opcDistrito").append($("<option>", { value: registro[1], text: registro[1] }));
            }

        }

        // Llenado de los arreglos de datos
        if (registro[1] != "NACIONAL") {

            fechaProd.push(registro[0]);
            distritosProd.push(registro[1]);
            productividad.push(parseFloat(registro[2]));
            cuadrillas.push(parseInt(registro[3]));
            ordenes.push(parseInt(registro[4]));

        } else {

            fechaProdNacional.push(registro[0]);
            productividadNacional.push(parseFloat(registro[2]));
            cuadrillasNacional.push(parseInt(registro[3]));
            ordenesNacional.push(parseInt(registro[4]));

        }

    });

    datosGraficaProductividad();

}


function datosGraficaProductividad() {

    fechaProdSelec = [];
    productividadSelec = ["Productividad"];
    cuadrillasSelecG = ["CuadrillasFirmadas"];
    cuadrillasSelecE = ["CuadrillasEtiqueta"];
    ordenesSelec = ["OrdenesTerminadas"];
    fechaAlta = "";

    distritoSeleccionado = $("#opcDistrito option:selected").val();

    for (let i = 0; i < distritosProd.length; i++) {

        if (distritosProd[i] == distritoSeleccionado) {

            fechaProdSelec.push(fechaProd[i]);
            productividadSelec.push(productividad[i]);
            cuadrillasSelecE.push(cuadrillas[i]);
            cuadrillasSelecG.push(cuadrillas[i] * 7);
            ordenesSelec.push(ordenes[i]);

        }

    }

    for (let i = 0; i < distritosAlta.length; i++) {

        if (distritosAlta[i] == distritoSeleccionado) {
            fechaAlta = fechasDistritosAlta[i];
        }

    }

    graficaProductividad("#ProdOrdsTerminadas", productividadSelec, cuadrillasSelecG, ordenesSelec, fechaProdSelec, cuadrillasSelecE, fechaAlta, productividadNacional);

}


function graficaProductividad(idGrafica, datosProdGraf, datosCuadrillasGraf, datosOrdenesGraf, ejeX, datosEtiquetasCuadrillas, fechaAltaEY, datosProdNacional) {

    chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosProdGraf,
                datosCuadrillasGraf,
                datosOrdenesGraf,
                datosProdNacional
            ],
            type: "spline",
            types: {
                // Productividad: 'line',
                CuadrillasFirmadas: 'area-spline',
                OrdenesTerminadas: "bar"
            },
            // labels: {
            //     format: {
            //         // numOrdenes: d3.format(","),
            //         Productividad: d3.format(".1f")
            //     }
            // },
            axes: {
                Productividad: "y",
                ProdNacional: "y",
                CuadrillasFirmadas: "y2",
                OrdenesTerminadas: "y2",
            },
            // groups: [
            //     ["AsignacionesTotales", "AsignacionesAutomaticas"]
            // ],
            // order: 'asc',
            colors: {
                Productividad: "#3D3B3B",
                CuadrillasFirmadas: "#BFBFBF",
                OrdenesTerminadas: "#41B36D",
                ProdNacional: "#2F5597"
            },
            names: {
                Productividad: "Productividad",
                CuadrillasFirmadas: "Cuadrillas Firmadas",
                OrdenesTerminadas: "Órdenes Terminadas",
                ProdNacional: "Productividad Nacional"
            }
        },
        bar: {
            with: {
                ratio: 0.5
            }
        },
        point: {
            show: false
        },
        axis: {
            x: {
                type: 'category',
                categories: ejeX,
                tick: {
                    rotate: -90,
                    multiline: false,
                    culling: {
                        max: 30
                    }
                },
                height: 80
            },
            y: {
                // max: 1,
                min: 0,
                padding: { bottom: 0 },
                show: true,
                // tick: {
                //     format: d3.format(",.0%")
                // }
            },
            y2: {
                // max: 1,
                min: 0,
                padding: { top: 0, bottom: 0 },
                show: true,
                // tick: {
                //     format: d3.format(",.0%")
                // }
            }
        },
        zoom: {
            enabled: true
        },
        grid: {
            x: {
                lines: [
                    {
                        value: fechaAltaEY,
                        class: "conectamas",
                        text: "Despliegue Algoritmo EY",
                        position: "end"
                    }
                ]
            }
        },
        tooltip: {
            format: {

                // title: function (d) {

                //     // if (d == 0) {
                //     //     d = 1;
                //     // }

                //     aux100 = ejeX[d];

                //     let fechaHora = ejeX[d] + " 00:00:00",
                //         auxFecha = new Date(fechaHora),
                //         diaSemana = auxFecha.getDay(),
                //         fechaFinal = "";

                //     fechaFinal = ejeX[d] + " - " + diasSemana[diaSemana];

                //     // console.log(auxFecha);
                //     // console.log(diasSemana[diaSemana]);

                //     return (fechaFinal);

                // },

                value: function (value, ratio, id, index) {

                    var format = id == "Productividad" ? d3.format(".1f") : d3.format(',');

                    // console.log(datosEtiquetasCuadrillas[index + 1]);

                    if (id == "CuadrillasFirmadas") {
                        value = datosEtiquetasCuadrillas[index + 1];
                    }

                    return format(value);

                }

            }

        }

    });

    setTimeout(function () {
        chart.resize();
    }, 2000);

    obtieneDatos("fuentes/Tiempos.csv", 2);

}


function datosTiempos() {

    fechaTiempos.length = 0;
    distritosTiempos.length = 0;
    tiempos.length = 0;
    tiempoTotal24.length = 0;
    traslados.length = 0;

    renglonesDatos.forEach(element => {

        const registro = element.split(",");

        // Llenado de los arreglos de datos
        fechaTiempos.push(registro[0]);
        distritosTiempos.push(registro[1]);
        tiempos.push(registro[2]);
        tiempoTotal24.push(parseFloat(registro[3]));
        traslados.push(parseInt(registro[4]));

    });

    datosGraficaTiempos();

}


function datosGraficaTiempos() {

    var ultimoTiempo = 0;

    fechaTiemposSelec = [];
    tiemposSelecG = ["Tiempos"];
    tiemposSelecE = ["TiemposEtiquetas"],
    tiempoTotal24Selec = ["Total24"],
    trasladosSelec = ["Traslados"];

    const distritoSeleccionado = $("#opcDistrito option:selected").val();

    for (let i = 0; i < distritosTiempos.length; i++) {

        let aux = 0,
            t = 0;

        if (distritosTiempos[i] == distritoSeleccionado) {

            fechaTiemposSelec.push(fechaTiempos[i]);
            tiemposSelecE.push(tiempos[i]);
            tiempoTotal24Selec.push(tiempoTotal24[i]);
            trasladosSelec.push(traslados[i]);

            aux = parseFloat(tiempos[i].replace(":", "."));

            // console.log(aux);

            if (aux >= 1) {
                t = (Math.trunc(aux) * 0.6) + (aux - Math.trunc(aux));
            } else {
                t = aux;
            }

            tiemposSelecG.push(t);

        }

    }

    ultimoTiempo = tiemposSelecG[tiemposSelecG.length - 1];

    // console.log(fechaTiemposSelec);
    // console.log(tiemposSelecE);
    // console.log(tiemposSelecG);
    // console.log(fechaAlta);
    // console.log(tiemposSelecG[tiemposSelecG.length - 1]);

    graficaTiempos("#TiempoTraslado", tiemposSelecG, fechaTiemposSelec, tiemposSelecE, fechaAlta, ultimoTiempo);

}


function graficaTiempos(idGrafica, datosTiemposGraf, ejeX, datosEtiquetasTiempos, fechaAltaEY, ultimoTiempo) {

    chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosTiemposGraf
            ],
            type: "spline",
            // labels: {
            //     format: {
            //         // numOrdenes: d3.format(","),
            //         Productividad: d3.format(".1f")
            //     }
            // },
            axes: {
                Tiempos: "y"
            },
            // groups: [
            //     ["AsignacionesTotales", "AsignacionesAutomaticas"]
            // ],
            // order: 'asc',
            colors: {
                Tiempos: "#00B0F0"
            },
            names: {
                Tiempos: "Tiempo Promedio de traslado"
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
                        max: 30
                    }
                },
                height: 80
            },
            y: {
                // max: 1,
                // min: 0,
                // padding: { bottom: 0 },
                show: true,
                tick: {
                    format: d3.format(".2f")
                }
            }
        },
        point: {
            show: false
        },
        zoom: {
            enabled: true
        },
        grid: {
            x: {
                lines: [
                    {
                        value: fechaAltaEY,
                        class: "conectamas",
                        text: "Despliegue Algoritmo EY",
                        position: "end"
                    }
                ]
            },
            y: {
                lines: [
                    {
                        value: ultimoTiempo,
                        class: "ultimoTiempo"
                        // text: "Despliegue Algoritmo EY",
                        // position: "end"
                    }
                ]
            }
        },
        tooltip: {
            format: {

                // title: function (d) {

                //     // if (d == 0) {
                //     //     d = 1;
                //     // }

                //     aux100 = ejeX[d];

                //     let fechaHora = ejeX[d] + " 00:00:00",
                //         auxFecha = new Date(fechaHora),
                //         diaSemana = auxFecha.getDay(),
                //         fechaFinal = "";

                //     fechaFinal = ejeX[d] + " - " + diasSemana[diaSemana];

                //     // console.log(auxFecha);
                //     // console.log(diasSemana[diaSemana]);

                //     return (fechaFinal);

                // },

                value: function (value, ratio, id, index) {

                    // var format = d3.format(',');

                    // console.log(datosEtiquetasCuadrillas[index + 1]);

                    if (id == "Tiempos") {
                        value = datosEtiquetasTiempos[index + 1];
                    }

                    return value;

                }

            }

        }

    });

    setTimeout(function () {
        chart.resize();
    }, 2000);

    obtieneDatos("fuentes/Incumplimientos.csv", 3);

}


function datosIncumplimientos() {

    fechaIncumplimientos.length = 0;
    distritosIncumplimientos.length = 0;
    incumplimientos.length = 0;

    renglonesDatos.forEach(element => {

        const registro = element.split(",");

        // Llenado de los arreglos de datos
        fechaIncumplimientos.push(registro[0]);
        distritosIncumplimientos.push(registro[1]);
        incumplimientos.push(registro[2]);

    });

    datosGraficaIncumplimientos();

}


function datosGraficaIncumplimientos() {

    fechaIncumplimientosSelec = [];
    incumplimientosSelec = ["Incumplimientos"];

    distritoSeleccionado = $("#opcDistrito option:selected").val();

    for (let i = 0; i < distritosIncumplimientos.length; i++) {

        if (distritosIncumplimientos[i] == distritoSeleccionado) {

            fechaIncumplimientosSelec.push(fechaIncumplimientos[i]);
            incumplimientosSelec.push(incumplimientos[i]);

        }

    }

    graficaIncumplimientos("#incumplimientos", incumplimientosSelec, fechaIncumplimientosSelec, fechaAlta);

}


function graficaIncumplimientos(idGrafica, datosIncumplimientos, ejeX, fechaAltaEY) {

    chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosIncumplimientos
                // datosSoportes,
                // datosInstalaciones,
                // datosCDD,
                // datosAddon,
                // datosPorcTotal
            ],
            type: "bar",
            // types: {
            //     PorcTotal: 'line',
            // },
            // axes: {
            //     Incumplimientos: "y",
            //     Soportes: "y",
            //     Instalaciones: "y",
            //     CambiosDomicilio: "y",
            //     Adicionales: "y",
            //     PorcTotal: "y2"
            // },
            // groups: [
            //     ["Incumplimientos", "Soportes", "Instalaciones", "CambiosDomicilio", "Adicionales"]
            // ],
            // order: null,
            colors: {
                Incumplimientos: "#00B0F0"
                // Soportes: "#5171A5",
                // Instalaciones: "#00B050",
                // CambiosDomicilio: "#B8B42D",
                // Adicionales: "#B5BDCF",
                // PorcTotal: "#3D3B3B"
            },
            names: {
                Incumplimientos: "Incumplimientos"
                // Soportes: "Soportes",
                // Instalaciones: "Instalación",
                // CambiosDomicilio: "Cambio de domicilio",
                // Adicionales: "Adicionales",
                // PorcTotal: "% Incum. total sobre total agendado"
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
                        max: 30
                    }
                },
                height: 80
            },
            // y2: {
            //     show: true,
            //     tick: {
            //         format: d3.format(",.0%")
            //     }
            // }
        },
        zoom: {
            enabled: true
        },
        grid: {
            x: {
                lines: [
                    {
                        value: fechaAltaEY,
                        class: "conectamas",
                        text: "Despliegue Algoritmo EY",
                        position: "end"
                    }
                ]
            }
            // y: {
            //     lines: [
            //         {
            //             value: ultimoTiempo,
            //             class: "ultimoTiempo"
            //             // text: "Despliegue Algoritmo EY",
            //             // position: "end"
            //         }
            //     ]
            // }
        }
        // tooltip: {
        //     format: {

        //         title: function (d) {

        //             aux100 = ejeX[d];

        //             let fechaHora = ejeX[d] + " 00:00:00",
        //                 auxFecha = new Date(fechaHora),
        //                 diaSemana = auxFecha.getDay(),
        //                 fechaFinal = "";

        //             if ($("#diaria").prop("checked")) {
        //                 fechaFinal = ejeX[d] + " - " + diasSemana[diaSemana];
        //             } else {
        //                 fechaFinal = ejeX[d];
        //             }

        //             return (fechaFinal);

        //         }

        //     },
        //     contents: function (d, defaultTitleFormat, defaultValueFormat, color) {

        //         d.sort(function (a, b) {
        //             return b.value - a.value;
        //         });

        //         if (d.length > 2) {

        //             function key_for_sum(arr) {

        //                 let valor = (arr.id == "PorcTotal") ? 0 : arr.value;
        //                 return valor; //value is the key

        //             }

        //             function sum(prev, next) {
        //                 return prev + next;
        //             }

        //             var totals_object = {};
        //             totals_object.x = d[0]['x'];
        //             totals_object.value = d.map(key_for_sum).reduce(sum);// sum func
        //             totals_object.name = 'Total';//total will be shown in tooltip
        //             totals_object.index = d[0]['index'];
        //             totals_object.id = 'total';//c3 will use this
        //             d.push(totals_object);

        //         }

        //         var $$ = this,
        //             config = $$.config,
        //             titleFormat = config.tooltip_format_title || defaultTitleFormat,
        //             nameFormat = config.tooltip_format_name || function (name) {
        //                 return name;
        //             },
        //             valueFormat = config.tooltip_format_value || defaultValueFormat,
        //             text, i, title, value, name, bgcolor;

        //         for (i = 0; i < d.length; i++) {

        //             if (!(d[i].value || d[i].value > 0)) {
        //                 continue;
        //             }

        //             if (!text) {
        //                 title = titleFormat ? titleFormat(d[i].x) : d[i].x;
        //                 text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
        //             }

        //             name = nameFormat(d[i].name);
        //             value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
        //             bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);
        //             bgcolor = (name == "Total") ? "#FFFFFF" : bgcolor;
        //             text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
        //             text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
        //             text += "<td class='value'>" + value + "</td>";
        //             text += "</tr>";

        //         }

        //         return text + "</table>";

        //     }

        // }

    });

    setTimeout(function () {
        chart.resize();
    }, 2000);

    fechaMaxInput();

}


function fechaMaxInput() {

    var fechaMaxima = fechaTiemposSelec[fechaTiemposSelec.length - 1];

    var partes = fechaMaxima.split("/"),
        fechaFormateada = partes[2] + "-" + partes[1] + "-" + partes[0];

    $('#fechaInicial1').attr('max', fechaFormateada);
    $('#fechaFinal1').attr('max', fechaFormateada);

    $('#fechaInicial2').attr('max', fechaFormateada);
    $('#fechaFinal2').attr('max', fechaFormateada);

    $('#fechaInicial3').attr('max', fechaFormateada);
    $('#fechaFinal3').attr('max', fechaFormateada);

    $('#fechaFinal3').val(fechaFormateada);

}


function calculosPeriodos() {

    var fechaInicial1Formateada = formatoFechaInputADatos($("#fechaInicial1")[0].value),
        fechaFinal1Formateada = formatoFechaInputADatos($("#fechaFinal1")[0].value),
        fechaInicial2Formateada = formatoFechaInputADatos($("#fechaInicial2")[0].value),
        fechaFinal2Formateada = formatoFechaInputADatos($("#fechaFinal2")[0].value),
        fechaInicial3Formateada = formatoFechaInputADatos($("#fechaInicial3")[0].value),
        fechaFinal3Formateada = formatoFechaInputADatos($("#fechaFinal3")[0].value);

    var indiceInicial1 = indiceFecha(fechaInicial1Formateada),
        indiceFinal1 = indiceFecha(fechaFinal1Formateada),
        indiceInicial2 = indiceFecha(fechaInicial2Formateada),
        indiceFinal2 = indiceFecha(fechaFinal2Formateada),
        indiceInicial3 = indiceFecha(fechaInicial3Formateada),
        indiceFinal3 = indiceFecha(fechaFinal3Formateada);

    $("#productividad1")[0].placeholder = calculoProducPeriodo(indiceInicial1, indiceFinal1);
    $("#productividad2")[0].placeholder = calculoProducPeriodo(indiceInicial2, indiceFinal2);
    $("#productividad3")[0].placeholder = calculoProducPeriodo(indiceInicial3, indiceFinal3);

    $("#tiempo1")[0].placeholder = calculoTiempoTrasladoPeriodo(indiceInicial1, indiceFinal1);
    $("#tiempo2")[0].placeholder = calculoTiempoTrasladoPeriodo(indiceInicial2, indiceFinal2);
    $("#tiempo3")[0].placeholder = calculoTiempoTrasladoPeriodo(indiceInicial3, indiceFinal3);

    fIni1 = $("#fechaInicial1")[0].value;
    fFin1 = $("#fechaFinal1")[0].value;

    fIni2 = $("#fechaInicial2")[0].value;
    fFin2 = $("#fechaFinal2")[0].value;

    fIni3 = $("#fechaInicial3")[0].value;
    fFin3 = $("#fechaFinal3")[0].value;

}


function indiceFecha(pFecha) {

    var j = 0;

    if (pFecha == "24/12/2023" || pFecha == "25/12/2023") {
        pFecha == "23/12/2023";
    } else if (pFecha == "31/12/2023" || pFecha == "01/01/2023") {
        pFecha == "30/12/2023";
    }

    for (let i = 0; i < fechaProdSelec.length; i++) {

        if (fechaProdSelec[i] == pFecha) {
            j = i;
            break;
        }

    }

    return j;

}


function calculoProducPeriodo(a, b) {

    var cuadrillasPeriodo = 0,
        ordenesPeriodo = 0;

    for (let i = a; i <= b; i++) {
        cuadrillasPeriodo += cuadrillasSelecE[i + 1];
        ordenesPeriodo += ordenesSelec[i + 1];
    }

    return Math.round(ordenesPeriodo / cuadrillasPeriodo * 100) / 100;

}


function calculoTiempoTrasladoPeriodo(a, b) {

    var tTotal24Periodo = 0,
        trasladosPeriodo = 0;
        // tiempoTrasladoPeriodo = 0;

    for (let i = a; i <= b; i++) {
        tTotal24Periodo += tiempoTotal24Selec[i + 1];
        trasladosPeriodo += trasladosSelec[i + 1];
    }

    // tiempoTrasladoPeriodo = tTotal24Periodo / trasladosPeriodo;

    return decimalATiempo(tTotal24Periodo / trasladosPeriodo);

}


function decimalATiempo(decimal) {
    // Suponiendo que el decimal representa la fracción de un día de 24 horas
    // Primero, calculamos el total de segundos
    var totalSegundos = decimal * 86400; // 24 horas * 60 minutos * 60 segundos = 86400 segundos

    // Calculamos las horas, minutos y segundos
    var horas = Math.floor(totalSegundos / 3600); // Obtiene el número entero de horas

    totalSegundos %= 3600; // Actualiza el total de segundos con el remanente después de calcular las horas

    var minutos = Math.floor(totalSegundos / 60); // Obtiene el número entero de minutos
    // var segundos = Math.round(totalSegundos % 60); // Obtiene los segundos restantes

    // Formatea las horas, minutos y segundos para asegurarse de que tengan dos dígitos
    horas = (horas < 10) ? "0" + horas : horas;
    minutos = (minutos < 10) ? "0" + minutos : minutos;
    // segundos = (segundos < 10) ? "0" + segundos : segundos;

    // Retorna el tiempo formateado
    // return horas + ":" + minutos + ":" + segundos;
    return horas + ":" + minutos;
}


function formatoFechaInputADatos(fechaInput) {

    var partesInput = fechaInput.split("-"),
        fechaFormateadaInput = partesInput[2] + "/" + partesInput[1] + "/" + partesInput[0];

    return fechaFormateadaInput;

}
