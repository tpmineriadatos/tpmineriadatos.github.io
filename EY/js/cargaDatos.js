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

var distritosTiempos = [],
    fechaTiempos = [],
    tiempos = [];

var fechaAlta = "",
    distritoSeleccionado = "";


$(document).ready(function () {

    obtieneFechasAlta();
    
    $("#opcDistrito").on("change", function (event) {
        datosGraficaProductividad();
        datosGraficaTiempos();
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
                console.log(1);
                // console.log(renglonesDatos);
                datosProductividad();
            } else {
                console.log(2);
                console.log(renglonesDatos);
                datosTiempos();
            }

        }
    });

}


function datosProductividad() {

    // let cantidadCeros = 0;

    distritosUnicos.length = 0;

    fechaProd.length = 0;
    distritosProd.length = 0;
    productividad.length = 0;
    cuadrillas.length = 0;
    ordenes.length = 0;

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
        fechaProd.push(registro[0]);
        distritosProd.push(registro[1]);
        productividad.push(parseFloat(registro[2]));
        cuadrillas.push(parseInt(registro[3]));
        ordenes.push(parseInt(registro[4]));

    });

    datosGraficaProductividad();

}


function datosGraficaProductividad() {
    
    var fechaProdSelec = [],
        productividadSelec = ["Productividad"],
        cuadrillasSelecG = ["CuadrillasFirmadas"],
        cuadrillasSelecE = ["CuadrillasEtiqueta"],
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

    // console.log(fechaProdSelec);
    // console.log(productividadSelec);
    // console.log(cuadrillasSelecG);
    // console.log(cuadrillasSelecE);
    // console.log(ordenesSelec);
    // console.log(fechaAlta);

    graficaProductividad("#ProdOrdsTerminadas", productividadSelec, cuadrillasSelecG, ordenesSelec, fechaProdSelec, cuadrillasSelecE, fechaAlta);

}


function graficaProductividad(idGrafica, datosProdGraf, datosCuadrillasGraf, datosOrdenesGraf, ejeX, datosEtiquetasCuadrillas, fechaAltaEY) {

    chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosProdGraf,
                datosCuadrillasGraf,
                datosOrdenesGraf
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
                OrdenesTerminadas: "#41B36D"
            },
            names: {
                Productividad: "Productividad",
                CuadrillasFirmadas: "Cuadrillas Firmadas",
                OrdenesTerminadas: "Órdenes Terminadas"
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

    renglonesDatos.forEach(element => {

        const registro = element.split(",");

        // Llenado de los arreglos de datos
        fechaTiempos.push(registro[0]);
        distritosTiempos.push(registro[1]);
        tiempos.push(registro[2]);

    });

    datosGraficaTiempos();
    
}


function datosGraficaTiempos() {

    var fechaTiemposSelec = [],
        tiemposSelecG = ["Tiempos"],
        tiemposSelecE = ["TiemposEtiquetas"];

    var ultimoTiempo = 0;

    const distritoSeleccionado = $("#opcDistrito option:selected").val();

    for (let i = 0; i < distritosTiempos.length; i++) {

        let aux = 0,
            t = 0;

        if (distritosTiempos[i] == distritoSeleccionado) {

            fechaTiemposSelec.push(fechaTiempos[i]);
            tiemposSelecE.push(tiempos[i]);

            aux = parseFloat(tiempos[i].replace(":", "."));

            console.log(aux);

            if (aux >= 1) {
                t = (Math.trunc(aux) * 0.6) + (aux - Math.trunc(aux));
            } else {
                t = aux;
            }

            tiemposSelecG.push(t);

        }

    }

    ultimoTiempo = tiemposSelecG[tiemposSelecG.length - 1];

    // for (let i = 0; i < distritosAlta.length; i++) {

    //     if (distritosAlta[i] == distritoSeleccionado) {
    //         fechaAlta = fechasDistritosAlta[i];
    //     }

    // }

    console.log(fechaTiemposSelec);
    console.log(tiemposSelecE);
    console.log(tiemposSelecG);
    console.log(fechaAlta);
    console.log(tiemposSelecG[tiemposSelecG.length - 1]);

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

}
