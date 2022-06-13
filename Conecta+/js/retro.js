var datosCompletosRetro = [],
    renglonesRetro = [];

var nacionalrenglonesRetro = [],
    direccionRetro = [],
    plazaRetro = [],
    distritoRetro = [];

var semAnioRetro = [];



function lecturaRetro(documento, segmento, seleccion) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesRetro = data.split(/\r\n|\n/);
            renglonesRetro = renglonesRetro.filter((e, i) => i > 0);
            renglonesRetro = renglonesRetro.filter((e, i) => i < (renglonesRetro.length - 1));
            datosCompletosRetro.length = 0;

            for (let i = 0; i < renglonesRetro.length; i++) {
                const element = renglonesRetro[i].split(",");
                datosCompletosRetro.push(element);
            }

            llenaInfoRetro(segmento, seleccion);

        }

    });

}


function llenaInfoRetro(segmento, seleccion) {

    // let valor = $("#opcDireccion option:selected").val();

    semAnioRetro = [];
    direccionRetro = [];
    plazaRetro = [];
    distritoRetro = [];

    for (let i = 0; i < datosCompletosRetro.length; i++) {
        const element = datosCompletosRetro[i];
        semAnioRetro.push(element[10]);
    }

    const listDist2 = new Set(semAnioRetro);

    semAnioRetro = [...listDist2];
    semAnioRetro.sort();

    for (let i = 0; i < datosCompletosRetro.length; i++) {

        const element = datosCompletosRetro[i];

        if (element[0] == "NACIONAL") {
            // nacionalRetro.push([element[1], element[4], element[6]]);
            direccionRetro.push([element[1], element[4], element[5], element[6], element[7], element[8], element[9], element[11]]);
        } else if (element[0] == "DIRECCION") {
            direccionRetro.push([element[1], element[4], element[5], element[6], element[7], element[8], element[9], element[11]]);
        } else if (element[0] == "PLAZA") {
            plazaRetro.push([element[1], element[4], element[5], element[6], element[7], element[8], element[9], element[11]]);
        } else if (element[0] == "DISTRITO") {
            distritoRetro.push([element[1], element[4], element[5], element[6], element[7], element[8], element[9], element[11]]);
        }

    }

    if (segmento == "direccion") {
        selecDirecRetro(seleccion);
    } else if (segmento == "plaza") {
        selecPlazaRetro(seleccion);
    } else {
        selecDistRetro(seleccion);
    }

}


function selecDirecRetro(direccion) {

    let datosYReincidencias = ["reincidencias"],
        datosYVtaTecnico = ["vtaTecnico"],
        datosYProductividad = ["productividad"],
        datosYMateriales = ["materiales"],
        datosYPositiva = ["positiva"],
        datosYTotTecnicos = [],
        datosYPorcTarjeta = ["porcTarjeta"];

    for (let i = 0; i < direccionRetro.length; i++) {

        const element = direccionRetro[i];
        let reincidencia = parseInt(element[1]),
            vtaTecnico = parseInt(element[2]),
            productividad = parseInt(element[3]),
            materiales = parseInt(element[4]),
            positiva = parseInt(element[5]),
            totalTecnicos = parseInt(element[6]),
            total = parseInt(element[7]);
        
        // let total = reincidencia + vtaTecnico + productividad + materiales + positiva;

        if (element[0] == direccion) {

            datosYReincidencias.push(reincidencia);
            datosYVtaTecnico.push(vtaTecnico);
            datosYProductividad.push(productividad);
            datosYMateriales.push(materiales);
            datosYPositiva.push(positiva);
            datosYTotTecnicos.push(totalTecnicos);
            datosYPorcTarjeta.push(totalTecnicos / total);

        }

    }

    graficaRetro("#grafRetro", datosYReincidencias, datosYVtaTecnico, datosYProductividad, datosYMateriales,
                                datosYPositiva, datosYTotTecnicos, datosYPorcTarjeta);

}


function selecPlazaRetro(plaza) {

    let datosYReincidencias = ["reincidencias"],
        datosYVtaTecnico = ["vtaTecnico"],
        datosYProductividad = ["productividad"],
        datosYMateriales = ["materiales"],
        datosYPositiva = ["positiva"],
        datosYTotTecnicos = [],
        datosYPorcTarjeta = ["porcTarjeta"];

    for (let i = 0; i < plazaRetro.length; i++) {

        const element = plazaRetro[i];
        let reincidencia = parseInt(element[1]),
            vtaTecnico = parseInt(element[2]),
            productividad = parseInt(element[3]),
            materiales = parseInt(element[4]),
            positiva = parseInt(element[5]),
            totalTecnicos = parseInt(element[6]),
            total = parseInt(element[7]);

        // let total = reincidencia + vtaTecnico + productividad + materiales + positiva;

        if (element[0] == plaza) {

            datosYReincidencias.push(reincidencia);
            datosYVtaTecnico.push(vtaTecnico);
            datosYProductividad.push(productividad);
            datosYMateriales.push(materiales);
            datosYPositiva.push(positiva);
            datosYTotTecnicos.push(totalTecnicos);
            datosYPorcTarjeta.push(totalTecnicos / total);

        }

    }

    graficaRetro("#grafRetro", datosYReincidencias, datosYVtaTecnico, datosYProductividad, datosYMateriales,
                                datosYPositiva, datosYTotTecnicos, datosYPorcTarjeta);

}


function selecDistRetro(distrito) {

    let datosYReincidencias = ["reincidencias"],
        datosYVtaTecnico = ["vtaTecnico"],
        datosYProductividad = ["productividad"],
        datosYMateriales = ["materiales"],
        datosYPositiva = ["positiva"],
        datosYTotTecnicos = [],
        datosYPorcTarjeta = ["porcTarjeta"];

    for (let i = 0; i < distritoRetro.length; i++) {

        const element = distritoRetro[i];
        let reincidencia = parseInt(element[1]),
            vtaTecnico = parseInt(element[2]),
            productividad = parseInt(element[3]),
            materiales = parseInt(element[4]),
            positiva = parseInt(element[5]),
            totalTecnicos = parseInt(element[6]),
            total = parseInt(element[7]);

        // let total = reincidencia + vtaTecnico + productividad + materiales + positiva;

        if (element[0] == distrito) {

            datosYReincidencias.push(reincidencia);
            datosYVtaTecnico.push(vtaTecnico);
            datosYProductividad.push(productividad);
            datosYMateriales.push(materiales);
            datosYPositiva.push(positiva);
            datosYTotTecnicos.push(totalTecnicos);
            datosYPorcTarjeta.push(totalTecnicos / total);

        }

    }

    graficaRetro("#grafRetro", datosYReincidencias, datosYVtaTecnico, datosYProductividad, datosYMateriales,
                                datosYPositiva, datosYTotTecnicos, datosYPorcTarjeta);

}


function graficaRetro(idGrafica, datosReincidencias, datosVtaTecnico, datosProductividad, datosMateriales, datosPositiva, datosTotTecnicos, datosPorcTarjeta) {

    let maximo = datosReincidencias[datosReincidencias.length - 1] + datosVtaTecnico[datosVtaTecnico.length - 1]
                    + datosProductividad[datosProductividad.length - 1] + datosMateriales[datosMateriales.length - 1]
                    + datosPositiva[datosPositiva.length - 1];

    let maximoEje = maximo * 1.2;

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosReincidencias,
                datosVtaTecnico,
                datosProductividad,
                datosMateriales,
                datosPositiva,
                // datosTotTecnicos,
                datosPorcTarjeta
            ],
            type: "bar",
            types: {
                porcTarjeta: "line",
            },
            labels: true,
            labels: {
                format: {
                    positiva: function (v, id, i, j) {
                        return (datosReincidencias[i + 1] + datosVtaTecnico[i + 1] + datosProductividad[i + 1]
                                    + datosMateriales[i + 1] + datosPositiva[i + 1]);
                    },
                    // totalTecnicos: d3.format(","),
                    porcTarjeta: d3.format(",.2%")
                }
            },
            axes: {
                reincidencias: "y",
                vtaTecnico: "y",
                productividad: "y",
                materiales: "y",
                positiva: "y",
                // totalTecnicos: "y",
                porcTarjeta: "y2",
            },
            groups: [
                ["reincidencias", "vtaTecnico", "productividad", "materiales", "positiva"]
            ],
            order: null,
            colors: {
                reincidencias: "#7A8B99",
                vtaTecnico: "#91ADC2",
                productividad: "#9BA0BC",
                materiales: "#C1B8C8",
                positiva: "#20BF55",
                // totalTecnicos: "#BFAB25",
                porcTarjeta: "#000000"
            },
            names: {
                reincidencias: "Reincidencias",
                vtaTecnico: "Venta Técnico",
                productividad: "Productividad",
                materiales: "Consumo de Materiales",
                positiva: "Positiva",
                // totalTecnicos: "Técnicos con Tarjeta",
                porcTarjeta: "% Retroalimentación por Tarjeta"
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
                categories: semAnioRetro,
                tick: {
                    rotate: -90,
                    multiline: false
                },
                height: 80
            },
            y: {
                max: maximoEje
            },
            y2: {
                tick: {
                    format: d3.format(",.2%")
                },
                // max: maxEjeY2,
                min: 0,
                padding: {
                    // top: 0,
                    bottom: 0
                },
                show: false
            }
            // rotated: true
        },
        // grid: {
        //     y: {
        //         show: true
        //     }
        // },
        tooltip: {
            // format: {

            //     title: function (d) {

            //         let fechaHora = fechasBacklogNacional[d] + " 00:00:00",
            //             auxFecha = new Date(fechaHora),
            //             diaSemana = auxFecha.getDay();
            //         return (fechasBacklogNacional[d] + " - " + diasSemana[diaSemana]);

            //     }

            // },
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {

                let d2 = [],
                    idx = 0;

                var $$ = this,
                    config = $$.config,
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat = config.tooltip_format_name || function (name) {
                        return name;
                    },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor, clase;

                d.sort(function (a, b) {
                    return b.value - a.value;
                });

                function key_for_sum(arr) {
                    let valor = (arr.id == "porcTarjeta") ? 0 : arr.value;
                    return valor; //value is the key
                }

                function sum(prev, next) {
                    return prev + next;
                }

                for (let i = 0; i < d.length; i++) {

                    let name = nameFormat(d[i].name);

                    if ((d[i].value != 0) && (name != "% Retroalimentación por Tarjeta")) {
                        d2.push(d[i]);
                    }

                    if (name == "% Retroalimentación por Tarjeta") {
                        idx = i;
                    }

                }

                var totals_object = {};
                totals_object.x = d[0]['x'];
                totals_object.value = d.map(key_for_sum).reduce(sum);// sum func
                totals_object.name = "Total de retroalimentaciones";//total will be shown in tooltip
                totals_object.index = d[0]['index'];
                totals_object.id = 'total';//c3 will use this
                d2.push(totals_object);

                var totals_object2 = {};
                totals_object2.x = d[0]['x'];
                totals_object2.value = datosTotTecnicos[totals_object2.x];
                totals_object2.name = "Retroalimentaciones con tarjeta";
                totals_object2.index = d[0]['index'];
                totals_object2.id = "retro";
                d2.push(totals_object2);
                d2.push(d[idx]);


                for (i = 0; i < d2.length; i++) {

                    if (!(d2[i] && (d2[i].value || d2[i].value == 0))) {
                        continue;
                    }

                    if (!text) {
                        title = titleFormat ? titleFormat(d2[i].x) : d2[i].x;
                        text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                    }

                    name = nameFormat(d2[i].name);
                    value = valueFormat(d2[i].value, d2[i].ratio, d2[i].id, d2[i].index);
                    bgcolor = $$.levelColor ? $$.levelColor(d2[i].value) : color(d2[i].id);

                    if (name == "Total de retroalimentaciones") {
                        bgcolor = "#FFFFFF";
                    } else if (name == "Retroalimentaciones con tarjeta") {
                        bgcolor = "#BFAB25";
                    }

                    clase = (name == "Total de retroalimentaciones") ? "class='name'" : "";
                    text += "<tr class='" + $$.CLASS.tooltipName + "-" + d2[i].id + "'>";
                    text += "<td " + clase + "><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                    text += "<td " + clase + ">" + value + "</td>";
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
    }, 1000);

}
