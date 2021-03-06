var topDistritosInc = [],
    incSemanaAnterior = [],
    incsemanaActual = [],
    incCrecimiento = [];

var topDistritosInc2 = [],
    incSemanaAnterior2 = [],
    incsemanaActual2 = [],
    incCrecimiento2 = [];

var numSemanaActual = 0,
    numSemanaAnterior = 0;


var aux3;



$(document).ready(function() {

    // Seleccionar menú Incumplimiento
    $("#incumplimiento").click(function () {

        document.getElementById("backlog").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("incumplimiento").style.backgroundColor = "rgb(31, 77, 155)";
        document.getElementById("top").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("mas72hrs").style.backgroundColor = "rgb(63, 124, 191)";

    });

    $("#incumIndicador").click(function () {

        $("#desDireccion").show();

        if (selecBacklog != 1) {

            valor = $("#opcDireccion option:selected").val();

            if (valor != "NACIONAL") {

                $("#desPlaza").show();
                $("#desDistrito").hide();

                $("#opcPlaza").empty();
                $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

                llenaListasPlaza(valor);

            }

        }

        $("#graficas").empty().append("<div class='col-md-11 col-sm-12'>"
                                        + "<div id='grafica1' class='tamanhoGrafica'>"
                                        + "</div></div>");

        $("#divGrafica").show();
        
        selecBacklog = 0;
        selecIncumplimiento = 1;
        selecTopIncumplimiento = 0;
        selecTop = 0;
        selec72hrs = 0;

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                lecturaCSV("fuentes/Distritos_incumplimientos.csv", valor);
            } else {
                valor = $("#opcPlaza option:selected").val();
                lecturaCSV("fuentes/Plaza_incumplimientos.csv", valor);
            }

        } else if ($("#desPlaza").is(":visible")) {

            valor = $("#opcPlaza option:selected").val();

            if (valor != "Seleccionar") {
                lecturaCSV("fuentes/Plaza_incumplimientos.csv", valor);
            } else {

                valor = $("#opcDireccion option:selected").val();

                if (valor == "NACIONAL") {
                    lecturaCSV("fuentes/Nacional_incumplimientos.csv", "NACIONAL");
                } else {
                    $("#grafica1").html("");
                }

            }

        } else {

            valor = $("#opcDireccion option:selected").val();

            if (valor == "NACIONAL") {
                lecturaCSV("fuentes/Nacional_incumplimientos.csv", "NACIONAL");
            } else {
                $("#grafica1").html("");
            }

        }

    });

    $("#incumTop").click(function () {

        $("#desPlaza").hide();
        $("#desDistrito").hide();
        $("#desDireccion").show();
        $("#divGrafica").show();

        $("#graficas").empty().append("<div class='col-md-6 col-sm-12' style='text-align: center;'><strong>"
                                        + "<label id='lblgrafica1' for='grafica1'>Top 10 BackLog - Plazas</label></strong><hr>"
                                        + "<div id='grafica1' class='tamanhoGrafica2'></div></div>"
                                        + "<div class='col-md-6 col-sm-12' style='text-align: center;'><strong>"
                                        + "<label id='lblgrafica2' for='grafica2'>Top 20 Backlog - Distritos</label></strong><hr>"
                                        + "<div id='grafica2' class='tamanhoGrafica2'></div></div>");

        selecBacklog = 0;
        selecIncumplimiento = 0;
        selecTopIncumplimiento = 1;
        selecTop = 0;
        selec72hrs = 0;

        valor = $("#opcDireccion option:selected").val();

        if (valor == "NACIONAL") {
            $("#lblgrafica1").html("Top 15 Distritos - Mayor incremento en incumplimiento");
            $("#lblgrafica2").html("Top 15 Distritos - Mayor decremento en incumplimiento");
        } else {
            $("#lblgrafica1").html("Top 5 Distritos - Mayor incremento en incumplimiento");
            $("#lblgrafica2").html("Top 5 Distritos - Mayor decremento en incumplimiento");
        }

        lecturaCSV("fuentes/Top10Incumplimientos.csv", valor);

    });

});


function datosTopIncumplimiento(direccionSeleccionada) {
    
    let incSemanaAnterior2Aux = [],
        incsemanaActual2Aux = [],
        incCrecimiento2Aux = [];
    
    let auxTitulos = renglones[0].split(",");
    
    topDistritosInc.length = 0;
    incSemanaAnterior.length = 0;
    incsemanaActual.length = 0;
    incCrecimiento.length = 0;

    topDistritosInc2.length = 0;
    incSemanaAnterior2.length = 0;
    incsemanaActual2.length = 0;
    incCrecimiento2.length = 0;

    incSemanaAnterior.push("semanaAnterior");
    incsemanaActual.push("semanaActual");
    incCrecimiento.push("crecimiento");

    incSemanaAnterior2.push("semanaAnterior");
    incsemanaActual2.push("semanaActual");
    incCrecimiento2.push("crecimiento");

    numSemanaActual = auxTitulos[2].substr(6, auxTitulos[2].length - 1);
    numSemanaAnterior = auxTitulos[3].substr(6, auxTitulos[3].length - 1);

    // Guarda los Peores
    for (let i = 1; i < renglones.length; i++) {

        const element = renglones[i].split(",");

        if ((element[0] == direccionSeleccionada) && (element[6] == "Peores")) {

            topDistritosInc.push(element[1]);
            incsemanaActual.push(parseFloat(element[2]));
            incSemanaAnterior.push(parseFloat(element[3]));
            incCrecimiento.push(parseFloat(element[4]));

        }

    }

    // Guarda los Mejores
    for (let i = 1; i < renglones.length; i++) {

        const element = renglones[i].split(",");

        if ((element[0] == direccionSeleccionada) && (element[6] == "Mejores")) {

            topDistritosInc2.push(element[1]);
            incsemanaActual2Aux.push(parseFloat(element[2]));
            incSemanaAnterior2Aux.push(parseFloat(element[3]));
            incCrecimiento2Aux.push(parseFloat(element[4]));

        }

    }

    topDistritosInc2.reverse();
    incsemanaActual2Aux.reverse();
    incSemanaAnterior2Aux.reverse();
    incCrecimiento2Aux.reverse();

    for (let i = 0; i < incsemanaActual2Aux.length; i++) {
        incSemanaAnterior2.push(incSemanaAnterior2Aux[i]);
        incsemanaActual2.push(incsemanaActual2Aux[i]);
        incCrecimiento2.push(Math.abs(incCrecimiento2Aux[i]));
    }

    graficaTop10Incumplimiento("#grafica1", topDistritosInc, incSemanaAnterior, incsemanaActual, incCrecimiento);
    graficaTop10Incumplimiento("#grafica2", topDistritosInc2, incSemanaAnterior2, incsemanaActual2, incCrecimiento2);

}


function graficaTop10Incumplimiento(idGrafica, ejeX, semanaAnterior, semanaActual, crecimiento) {

    let colorCrecimiento = (idGrafica == "#grafica1") ? "#9E1946" : "#0B5D1E";
    let increDecre = (idGrafica == "#grafica1") ? "Incremento semanal" : "Decremento semanal";
    let tituloSemAnterior = "Incumplimiento semana " + numSemanaAnterior;
    let tituloSemActual = "Incumplimiento semana " + numSemanaActual;
    
    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                semanaAnterior,
                semanaActual,
                crecimiento
            ],
            type: "bar",
            types: {
                crecimiento: 'line',
            },
            axes: {
                semanaAnterior: "y",
                semanaActual: "y",
                crecimiento: "y2",
            },
            labels: {
                format: {
                    crecimiento: d3.format(',')
                }
            },
            order: null,
            colors: {
                semanaAnterior: "#5E8C91",
                semanaActual: "#BFAB25",
                crecimiento: colorCrecimiento
            },
            names: {
                semanaAnterior: tituloSemAnterior,
                semanaActual: tituloSemActual,
                crecimiento: increDecre
            }
        },
        bar: {
            with: {
                ratio: 0.5
            }
        },
        axis: {
            x: {
                type: "category",
                categories: ejeX,
                tick: {
                    rotate: -90,
                    multiline: false
                },
                height: 80
            },
            rotated: true
        },
        grid: {
            y: {
                show: true
            }
        },
        zoom: {
            enabled: true
        }

    });

    setTimeout(function () {
        chart.resize();
    }, 300);

}
