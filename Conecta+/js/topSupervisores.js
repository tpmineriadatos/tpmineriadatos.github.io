var datosCompletosTopSuper = [],
    renglonesTopSuper = [];

var nacionalrenglonesTopSuper = [],
    direccionTopSuper = [],
    plazaTopSuper = [],
    distritoTopSuper = [];

var ejeXSupervisores = [];



function lecturaTopSuper(documento) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesTopSuper = data.split(/\r\n|\n/);
            renglonesTopSuper = renglonesTopSuper.filter((e, i) => i > 0);
            renglonesTopSuper = renglonesTopSuper.filter((e, i) => i < (renglonesTopSuper.length - 1));
            datosCompletosTopSuper.length = 0;

            for (let i = 0; i < renglonesTopSuper.length; i++) {
                const element = renglonesTopSuper[i].split(",");
                datosCompletosTopSuper.push(element);
            }

            llenaInfoTopSuper();

        }

    });

}


function llenaInfoTopSuper() {

    let valor = $("#opcDireccion option:selected").val();

    // semAnioTopSuper = [];
    direccionTopSuper = [];
    plazaTopSuper = [];
    distritoTopSuper = [];

    for (let i = 0; i < datosCompletosTopSuper.length; i++) {
        const element = datosCompletosTopSuper[i];
        direccionTopSuper.push([element[1], element[2], element[3], element[4]]);
    }

    selecDirecTopSuper(valor);

}


function selecDirecTopSuper(direccion) {

    let datosYPositivas = ["positivas"],
        datosYNegativas = ["negativas"];

    ejeXSupervisores = [];

    for (let i = 0; i < direccionTopSuper.length; i++) {

        const element = direccionTopSuper[i];
        let positivas = parseInt(element[2]),
            negativas = parseInt(element[3]);

        if (element[0] == direccion) {
            ejeXSupervisores.push(element[1]);
            datosYPositivas.push(positivas);
            datosYNegativas.push(negativas);
        }

    }

    graficaTopSuper("#grafTopSupervisores", datosYPositivas, datosYNegativas);

}


function graficaTopSuper(idGrafica, datosPositivas, datosNegativas) {

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
                categories: ejeXSupervisores,
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
