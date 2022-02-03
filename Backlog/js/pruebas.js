$(document).ready(function () {

    // var meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

    var chart = c3.generate({
        bindto: '#grafica1',
        data: {
            x: "Fecha_Descarga",
            url: "fuentes/BacklogNacional.csv",
            types: 'line'
        },
        point: {
            show: false
        },
        axis: {
            x: {
                type: "category",
                tick: {
                    rotate: 0,
                    multiline: true,
                    culling: {
                        max: 40
                    }
                },
                height: 150
            }
        }
    });

    console.log("prueba jquery");

    var x = "2021-06-01 00:00:00";

    console.log("x", x.substring(0, 10));

});