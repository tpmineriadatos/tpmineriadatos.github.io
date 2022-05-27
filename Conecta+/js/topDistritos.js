var datosCompletosTopDist = [],
    renglonesTopDist = [];

var nacionalrenglonesTopDist = [],
    direccionTopDist = [],
    plazaTopDist = [],
    distritoTopDist = [];

var ejeXDistritos = [];



function lecturaTopDist(documento) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesTopDist = data.split(/\r\n|\n/);
            renglonesTopDist = renglonesTopDist.filter((e, i) => i > 0);
            renglonesTopDist = renglonesTopDist.filter((e, i) => i < (renglonesTopDist.length - 1));
            datosCompletosTopDist.length = 0;

            for (let i = 0; i < renglonesTopDist.length; i++) {
                const element = renglonesTopDist[i].split(",");
                datosCompletosTopDist.push(element);
            }

            llenaInfoTopDist();

        }

    });

}


function llenaInfoTopDist() {

    let valor = $("#opcDireccion option:selected").val();

    // semAnioTopDist = [];
    direccionTopDist = [];
    plazaTopDist = [];
    distritoTopDist = [];

    for (let i = 0; i < datosCompletosTopDist.length; i++) {
        const element = datosCompletosTopDist[i];
        direccionTopDist.push([element[1], element[2], element[3], element[4]]);
    }

    selecDirecTopDist(valor);

}


function selecDirecTopDist(direccion) {

    let datosYPositivas = ["positivas"],
        datosYNegativas = ["negativas"];

    ejeXDistritos = [];

    for (let i = 0; i < direccionTopDist.length; i++) {

        const element = direccionTopDist[i];
        let positivas = parseInt(element[2]),
            negativas = parseInt(element[3]);

        if (element[0] == direccion) {
            ejeXDistritos.push(element[1]);
            datosYPositivas.push(positivas);
            datosYNegativas.push(negativas);
        }

    }

    graficaTopDist("#grafTopDistritos", datosYPositivas, datosYNegativas);

}


function graficaTopDist(idGrafica, datosPositivas, datosNegativas) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosPositivas,
                datosNegativas
            ],
            type: "bar",
            // types: {
            //     porcTarjeta: "line",
            // },
            // labels: true,
            labels: {
                format: {
                    negativas: function (v, id, i, j) {
                        return (datosPositivas[i + 1] + datosNegativas[i + 1]);
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
                ["positivas", "negativas"]
            ],
            order: null,
            colors: {
                positivas: "#E8DB87",
                negativas: "#E26D5A"
            },
            names: {
                positivas: "Por mejor desempeño",
                negativas: "Por bajo desempeño"
            }
        },
        bar: {
            with: {
                ratio: 0.5
            }
        },
        axis: {
            x: {
                // label: {
                //     text: "Año - Semana",
                //     position: "outer-center"
                // },
                type: "category",
                categories: ejeXDistritos,
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
            rotated: true
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
