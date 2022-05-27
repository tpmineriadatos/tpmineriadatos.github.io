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
            direccionRetro.push([element[1], element[4], element[5], element[6], element[7], element[8], element[9]]);
        } else if (element[0] == "DIRECCION") {
            direccionRetro.push([element[1], element[4], element[5], element[6], element[7], element[8], element[9]]);
        } else if (element[0] == "PLAZA") {
            plazaRetro.push([element[1], element[4], element[5], element[6], element[7], element[8], element[9]]);
        } else if (element[0] == "DISTRITO") {
            distritoRetro.push([element[1], element[4], element[5], element[6], element[7], element[8], element[9]]);
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
        datosYTotTecnicos = ["totalTecnicos"],
        datosYPorcTarjeta = ["porcTarjeta"];

    for (let i = 0; i < direccionRetro.length; i++) {

        const element = direccionRetro[i];
        let reincidencia = parseInt(element[1]),
            vtaTecnico = parseInt(element[2]),
            productividad = parseInt(element[3]),
            materiales = parseInt(element[4]),
            positiva = parseInt(element[5]),
            totalTecnicos = parseInt(element[6]);
        
        let total = reincidencia + vtaTecnico + productividad + materiales + positiva;

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
        datosYTotTecnicos = ["totalTecnicos"],
        datosYPorcTarjeta = ["porcTarjeta"];

    for (let i = 0; i < plazaRetro.length; i++) {

        const element = plazaRetro[i];
        let reincidencia = parseInt(element[1]),
            vtaTecnico = parseInt(element[2]),
            productividad = parseInt(element[3]),
            materiales = parseInt(element[4]),
            positiva = parseInt(element[5]),
            totalTecnicos = parseInt(element[6]);

        let total = reincidencia + vtaTecnico + productividad + materiales + positiva;

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
        datosYTotTecnicos = ["totalTecnicos"],
        datosYPorcTarjeta = ["porcTarjeta"];

    for (let i = 0; i < distritoRetro.length; i++) {

        const element = distritoRetro[i];
        let reincidencia = parseInt(element[1]),
            vtaTecnico = parseInt(element[2]),
            productividad = parseInt(element[3]),
            materiales = parseInt(element[4]),
            positiva = parseInt(element[5]),
            totalTecnicos = parseInt(element[6]);

        let total = reincidencia + vtaTecnico + productividad + materiales + positiva;

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

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosReincidencias,
                datosVtaTecnico,
                datosProductividad,
                datosMateriales,
                datosPositiva,
                datosTotTecnicos,
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
                    totalTecnicos: d3.format(","),
                    porcTarjeta: d3.format(",.2%")
                }
            },
            axes: {
                reincidencias: "y",
                vtaTecnico: "y",
                productividad: "y",
                materiales: "y",
                positiva: "y",
                totalTecnicos: "y",
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
                totalTecnicos: "#BFAB25",
                porcTarjeta: "#000000"
            },
            names: {
                reincidencias: "Reincidencias",
                vtaTecnico: "Venta Técnico",
                productividad: "Productividad",
                materiales: "Consumo de Materiales",
                positiva: "Positiva",
                totalTecnicos: "Técnicos con Tarjeta",
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
            // y: {
            //     max: 55 // Moverlo con los datos reales
            // },
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
        zoom: {
            enabled: true
        }

    });

    setTimeout(function () {
        chart.resize();
    }, 1000);

}
