var datosCompletosCapa = [],
    renglonesCapa = [];

var nacionalrenglonesCapa = [],
    direccionCapa = [],
    plazaCapa = [],
    distritoCapa = [];

var semAnioCapa = [];



function lecturaCapa(documento, segmento, seleccion) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesCapa = data.split(/\r\n|\n/);
            renglonesCapa = renglonesCapa.filter((e, i) => i > 0);
            renglonesCapa = renglonesCapa.filter((e, i) => i < (renglonesCapa.length - 1));
            datosCompletosCapa.length = 0;

            for (let i = 0; i < renglonesCapa.length; i++) {
                const element = renglonesCapa[i].split(",");
                datosCompletosCapa.push(element);
            }

            llenaInfoCapa(segmento, seleccion);

        }

    });

}


function llenaInfoCapa(segmento, seleccion) {

    // let valor = $("#opcDireccion option:selected").val();

    semAnioCapa = [];
    direccionCapa = [];
    plazaCapa = [];
    distritoCapa = [];

    for (let i = 0; i < datosCompletosCapa.length; i++) {
        const element = datosCompletosCapa[i];
        semAnioCapa.push(element[7]);
    }

    const listDist2 = new Set(semAnioCapa);

    semAnioCapa = [...listDist2];
    semAnioCapa.sort();

    for (let i = 0; i < datosCompletosCapa.length; i++) {

        const element = datosCompletosCapa[i];

        if (element[0] == "NACIONAL") {
            // nacionalCapa.push([element[1], element[4], element[6]]);
            direccionCapa.push([element[1], element[4], element[5], element[6]]);
        } else if (element[0] == "DIRECCION") {
            direccionCapa.push([element[1], element[4], element[5], element[6]]);
        } else if (element[0] == "PLAZA") {
            plazaCapa.push([element[1], element[4], element[5], element[6]]);
        } else if (element[0] == "DISTRITO") {
            distritoCapa.push([element[1], element[4], element[5], element[6]]);
        }

    }

    if (segmento == "direccion") {
        selecDirecCapa(seleccion);
    } else if (segmento == "plaza") {
        selecPlazaCapa(seleccion);
    } else {
        selecDistCapa(seleccion);
    }

}


function selecDirecCapa(direccion) {

    let datosYNoRequiere = ["noRequiere"],
        datosYPorSupervisor = ["porSupervisor"],
        datosYCMCC = ["cmcc"];

    for (let i = 0; i < direccionCapa.length; i++) {

        const element = direccionCapa[i];
        let noRequiere = parseInt(element[1]),
            porSupervisor = parseInt(element[2]),
            cmcc = parseInt(element[3]);

        if (element[0] == direccion) {
            datosYNoRequiere.push(noRequiere);
            datosYPorSupervisor.push(porSupervisor);
            datosYCMCC.push(cmcc);
        }

    }

    graficaCapa("#grafCapacitacion", datosYNoRequiere, datosYPorSupervisor, datosYCMCC);

}


function selecPlazaCapa(plaza) {

    let datosYNoRequiere = ["noRequiere"],
        datosYPorSupervisor = ["porSupervisor"],
        datosYCMCC = ["cmcc"];

    for (let i = 0; i < plazaCapa.length; i++) {

        const element = plazaCapa[i];
        let noRequiere = parseInt(element[1]),
            porSupervisor = parseInt(element[2]),
            cmcc = parseInt(element[3]);

        if (element[0] == plaza) {
            datosYNoRequiere.push(noRequiere);
            datosYPorSupervisor.push(porSupervisor);
            datosYCMCC.push(cmcc);
        }

    }

    graficaCapa("#grafCapacitacion", datosYNoRequiere, datosYPorSupervisor, datosYCMCC);

}


function selecDistCapa(distrito) {

    let datosYNoRequiere = ["noRequiere"],
        datosYPorSupervisor = ["porSupervisor"],
        datosYCMCC = ["cmcc"];

    for (let i = 0; i < distritoCapa.length; i++) {

        const element = distritoCapa[i];
        let noRequiere = parseInt(element[1]),
            porSupervisor = parseInt(element[2]),
            cmcc = parseInt(element[3]);

        if (element[0] == distrito) {
            datosYNoRequiere.push(noRequiere);
            datosYPorSupervisor.push(porSupervisor);
            datosYCMCC.push(cmcc);
        }

    }

    graficaCapa("#grafCapacitacion", datosYNoRequiere, datosYPorSupervisor, datosYCMCC);

}


function graficaCapa(idGrafica, datosNoRequiere, datosPorSupervisor, datosCMCC) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosNoRequiere,
                datosPorSupervisor,
                datosCMCC
            ],
            type: "bar",
            // types: {
            //     porcTarjeta: "line",
            // },
            // labels: true,
            labels: {
                format: {
                    cmcc: function (v, id, i, j) {
                        return (datosNoRequiere[i + 1] + datosPorSupervisor[i + 1] + datosCMCC[i + 1]);
                    },
                    // totalTecnicos: d3.format(","),
                    // porcTarjeta: d3.format(",.2%")
                }
            },
            // axes: {
            //     reincidencias: "y",
            //     vtaTecnico: "y",
            //     productividad: "y",
            //     materiales: "y",
            //     positiva: "y",
            //     totalTecnicos: "y",
            //     porcTarjeta: "y2",
            // },
            groups: [
                ["noRequiere", "porSupervisor", "cmcc"]
            ],
            order: null,
            colors: {
                noRequiere: "#20BF55",
                porSupervisor: "#91ADC2",
                cmcc: "#7A8B99"
            },
            names: {
                noRequiere: "No Requiere",
                porSupervisor: "Por Supervisor",
                cmcc: "Área de CCMC"
            }
        },
        bar: {
            with: {
                ratio: 0.5
            }
        },
        axis: {
            x: {
                label: {
                    text: "Año - Semana",
                    position: "outer-center"
                },
                type: 'category',
                categories: semAnioCapa,
                tick: {
                    rotate: -90,
                    multiline: false
                },
                height: 80
            },
            // y: {
            //     max: 55 // Moverlo con los datos reales
            // },
            // y2: {
            //     tick: {
            //         format: d3.format(",.2%")
            //     },
            //     // max: maxEjeY2,
            //     min: 0,
            //     padding: {
            //         // top: 0,
            //         bottom: 0
            //     },
            //     show: false
            // }
            // rotated: true
        },
        // grid: {
        //     y: {
        //         show: true
        //     }
        // },
        zoom: {
            enabled: true
        },
        tooltip: {
            // format: {

            //     title: function (d) {

            //         let fechaHora = fecha_apertura[d] + " 00:00:00",
            //             auxFecha = new Date(fechaHora),
            //             diaSemana = auxFecha.getDay();
            //         // console.log(diasSemana[diaSemana]);
            //         return (fecha_apertura[d] + " - " + diasSemana[diaSemana]);

            //     }

            // },
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {

                // d.sort(function (a, b) {
                //     return b.value - a.value;
                // });

                function key_for_sum(arr) {

                    let valor = (arr.id == "incumplimientoAgenda") ? 0 : arr.value;
                    return valor; //value is the key

                }

                function sum(prev, next) {
                    return prev + next;
                }

                var $$ = this,
                    config = $$.config,
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat = config.tooltip_format_name || function (name) {
                        return name;
                    },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor, participacion,
                    total = d.map(key_for_sum).reduce(sum);

                for (i = 0; i < d.length; i++) {

                    if (!(d[i] && (d[i].value || d[i].value === 0))) {
                        continue;
                    }

                    if (!text) {
                        title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                        text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                    }

                    name = nameFormat(d[i].name);
                    value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                    participacion = (value / total * 100).toFixed(1);
                    value += " - " + participacion + "%";
                    bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);
                    bgcolor = (name == "Total") ? "#FFFFFF" : bgcolor;
                    text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
                    text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                    text += "<td class='value'>" + value + "</td>";
                    text += "</tr>";

                }

                return text + "</table>";

            }

        }

    });

    setTimeout(function () {
        chart.resize();
    }, 1000);

}
