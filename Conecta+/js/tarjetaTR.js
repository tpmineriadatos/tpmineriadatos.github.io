var datosCompletosTarjTR = [],
    renglonesTarjTR = [];

var nacionalTarjTR = [],
    direccionTarjTR = [],
    plazaTarjTR = [],
    distritoTarjTR = [];

var semAnioTarjTR = [];



function lecturaTarjTR(documento, segmento, seleccion) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesTarjTR = data.split(/\r\n|\n/);
            renglonesTarjTR = renglonesTarjTR.filter((e, i) => i > 0);
            renglonesTarjTR = renglonesTarjTR.filter((e, i) => i < (renglonesTarjTR.length - 1));
            datosCompletosTarjTR.length = 0;

            for (let i = 0; i < renglonesTarjTR.length; i++) {
                const element = renglonesTarjTR[i].split(",");
                datosCompletosTarjTR.push(element);
            }

            llenaInfoTarjTR(segmento, seleccion);

        }

    });

}


function llenaInfoTarjTR(segmento, seleccion) {

    // let valor = $("#opcDireccion option:selected").val();

    semAnioTarjTR = [];
    direccionTarjTR = [];
    plazaTarjTR = [];
    distritoTarjTR = [];

    for (let i = 0; i < datosCompletosTarjTR.length; i++) {
        const element = datosCompletosTarjTR[i];
        semAnioTarjTR.push(element[9]);
    }

    const listDist2 = new Set(semAnioTarjTR);

    semAnioTarjTR = [...listDist2];
    semAnioTarjTR.sort();

    for (let i = 0; i < datosCompletosTarjTR.length; i++) {

        const element = datosCompletosTarjTR[i];

        if (element[0] == "NACIONAL") {
            // nacionalTarjTR.push([element[1], element[4], element[6]]);
            direccionTarjTR.push([element[1], element[4], element[5], element[6], element[7], element[8]]);
        } else if (element[0] == "DIRECCION") {
            direccionTarjTR.push([element[1], element[4], element[5], element[6], element[7], element[8]]);
        } else if (element[0] == "PLAZA") {
            plazaTarjTR.push([element[1], element[4], element[5], element[6], element[7], element[8]]);
        } else if (element[0] == "DISTRITO") {
            distritoTarjTR.push([element[1], element[4], element[5], element[6], element[7], element[8]]);
        }

    }

    if (segmento == "direccion") {
        selecDirecTarjTR(seleccion);
    } else if (segmento == "plaza") {
        selecPlazaTarjTR(seleccion);
    } else {
        selecDistTarjTR(seleccion);
    }

}


function selecDirecTarjTR(direccion) {

    let datosYAmarillas = ["amarillas"],
        datosYNaranjas = ["naranjas"],
        datosYMoradas = ["moradas"],
        datosYRojas = ["rojas"],
        datosYTR = ["numTR"];

    for (let i = 0; i < direccionTarjTR.length; i++) {

        const element = direccionTarjTR[i];

        if (element[0] == direccion) {

            let amarillas = parseInt(element[1]),
                naranjas = parseInt(element[2]),
                moradas = parseInt(element[3]),
                rojas = parseInt(element[4]);
            
            datosYAmarillas.push(amarillas);
            datosYNaranjas.push(naranjas);
            datosYMoradas.push(moradas);
            datosYRojas.push(rojas);
            datosYTR.push(element[5]);

        }

    }

    graficaTarjetaTR("#grafTarjetas", datosYAmarillas, datosYNaranjas, datosYMoradas, datosYRojas, datosYTR);

}


function selecPlazaTarjTR(plaza) {

    let datosYAmarillas = ["amarillas"],
        datosYNaranjas = ["naranjas"],
        datosYMoradas = ["moradas"],
        datosYRojas = ["rojas"],
        datosYTR = ["numTR"];

    for (let i = 0; i < plazaTarjTR.length; i++) {

        const element = plazaTarjTR[i];

        if (element[0] == plaza) {

            let amarillas = parseInt(element[1]),
                naranjas = parseInt(element[2]),
                moradas = parseInt(element[3]),
                rojas = parseInt(element[4]);

            datosYAmarillas.push(amarillas);
            datosYNaranjas.push(naranjas);
            datosYMoradas.push(moradas);
            datosYRojas.push(rojas);
            datosYTR.push(element[5]);

        }

    }

    graficaTarjetaTR("#grafTarjetas", datosYAmarillas, datosYNaranjas, datosYMoradas, datosYRojas, datosYTR);

}


function selecDistTarjTR(distrito) {

    let datosYAmarillas = ["amarillas"],
        datosYNaranjas = ["naranjas"],
        datosYMoradas = ["moradas"],
        datosYRojas = ["rojas"],
        datosYTR = ["numTR"];

    for (let i = 0; i < distritoTarjTR.length; i++) {

        const element = distritoTarjTR[i];

        if (element[0] == distrito) {

            let amarillas = parseInt(element[1]),
                naranjas = parseInt(element[2]),
                moradas = parseInt(element[3]),
                rojas = parseInt(element[4]);

            datosYAmarillas.push(amarillas);
            datosYNaranjas.push(naranjas);
            datosYMoradas.push(moradas);
            datosYRojas.push(rojas);
            datosYTR.push(element[5]);

        }

    }

    graficaTarjetaTR("#grafTarjetas", datosYAmarillas, datosYNaranjas, datosYMoradas, datosYRojas, datosYTR);

}


function graficaTarjetaTR(idGrafica, datosAmarillas, datosNaranjas, datosMoradas, datosRojas, datosTR) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosAmarillas,
                datosNaranjas,
                datosMoradas,
                datosRojas,
                datosTR
            ],
            type: "bar",
            labels: true,
            labels: {
                format: {
                    rojas: function (v, id, i, j) {
                        return (datosAmarillas[i + 1] + datosNaranjas[i + 1] + datosMoradas[i + 1] + datosRojas[i + 1]);
                    },
                    numTR: d3.format(",")
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
                rojas: "#ff0505",
                numTR: "#5E8C91"
            },
            names: {
                amarillas: "Amarillas",
                naranjas: "Naranjas",
                moradas: "Moradas",
                rojas: "Rojas",
                numTR: "Total de TR"
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
                categories: semAnioTarjTR,
                tick: {
                    rotate: -90,
                    multiline: false
                },
                height: 80
            },
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
    }, 300);

}
