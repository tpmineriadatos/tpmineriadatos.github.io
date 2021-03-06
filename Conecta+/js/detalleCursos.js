var datosCompletosDetalle = [],
    renglonesDetalle = [],
    titulosDetalle = [];

var nacionalrenglonesDetalle = [],
    direccionDetalle = [],
    plazaDetalle = [],
    distritoDetalle = [];

var semAnioDetalle = [],
    semanaActual = "";



function lecturaDetalle(documento, segmento, seleccion) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesDetalle = data.split(/\r\n|\n/);
            titulosDetalle = renglonesDetalle[0].split(",");
            renglonesDetalle = renglonesDetalle.filter((e, i) => i > 0);
            renglonesDetalle = renglonesDetalle.filter((e, i) => i < (renglonesDetalle.length - 1));
            datosCompletosDetalle.length = 0;

            for (let i = 0; i < renglonesDetalle.length; i++) {
                const element = renglonesDetalle[i].split(",");
                datosCompletosDetalle.push(element);
            }

            llenaInfoDetalle(segmento, seleccion);

        }

    });

}


function llenaInfoDetalle(segmento, seleccion) {

    // let valor = $("#opcDireccion option:selected").val(); // trabajar seleccion
    
    semanaActual = "";
    semAnioDetalle = [];
    direccionDetalle = [];
    plazaDetalle = [];
    distritoDetalle = [];

    for (let i = 0; i < datosCompletosDetalle.length; i++) {
        const element = datosCompletosDetalle[i];
        semAnioDetalle.push(element[22]);
    }

    const listDist2 = new Set(semAnioDetalle);

    semAnioDetalle = [...listDist2];
    semAnioDetalle.sort();
    semanaActual = semAnioDetalle[semAnioDetalle.length - 1];

    for (let i = 0; i < datosCompletosDetalle.length; i++) {

        const element = datosCompletosDetalle[i];

        if (element[0] == "NACIONAL") {
            // nacionalDetalle.push([element[1], element[4], element[6]]);
            direccionDetalle.push([element[1], element[4], element[5], element[6], element[7], element[8], element[9], element[10],
                                    element[11], element[12], element[13], element[14], element[15], element[16], element[17],
                                    element[18], element[19], element[20], element[21], element[22]]);
        } else if (element[0] == "DIRECCION") {
            direccionDetalle.push([element[1], element[4], element[5], element[6], element[7], element[8], element[9], element[10],
                                    element[11], element[12], element[13], element[14], element[15], element[16], element[17],
                                    element[18], element[19], element[20], element[21], element[22]]);
        } else if (element[0] == "PLAZA") {
            plazaDetalle.push([element[1], element[4], element[5], element[6], element[7], element[8], element[9], element[10],
                                element[11], element[12], element[13], element[14], element[15], element[16], element[17],
                                element[18], element[19], element[20], element[21], element[22]]);
        } else if (element[0] == "DISTRITO") {
            distritoDetalle.push([element[1], element[4], element[5], element[6], element[7], element[8], element[9], element[10],
                                    element[11], element[12], element[13], element[14], element[15], element[16], element[17],
                                    element[18], element[19], element[20], element[21], element[22]]);
        }

    }

    if (segmento == "direccion") {
        selecDirecDetalle(seleccion, semanaActual);
    } else if (segmento == "plaza") {
        selecPlazaDetalle(seleccion, semanaActual);
    } else {
        selecDistDetalle(seleccion, semanaActual);
    }

}


function selecDirecDetalle(direccion, semana) {

    let datosYCurso1 = ["curso1"],
        datosYCurso2 = ["curso2"],
        datosYCurso3 = ["curso3"],
        datosYCurso4 = ["curso4"],
        datosYCurso5 = ["curso5"],
        datosYCurso6 = ["curso6"],
        datosYCurso7 = ["curso7"],
        datosYCurso8 = ["curso8"],
        datosYCurso9 = ["curso9"],
        datosYCurso10 = ["curso10"],
        datosYCurso11 = ["curso11"],
        datosYCurso12 = ["curso12"],
        datosYCurso13 = ["curso13"],
        datosYCurso14 = ["curso14"],
        datosYCurso15 = ["curso15"],
        datosYCurso16 = ["curso16"],
        datosYCurso17 = ["curso17"],
        datosYCurso18 = ["curso18"],
        titulo = "",
        auxAnioSemana = semana.split("-"),
        numSemana = auxAnioSemana[1];

    for (let i = 0; i < direccionDetalle.length; i++) {

        const element = direccionDetalle[i];

        if ((element[0] == direccion) && (element[19] == semana)) {

            let curso1 = parseInt(element[1]),
                curso2 = parseInt(element[2]),
                curso3 = parseInt(element[3]),
                curso4 = parseInt(element[4]),
                curso5 = parseInt(element[5]),
                curso6 = parseInt(element[6]),
                curso7 = parseInt(element[7]),
                curso8 = parseInt(element[8]),
                curso9 = parseInt(element[9]),
                curso10 = parseInt(element[10]),
                curso11 = parseInt(element[11]),
                curso12 = parseInt(element[12]),
                curso13 = parseInt(element[13]),
                curso14 = parseInt(element[14]),
                curso15 = parseInt(element[15]),
                curso16 = parseInt(element[16]),
                curso17 = parseInt(element[17]),
                curso18 = parseInt(element[18]);

            let total = curso1 + curso2 + curso3 + curso4 + curso5 + curso6 + curso7 + curso8 + curso9
                        + curso10 + curso11 + curso12 + curso13 + curso14 + curso15 + curso16 + curso17 + curso18;

            datosYCurso1.push(curso1);
            datosYCurso2.push(curso2);
            datosYCurso3.push(curso3);
            datosYCurso4.push(curso4);
            datosYCurso5.push(curso5);
            datosYCurso6.push(curso6);
            datosYCurso7.push(curso7);
            datosYCurso8.push(curso8);
            datosYCurso9.push(curso9);
            datosYCurso10.push(curso10);
            datosYCurso11.push(curso11);
            datosYCurso12.push(curso12);
            datosYCurso13.push(curso13);
            datosYCurso14.push(curso14);
            datosYCurso15.push(curso15);
            datosYCurso16.push(curso16);
            datosYCurso17.push(curso17);
            datosYCurso18.push(curso18);

            titulo = "Total de cursos: " + total;

        }

    }

    $("#labelDetalle").html("Cursos requeridos en la semana " + numSemana);
    graficaDetalle("#grafDetalle", datosYCurso1, datosYCurso2, datosYCurso3, datosYCurso4, datosYCurso5, datosYCurso6,
                                    datosYCurso7, datosYCurso8, datosYCurso9, datosYCurso10, datosYCurso11, datosYCurso12,
                                    datosYCurso13, datosYCurso14, datosYCurso15, datosYCurso16, datosYCurso17, datosYCurso18,
                                    titulo);

}


function selecPlazaDetalle(plaza, semana) {

    let datosYCurso1 = ["curso1"],
        datosYCurso2 = ["curso2"],
        datosYCurso3 = ["curso3"],
        datosYCurso4 = ["curso4"],
        datosYCurso5 = ["curso5"],
        datosYCurso6 = ["curso6"],
        datosYCurso7 = ["curso7"],
        datosYCurso8 = ["curso8"],
        datosYCurso9 = ["curso9"],
        datosYCurso10 = ["curso10"],
        datosYCurso11 = ["curso11"],
        datosYCurso12 = ["curso12"],
        datosYCurso13 = ["curso13"],
        datosYCurso14 = ["curso14"],
        datosYCurso15 = ["curso15"],
        datosYCurso16 = ["curso16"],
        datosYCurso17 = ["curso17"],
        datosYCurso18 = ["curso18"],
        titulo = "",
        auxAnioSemana = semana.split("-"),
        numSemana = auxAnioSemana[1];

    for (let i = 0; i < plazaDetalle.length; i++) {

        const element = plazaDetalle[i];

        if ((element[0] == plaza) && (element[19] == semana)) {

            let curso1 = parseInt(element[1]),
                curso2 = parseInt(element[2]),
                curso3 = parseInt(element[3]),
                curso4 = parseInt(element[4]),
                curso5 = parseInt(element[5]),
                curso6 = parseInt(element[6]),
                curso7 = parseInt(element[7]),
                curso8 = parseInt(element[8]),
                curso9 = parseInt(element[9]),
                curso10 = parseInt(element[10]),
                curso11 = parseInt(element[11]),
                curso12 = parseInt(element[12]),
                curso13 = parseInt(element[13]),
                curso14 = parseInt(element[14]),
                curso15 = parseInt(element[15]),
                curso16 = parseInt(element[16]),
                curso17 = parseInt(element[17]),
                curso18 = parseInt(element[18]);

            let total = curso1 + curso2 + curso3 + curso4 + curso5 + curso6 + curso7 + curso8 + curso9
                + curso10 + curso11 + curso12 + curso13 + curso14 + curso15 + curso16 + curso17 + curso18;

            datosYCurso1.push(curso1);
            datosYCurso2.push(curso2);
            datosYCurso3.push(curso3);
            datosYCurso4.push(curso4);
            datosYCurso5.push(curso5);
            datosYCurso6.push(curso6);
            datosYCurso7.push(curso7);
            datosYCurso8.push(curso8);
            datosYCurso9.push(curso9);
            datosYCurso10.push(curso10);
            datosYCurso11.push(curso11);
            datosYCurso12.push(curso12);
            datosYCurso13.push(curso13);
            datosYCurso14.push(curso14);
            datosYCurso15.push(curso15);
            datosYCurso16.push(curso16);
            datosYCurso17.push(curso17);
            datosYCurso18.push(curso18);

            titulo = "Total de cursos: " + total;

        }

    }

    $("#labelDetalle").html("Cursos requeridos en la semana " + numSemana);
    graficaDetalle("#grafDetalle", datosYCurso1, datosYCurso2, datosYCurso3, datosYCurso4, datosYCurso5, datosYCurso6,
                                    datosYCurso7, datosYCurso8, datosYCurso9, datosYCurso10, datosYCurso11, datosYCurso12,
                                    datosYCurso13, datosYCurso14, datosYCurso15, datosYCurso16, datosYCurso17, datosYCurso18,
                                    titulo);

}


function selecPlazaDetalle(distrito, semana) {

    let datosYCurso1 = ["curso1"],
        datosYCurso2 = ["curso2"],
        datosYCurso3 = ["curso3"],
        datosYCurso4 = ["curso4"],
        datosYCurso5 = ["curso5"],
        datosYCurso6 = ["curso6"],
        datosYCurso7 = ["curso7"],
        datosYCurso8 = ["curso8"],
        datosYCurso9 = ["curso9"],
        datosYCurso10 = ["curso10"],
        datosYCurso11 = ["curso11"],
        datosYCurso12 = ["curso12"],
        datosYCurso13 = ["curso13"],
        datosYCurso14 = ["curso14"],
        datosYCurso15 = ["curso15"],
        datosYCurso16 = ["curso16"],
        datosYCurso17 = ["curso17"],
        datosYCurso18 = ["curso18"],
        titulo = "",
        auxAnioSemana = semana.split("-"),
        numSemana = auxAnioSemana[1];

    for (let i = 0; i < distritoDetalle.length; i++) {

        const element = distritoDetalle[i];

        if ((element[0] == distrito) && (element[19] == semana)) {

            let curso1 = parseInt(element[1]),
                curso2 = parseInt(element[2]),
                curso3 = parseInt(element[3]),
                curso4 = parseInt(element[4]),
                curso5 = parseInt(element[5]),
                curso6 = parseInt(element[6]),
                curso7 = parseInt(element[7]),
                curso8 = parseInt(element[8]),
                curso9 = parseInt(element[9]),
                curso10 = parseInt(element[10]),
                curso11 = parseInt(element[11]),
                curso12 = parseInt(element[12]),
                curso13 = parseInt(element[13]),
                curso14 = parseInt(element[14]),
                curso15 = parseInt(element[15]),
                curso16 = parseInt(element[16]),
                curso17 = parseInt(element[17]),
                curso18 = parseInt(element[18]);

            let total = curso1 + curso2 + curso3 + curso4 + curso5 + curso6 + curso7 + curso8 + curso9
                + curso10 + curso11 + curso12 + curso13 + curso14 + curso15 + curso16 + curso17 + curso18;

            datosYCurso1.push(curso1);
            datosYCurso2.push(curso2);
            datosYCurso3.push(curso3);
            datosYCurso4.push(curso4);
            datosYCurso5.push(curso5);
            datosYCurso6.push(curso6);
            datosYCurso7.push(curso7);
            datosYCurso8.push(curso8);
            datosYCurso9.push(curso9);
            datosYCurso10.push(curso10);
            datosYCurso11.push(curso11);
            datosYCurso12.push(curso12);
            datosYCurso13.push(curso13);
            datosYCurso14.push(curso14);
            datosYCurso15.push(curso15);
            datosYCurso16.push(curso16);
            datosYCurso17.push(curso17);
            datosYCurso18.push(curso18);

            titulo = "Total de cursos: " + total;

        }

    }

    $("#labelDetalle").html("Cursos requeridos en la semana " + numSemana);
    graficaDetalle("#grafDetalle", datosYCurso1, datosYCurso2, datosYCurso3, datosYCurso4, datosYCurso5, datosYCurso6,
                                    datosYCurso7, datosYCurso8, datosYCurso9, datosYCurso10, datosYCurso11, datosYCurso12,
                                    datosYCurso13, datosYCurso14, datosYCurso15, datosYCurso16, datosYCurso17, datosYCurso18,
                                    titulo);

}


function graficaDetalle(idGrafica, datosCurso1, datosCurso2, datosCurso3, datosCurso4, datosCurso5, datosCurso6, datosCurso7,
                        datosCurso8, datosCurso9, datosCurso10, datosCurso11, datosCurso12, datosCurso13, datosCurso14,
                        datosCurso15, datosCurso16, datosCurso17, datosCurso18, titulo) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosCurso1,
                datosCurso2,
                datosCurso3,
                datosCurso4,
                datosCurso5,
                datosCurso6,
                datosCurso7,
                datosCurso8,
                datosCurso9,
                datosCurso10,
                datosCurso11,
                datosCurso12,
                datosCurso13,
                datosCurso14,
                datosCurso15,
                datosCurso16,
                datosCurso17,
                datosCurso18
            ],
            type: "donut",
            // onclick: function (d, i) { console.log("onclick", d, i); },
            // labels: true,
            // labels: {
            //     format: {
            //         curso1: function (v, id, i, j) {
            //             return v;
            //         },
            //         // curso1: d3.format(","),
            //         // asistencia: d3.format(","),
            //         // porcAsistencia: d3.format(",.2%")
            //     }
            // },
            // axes: {
            //     enviados: "y",
            //     asistencia: "y",
            //     porcAsistencia: "y2",
            // },
            // // groups: [
            // //     ["reincidencias", "vtaTecnico", "productividad", "materiales", "positiva"]
            // // ],
            order: null,
            colors: {
                curso1: "#E8DB87",
                curso2: "#993955",
                curso3: "#AE76A6",
                curso4: "#A3C3D9",
                curso5: "#CCD6EB",
                curso6: "#E8DB87",
                curso7: "#993955",
                curso8: "#AE76A6",
                curso9: "#A3C3D9",
                curso10: "#CCD6EB",
                curso11: "#E8DB87",
                curso12: "#993955",
                curso13: "#AE76A6",
                curso14: "#A3C3D9",
                curso15: "#CCD6EB",
                curso16: "#E8DB87",
                curso17: "#993955",
                curso18: "#AE76A6"
            },
            names: {
                curso1: "80-20",
                curso2: "Actividades m??ltiples",
                curso3: "Armado de conectores Prepulidos",
                curso4: "Armado de conectores RJ45",
                curso5: "Como subir tu venta en FFM",
                curso6: "Consumo de Materiales",
                curso7: "Servicio a Domicilio",
                curso8: "Entrega de Servicios",
                curso9: "Justificaci??n de Materiales",
                curso10: "Plan de Vida y Carrera",
                curso11: "Proceso de instalaci??n",
                curso12: "Enfoque a Calidad",
                curso13: "Productividad",
                curso14: "Reincidencias y revisi??n de herramientas",
                curso15: "Trayector??a, alturas y flejados",
                curso16: "Trayector??as",
                curso17: "Venta T??cnico",
                curso18: "Ventas"
            }
        },
        legend: {
            position: "right"
        },
        donut: {
            title: titulo,
            label: {
                format: function (value, ratio, id) {
                    return d3.format(',')(value);
                }
            }
        }
        // bar: {
        //     with: {
        //         ratio: 0.5
        //     }
        // },
        // axis: {
        //     x: {
        //         label: {
        //             text: "A??o - Semana",
        //             position: "outer-center"
        //         },
        //         type: 'category',
        //         categories: semAnioDetalle,
        //         tick: {
        //             rotate: -90,
        //             multiline: false
        //         },
        //         height: 80
        //     },
        //     y: {
        //         max: 13 // Moverlo con los datos reales
        //     },
        //     y2: {
        //         tick: {
        //             format: d3.format(",.2%")
        //         },
        //         // max: maxEjeY2,
        //         min: -1,
        //         padding: {
        //             // top: 0,
        //             bottom: 0
        //         },
        //         show: false
        //     }
        //     // rotated: true
        // },
        // grid: {
        //     y: {
        //         show: true
        //     }
        // },
        // zoom: {
        //     enabled: true
        // }

    });

    setTimeout(function () {
        chart.resize();
    }, 1000);

}
