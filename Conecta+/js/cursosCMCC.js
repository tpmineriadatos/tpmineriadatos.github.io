var datosCompletosCMCC = [],
    renglonesCMCC = [];

var nacionalrenglonesCMCC = [],
    direccionCMCC = [],
    plazaCMCC = [],
    distritoCMCC = [];

var semAnioCMCC = [];

var aux;

function lecturaCMCC(documento, segmento, seleccion) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesCMCC = data.split(/\r\n|\n/);
            renglonesCMCC = renglonesCMCC.filter((e, i) => i > 0);
            renglonesCMCC = renglonesCMCC.filter((e, i) => i < (renglonesCMCC.length - 1));
            datosCompletosCMCC.length = 0;

            for (let i = 0; i < renglonesCMCC.length; i++) {
                const element = renglonesCMCC[i].split(",");
                datosCompletosCMCC.push(element);
            }

            llenaInfoCMCC(segmento, seleccion);

        }

    });

}


function llenaInfoCMCC(segmento, seleccion) {

    // let valor = $("#opcDireccion option:selected").val();

    semAnioCMCC = [];
    direccionCMCC = [];
    plazaCMCC = [];
    distritoCMCC = [];

    for (let i = 0; i < datosCompletosCMCC.length; i++) {
        const element = datosCompletosCMCC[i];
        semAnioCMCC.push(element[6]);
    }

    const listDist2 = new Set(semAnioCMCC);

    semAnioCMCC = [...listDist2];
    semAnioCMCC.sort();

    for (let i = 0; i < datosCompletosCMCC.length; i++) {

        const element = datosCompletosCMCC[i];

        if (element[0] == "NACIONAL") {
            // nacionalCMCC.push([element[1], element[4], element[6]]);
            direccionCMCC.push([element[1], element[4], element[5]]);
        } else if (element[0] == "DIRECCION") {
            direccionCMCC.push([element[1], element[4], element[5]]);
        } else if (element[0] == "PLAZA") {
            plazaCMCC.push([element[1], element[4], element[5]]);
        } else if (element[0] == "DISTRITO") {
            distritoCMCC.push([element[1], element[4], element[5]]);
        }

    }

    if (segmento == "direccion") {
        selecDirecCMCC(seleccion);
    } else if (segmento == "plaza") {
        selecPlazaCMCC(seleccion);
    } else {
        selecDistCMCC(seleccion);
    }

}


function selecDirecCMCC(direccion) {

    let datosYEnviados = ["enviados"],
        datosYAsistencia = ["asistencia"],
        datosYPorcAsistencia = ["porcAsistencia"];

    for (let i = 0; i < direccionCMCC.length; i++) {

        const element = direccionCMCC[i];
        let enviados = parseInt(element[1]),
            asistencia = parseInt(element[2]);

        // let total = reincidencia + vtaTecnico + productividad + materiales + positiva;

        if (element[0] == direccion) {
            datosYEnviados.push(enviados);
            datosYAsistencia.push(asistencia);
            datosYPorcAsistencia.push(asistencia / enviados);
        }

    }

    graficaCMCC("#grafCursos", datosYEnviados, datosYAsistencia, datosYPorcAsistencia, "direccion", direccion);

}


function selecPlazaCMCC(plaza) {

    let datosYEnviados = ["enviados"],
        datosYAsistencia = ["asistencia"],
        datosYPorcAsistencia = ["porcAsistencia"];

    for (let i = 0; i < plazaCMCC.length; i++) {

        const element = plazaCMCC[i];
        let enviados = parseInt(element[1]),
            asistencia = parseInt(element[2]);

        // let total = reincidencia + vtaTecnico + productividad + materiales + positiva;

        if (element[0] == plaza) {
            datosYEnviados.push(enviados);
            datosYAsistencia.push(asistencia);
            datosYPorcAsistencia.push(asistencia / enviados);
        }

    }

    graficaCMCC("#grafCursos", datosYEnviados, datosYAsistencia, datosYPorcAsistencia, "plaza", plaza);

}


function selecDistCMCC(distrito) {

    let datosYEnviados = ["enviados"],
        datosYAsistencia = ["asistencia"],
        datosYPorcAsistencia = ["porcAsistencia"];

    for (let i = 0; i < distritoCMCC.length; i++) {

        const element = distritoCMCC[i];
        let enviados = parseInt(element[1]),
            asistencia = parseInt(element[2]);

        // let total = reincidencia + vtaTecnico + productividad + materiales + positiva;

        if (element[0] == distrito) {
            datosYEnviados.push(enviados);
            datosYAsistencia.push(asistencia);
            datosYPorcAsistencia.push(asistencia / enviados);
        }

    }

    graficaCMCC("#grafCursos", datosYEnviados, datosYAsistencia, datosYPorcAsistencia, "distrito", distrito);

}


function actDetalleCursos(index, segmento, seleccion) {

    // let valor = $("#opcDireccion option:selected").val(); // trabajar seleccion
    let anioSemana = semAnioCMCC[index],
        auxAnioSemana = anioSemana.split("-"),
        numSemana = auxAnioSemana[1];

    $("#labelDetalle").html("Detalle de cursos - semana " + numSemana);

    if (segmento == "direccion") {
        selecDirecDetalle(seleccion, anioSemana);
    } else if (segmento == "plaza") {
        selecPlazaDetalle(seleccion, anioSemana);
    } else if (segmento == "distrito") {
        selecDistDetalle(seleccion, anioSemana)
    }

}


function graficaCMCC(idGrafica, datosEnviados, datosAsistencia, datosPorcAsistencia, segmento, seleccion) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosEnviados,
                datosAsistencia,
                datosPorcAsistencia
            ],
            type: "bar",
            types: {
                porcAsistencia: "line",
            },
            onclick: function (d, i) {

                // console.log("onclick", d, i);
                console.log(d.index, segmento, seleccion);
                aux = d;
                actDetalleCursos(d.index, segmento, seleccion);

            },
            labels: true,
            labels: {
                format: {
                    // positiva: function (v, id, i, j) {
                    //     return (datosReincidencias[i + 1] + datosVtaTecnico[i + 1] + datosProductividad[i + 1]
                    //         + datosMateriales[i + 1] + datosPositiva[i + 1]);
                    // },
                    enviados: d3.format(","),
                    asistencia: d3.format(","),
                    porcAsistencia: d3.format(",.2%")
                }
            },
            axes: {
                enviados: "y",
                asistencia: "y",
                porcAsistencia: "y2",
            },
            // groups: [
            //     ["reincidencias", "vtaTecnico", "productividad", "materiales", "positiva"]
            // ],
            order: null,
            colors: {
                enviados: "#7A8B99",
                asistencia: "#BFAB25",
                porcAsistencia: "#000000"
            },
            names: {
                enviados: "Técnicos canalizados a curso",
                asistencia: "Técnicos asistieron a curso",
                porcAsistencia: "% Asistencia"
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
                categories: semAnioCMCC,
                tick: {
                    rotate: -90,
                    multiline: false
                },
                height: 80
            },
            // y: {
            //     max: 13 // Moverlo con los datos reales
            // },
            y2: {
                tick: {
                    format: d3.format(",.2%")
                },
                // max: maxEjeY2,
                min: -1,
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
