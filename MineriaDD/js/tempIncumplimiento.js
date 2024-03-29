var renglonesTempIncum = [],
    datosCompletosTempIncum = [];

var diarioDireccionTempIncum = [],
    diarioPlazaTempIncum = [],
    diarioDistritoTempIncum = [],
    semanalDireccionTempIncum = [],
    semanalPlazaTempIncum = [],
    semanalDistritoTempIncum = [];

var semanasTempIncum = [],
    diasTempIncum = [];

var direccionTempIncum = [],
    plazaTempIncum = [],
    distritoTempIncum = [];

var checks = 2;
var aux100 = "";

$(document).on("input", "input[name=temporalidad]", function () {
    muestraIncumplimiento();
});

$("#inputConfirmacion").change(function () {
    muestraIncumplimiento();
    // datosSemM3(this.checked);
});

$("#inputIncumplimientos").change(function () {
    muestraIncumplimiento();
    // datosSemM3(this.checked);
});


function lecturaCSVTempIncump(documento) {

    $.ajax({
        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesTempIncum = data.split(/\r\n|\n/);
            renglonesTempIncum = renglonesTempIncum.filter((e, i) => i > 0);
            renglonesTempIncum = renglonesTempIncum.filter((e, i) => i < (renglonesTempIncum.length - 1));
            datosCompletosTempIncum.length = 0;

            for (let i = 0; i < renglonesTempIncum.length; i++) {
                const element = renglonesTempIncum[i].split(",");
                datosCompletosTempIncum.push(element);
            }

            llenaInfoTempIncump();

        }
    });

}


function llenaInfoTempIncump() {
    
    diarioDireccionTempIncum = [];
    diarioPlazaTempIncum = [];
    diarioDistritoTempIncum = [];
    semanalDireccionTempIncum = [];
    semanalPlazaTempIncum = [];
    semanalDistritoTempIncum = [];

    semanasTempIncum = [];
    diasTempIncum = [];

    for (let i = 0; i < datosCompletosTempIncum.length; i++) {

        const element = datosCompletosTempIncum[i];
        
        if (element[0] == "DIARIA") {
            diasTempIncum.push(element[3]);
        } else {
            semanasTempIncum.push(element[3]);
        }

    }

    const listDist1 = new Set(diasTempIncum);
    const listDist2 = new Set(semanasTempIncum);

    diasTempIncum = [...listDist1];
    semanasTempIncum = [...listDist2];

    for (let i = 0; i < datosCompletosTempIncum.length; i++) {

        const element = datosCompletosTempIncum[i];

        if (element[0] == "DIARIA") {

            if (element[1] == "NACIONAL") {
                diarioDireccionTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8], element[9], element[3]]);
            } else if (element[1] == "DIRECCION") {
                diarioDireccionTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8], element[9], element[3]]);
            } else if ((element[1] == "PLAZA") || (element[1] == "REGION")) {
                diarioPlazaTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8], element[9], element[3]]);
            } else if (element[1] == "DISTRITO") {
                diarioDistritoTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8], element[9], element[3]]);
            }

        } else {

            if (element[1] == "NACIONAL") {
                semanalDireccionTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8], element[9], element[3]]);
            } else if (element[1] == "DIRECCION") {
                semanalDireccionTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8], element[9], element[3]]);
            } else if ((element[1] == "PLAZA") || (element[1] == "REGION")) {
                semanalPlazaTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8], element[9], element[3]]);
            } else if (element[1] == "DISTRITO") {
                semanalDistritoTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8], element[9], element[3]]);
            }

        }

    }

    muestraIncumplimiento();

}


function muestraIncumplimiento() {

    let valor = "";

    if ($("#desDistrito").is(":visible")) {

        valor = $("#opcDistrito option:selected").val();

        if (valor != "Seleccionar") {
            incumDistrito(valor);
        } else {
            valor = $("#opcPlaza option:selected").val();
            incumPlaza(valor);
        }

    } else if ($("#desPlaza").is(":visible")) {

        valor = $("#opcPlaza option:selected").val();

        if (valor != "Seleccionar") {
            incumPlaza(valor);
        } else {
            valor = $("#opcDireccion option:selected").val();
            incumDireccion(valor);
        }

    } else {
        valor = $("#opcDireccion option:selected").val();
        incumDireccion(valor);
    }

}


function incumDireccion(direccion) {

    let datosYIncumplimientos = ["Incumplimientos"],
        datosYSoportes = ["Soportes"],
        datosYInstalaciones = ["Instalaciones"],
        datosYCambiosDomicilio = ["CambiosDomicilio"],
        datosYAdicionales = ["Adicionales"],
        datosYPorcAgendaTotal = ["PorcTotal"],
        datosEjeX = [];

    if ($("#diaria").prop("checked")) {

        console.log(datosEjeX);

        for (let i = 0; i < diarioDireccionTempIncum.length; i++) {

            const element = diarioDireccionTempIncum[i];

            if (element[0] == direccion) {

                datosYIncumplimientos.push(element[1]);
                datosYSoportes.push(element[2]);
                datosYInstalaciones.push(element[3]);
                datosYCambiosDomicilio.push(element[4]);
                datosYAdicionales.push(element[5]);
                datosYPorcAgendaTotal.push(element[6]);
                datosEjeX.push(element[7]);

            }

        }

    } else {

        for (let i = 0; i < semanalDireccionTempIncum.length; i++) {

            const element = semanalDireccionTempIncum[i];

            if (element[0] == direccion) {

                datosYIncumplimientos.push(element[1]);
                datosYSoportes.push(element[2]);
                datosYInstalaciones.push(element[3]);
                datosYCambiosDomicilio.push(element[4]);
                datosYAdicionales.push(element[5]);
                datosYPorcAgendaTotal.push(element[6]);
                datosEjeX.push(element[7]);

            }

        }

    }

    graficaIncumplimiento("#grafica3Incum", datosYIncumplimientos, datosYSoportes, datosYInstalaciones, datosYCambiosDomicilio, 
    datosYAdicionales, datosYPorcAgendaTotal, datosEjeX);

}


function incumPlaza(plaza) {

    let datosYIncumplimientos = ["Incumplimientos"],
        datosYSoportes = ["Soportes"],
        datosYInstalaciones = ["Instalaciones"],
        datosYCambiosDomicilio = ["CambiosDomicilio"],
        datosYAdicionales = ["Adicionales"],
        datosYPorcAgendaTotal = ["PorcTotal"],
        datosEjeX = [];

    if ($("#diaria").prop("checked")) {

        for (let i = 0; i < diarioPlazaTempIncum.length; i++) {

            const element = diarioPlazaTempIncum[i];

            if (element[0] == plaza) {

                datosYIncumplimientos.push(element[1]);
                datosYSoportes.push(element[2]);
                datosYInstalaciones.push(element[3]);
                datosYCambiosDomicilio.push(element[4]);
                datosYAdicionales.push(element[5]);
                datosYPorcAgendaTotal.push(element[6]);
                datosEjeX.push(element[7]);

            }

        }

    } else {

        for (let i = 0; i < semanalPlazaTempIncum.length; i++) {

            const element = semanalPlazaTempIncum[i];

            if (element[0] == plaza) {

                datosYIncumplimientos.push(element[1]);
                datosYSoportes.push(element[2]);
                datosYInstalaciones.push(element[3]);
                datosYCambiosDomicilio.push(element[4]);
                datosYAdicionales.push(element[5]);
                datosYPorcAgendaTotal.push(element[6]);
                datosEjeX.push(element[7]);

            }

        }

    }

    graficaIncumplimiento("#grafica3Incum", datosYIncumplimientos, datosYSoportes, datosYInstalaciones, datosYCambiosDomicilio,
        datosYAdicionales, datosYPorcAgendaTotal, datosEjeX);

}


function incumDistrito(distrito) {

    let datosYIncumplimientos = ["Incumplimientos"],
        datosYSoportes = ["Soportes"],
        datosYInstalaciones = ["Instalaciones"],
        datosYCambiosDomicilio = ["CambiosDomicilio"],
        datosYAdicionales = ["Adicionales"],
        datosYPorcAgendaTotal = ["PorcTotal"],
        datosEjeX = [];

    if ($("#diaria").prop("checked")) {

        for (let i = 0; i < diarioDistritoTempIncum.length; i++) {

            const element = diarioDistritoTempIncum[i];

            if (element[0] == distrito) {

                datosYIncumplimientos.push(element[1]);
                datosYSoportes.push(element[2]);
                datosYInstalaciones.push(element[3]);
                datosYCambiosDomicilio.push(element[4]);
                datosYAdicionales.push(element[5]);
                datosYPorcAgendaTotal.push(element[6]);
                datosEjeX.push(element[7]);

            }

        }
        
    } else {

        for (let i = 0; i < semanalDistritoTempIncum.length; i++) {

            const element = semanalDistritoTempIncum[i];

            if (element[0] == distrito) {

                datosYIncumplimientos.push(element[1]);
                datosYSoportes.push(element[2]);
                datosYInstalaciones.push(element[3]);
                datosYCambiosDomicilio.push(element[4]);
                datosYAdicionales.push(element[5]);
                datosYPorcAgendaTotal.push(element[6]);
                datosEjeX.push(element[7]);

            }

        }
        
    }

    graficaIncumplimiento("#grafica3Incum", datosYIncumplimientos, datosYSoportes, datosYInstalaciones, datosYCambiosDomicilio,
        datosYAdicionales, datosYPorcAgendaTotal, datosEjeX);

}


function graficaIncumplimiento(idGrafica, datosIncumplimientos, datosSoportes, datosInstalaciones, datosCDD, datosAddon, datosPorcTotal, ejeX) {

    chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosIncumplimientos,
                datosSoportes,
                datosInstalaciones,
                datosCDD,
                datosAddon,
                datosPorcTotal
            ],
            type: "bar",
            types: {
                PorcTotal: 'line',
            },
            axes: {
                Incumplimientos: "y",
                Soportes: "y",
                Instalaciones: "y",
                CambiosDomicilio: "y",
                Adicionales: "y",
                PorcTotal: "y2"
            },
            groups: [
                ["Incumplimientos", "Soportes", "Instalaciones", "CambiosDomicilio", "Adicionales"]
            ],
            order: null,
            colors: {
                Incumplimientos: "#FF7E10",
                Soportes: "#5171A5",
                Instalaciones: "#00B050",
                CambiosDomicilio: "#B8B42D",
                Adicionales: "#B5BDCF",
                PorcTotal: "#3D3B3B"
            },
            names: {
                Incumplimientos: "Incumplimientos",
                Soportes: "Soportes",
                Instalaciones: "Instalación",
                CambiosDomicilio: "Cambio de domicilio",
                Adicionales: "Adicionales",
                PorcTotal: "% Incum. total sobre total agendado"
            }
        },
        bar: {
            with: {
                ratio: 0.5
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: ejeX,
                tick: {
                    rotate: -90,
                    multiline: false,
                    culling: {
                        max: 40
                    }
                },
                height: 80
            },
            y2: {
                show: true,
                tick: {
                    format: d3.format(",.0%")
                }
            }
        },
        zoom: {
            enabled: true
        },
        tooltip: {
            format: {

                title: function (d) {

                    aux100 = ejeX[d];

                    let fechaHora = ejeX[d] + " 00:00:00",
                        auxFecha = new Date(fechaHora),
                        diaSemana = auxFecha.getDay(),
                        fechaFinal = "";

                    if ($("#diaria").prop("checked")) {
                        fechaFinal = ejeX[d] + " - " + diasSemana[diaSemana];
                    } else {
                        fechaFinal = ejeX[d];
                    }

                    return (fechaFinal);

                }

            },
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {

                d.sort(function (a, b) {
                    return b.value - a.value;
                });

                if (d.length > 2) {
                    
                    function key_for_sum(arr) {
    
                        let valor = (arr.id == "PorcTotal") ? 0 : arr.value;
                        return valor; //value is the key
    
                    }
    
                    function sum(prev, next) {
                        return prev + next;
                    }
    
                    var totals_object = {};
                    totals_object.x = d[0]['x'];
                    totals_object.value = d.map(key_for_sum).reduce(sum);// sum func
                    totals_object.name = 'Total';//total will be shown in tooltip
                    totals_object.index = d[0]['index'];
                    totals_object.id = 'total';//c3 will use this
                    d.push(totals_object);

                }

                var $$ = this,
                    config = $$.config,
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat = config.tooltip_format_name || function (name) {
                        return name;
                    },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor;

                for (i = 0; i < d.length; i++) {

                    if (!(d[i].value || d[i].value > 0)) {
                        continue;
                    }

                    if (!text) {
                        title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                        text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                    }

                    name = nameFormat(d[i].name);
                    value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
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
    }, 2000);

}
