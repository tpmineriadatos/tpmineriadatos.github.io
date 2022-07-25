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
                diarioDireccionTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8]]);
            } else if (element[1] == "DIRECCION") {
                diarioDireccionTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8]]);
            } else if (element[1] == "PLAZA") {
                diarioPlazaTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8]]);
            } else if (element[1] == "DISTRITO") {
                diarioDistritoTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8]]);
            }

        } else {

            if (element[1] == "NACIONAL") {
                semanalDireccionTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8]]);
            } else if (element[1] == "DIRECCION") {
                semanalDireccionTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8]]);
            } else if (element[1] == "PLAZA") {
                semanalPlazaTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8]]);
            } else if (element[1] == "DISTRITO") {
                semanalDistritoTempIncum.push([element[2], element[4], element[5], element[6], element[7], element[8]]);
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

    let datosYConfirmacion = ["Confirmacion"],
        datosYIncumplimientos = ["Incumplimientos"],
        datosYPorcConfirmacion = ["PorcConfirmacion"],
        datosYPorcIncumplimientos = ["PorcIncumplimientos"],
        datosYPorcTotal = ["PorcTotal"],
        datosEjeX = [];

    if ($("#diaria").prop("checked")) {

        datosEjeX = diasTempIncum;

        for (let i = 0; i < diarioDireccionTempIncum.length; i++) {

            const element = diarioDireccionTempIncum[i];

            if (element[0] == direccion) {

                datosYConfirmacion.push(element[1]);
                datosYIncumplimientos.push(element[2]);
                datosYPorcConfirmacion.push(element[3]);
                datosYPorcIncumplimientos.push(element[4]);
                datosYPorcTotal.push(element[5]);

            }

        }

    } else {

        datosEjeX = semanasTempIncum;

        for (let i = 0; i < semanalDireccionTempIncum.length; i++) {

            const element = semanalDireccionTempIncum[i];

            if (element[0] == direccion) {

                datosYConfirmacion.push(element[1]);
                datosYIncumplimientos.push(element[2]);
                datosYPorcConfirmacion.push(element[3]);
                datosYPorcIncumplimientos.push(element[4]);
                datosYPorcTotal.push(element[5]);

            }

        }

    }

    graficaIncumplimiento("#grafica1", datosYConfirmacion, datosYIncumplimientos, datosYPorcTotal, datosEjeX);

    if (!($("#inputIncumplimientos").prop("checked"))) {

        chart.load({
            columns: [
                datosYPorcConfirmacion
            ],
            types: {
                PorcConfirmacion: 'line'
            },
            axes: {
                PorcConfirmacion: "y2"
            },
            colors: {
                PorcConfirmacion: "#3D3B3B"
            },
            names: {
                PorcConfirmacion: "% Confir. visita total sobre total agendado"
            },
            unload: ["Incumplimientos", "PorcTotal"]
        });

    }

    if (!($("#inputConfirmacion").prop("checked"))) {
        
        chart.load({
            columns: [
                datosYPorcIncumplimientos
            ],
            types: {
                PorcIncumplimientos: 'line'
            },
            axes: {
                PorcIncumplimientos: "y2"
            },
            colors: {
                PorcIncumplimientos: "#3D3B3B"
            },
            names: {
                PorcIncumplimientos: "% Incumplimientos sobre total agendado"
            },
            unload: ["Confirmacion", "PorcTotal"]
        });

    }

}


function incumPlaza(plaza) {

    let datosYConfirmacion = ["Confirmacion"],
        datosYIncumplimientos = ["Incumplimientos"],
        datosYPorcConfirmacion = ["PorcConfirmacion"],
        datosYPorcIncumplimientos = ["PorcIncumplimientos"],
        datosYPorcTotal = ["PorcTotal"],
        datosEjeX = [];

    if ($("#diaria").prop("checked")) {

        for (let i = 0; i < diarioPlazaTempIncum.length; i++) {

            const element = diarioPlazaTempIncum[i];

            if (element[0] == plaza) {

                datosYConfirmacion.push(element[1]);
                datosYIncumplimientos.push(element[2]);
                datosYPorcConfirmacion.push(element[3]);
                datosYPorcIncumplimientos.push(element[4]);
                datosYPorcTotal.push(element[5]);

            }

        }

        datosEjeX = diasTempIncum;

    } else {

        for (let i = 0; i < semanalPlazaTempIncum.length; i++) {

            const element = semanalPlazaTempIncum[i];

            if (element[0] == plaza) {

                datosYConfirmacion.push(element[1]);
                datosYIncumplimientos.push(element[2]);
                datosYPorcConfirmacion.push(element[3]);
                datosYPorcIncumplimientos.push(element[4]);
                datosYPorcTotal.push(element[5]);

            }

        }

        datosEjeX = semanasTempIncum;

    }

    graficaIncumplimiento("#grafica1", datosYConfirmacion, datosYIncumplimientos, datosYPorcTotal, datosEjeX);

    if (!($("#inputIncumplimientos").prop("checked"))) {

        chart.load({
            columns: [
                datosYPorcConfirmacion
            ],
            types: {
                PorcConfirmacion: 'line'
            },
            axes: {
                PorcConfirmacion: "y2"
            },
            colors: {
                PorcConfirmacion: "#3D3B3B"
            },
            names: {
                PorcConfirmacion: "% Confir. visita total sobre total agendado"
            },
            unload: ["Incumplimientos", "PorcTotal"]
        });

    }

    if (!($("#inputConfirmacion").prop("checked"))) {

        chart.load({
            columns: [
                datosYPorcIncumplimientos
            ],
            types: {
                PorcIncumplimientos: 'line'
            },
            axes: {
                PorcIncumplimientos: "y2"
            },
            colors: {
                PorcIncumplimientos: "#3D3B3B"
            },
            names: {
                PorcIncumplimientos: "% Incumplimientos sobre total agendado"
            },
            unload: ["Confirmacion", "PorcTotal"]
        });

    }

}


function incumDistrito(distrito) {

    let datosYConfirmacion = ["Confirmacion"],
        datosYIncumplimientos = ["Incumplimientos"],
        datosYPorcConfirmacion = ["PorcConfirmacion"],
        datosYPorcIncumplimientos = ["PorcIncumplimientos"],
        datosYPorcTotal = ["PorcTotal"],
        datosEjeX = [];

    if ($("#diaria").prop("checked")) {

        for (let i = 0; i < diarioDistritoTempIncum.length; i++) {

            const element = diarioDistritoTempIncum[i];

            if (element[0] == distrito) {

                datosYConfirmacion.push(element[1]);
                datosYIncumplimientos.push(element[2]);
                datosYPorcConfirmacion.push(element[3]);
                datosYPorcIncumplimientos.push(element[4]);
                datosYPorcTotal.push(element[5]);

            }

        }

        datosEjeX = diasTempIncum;
        
    } else {

        for (let i = 0; i < semanalDistritoTempIncum.length; i++) {

            const element = semanalDistritoTempIncum[i];

            if (element[0] == distrito) {

                datosYConfirmacion.push(element[1]);
                datosYIncumplimientos.push(element[2]);
                datosYPorcConfirmacion.push(element[3]);
                datosYPorcIncumplimientos.push(element[4]);
                datosYPorcTotal.push(element[5]);

            }

        }

        datosEjeX = semanasTempIncum;
        
    }

    graficaIncumplimiento("#grafica1", datosYConfirmacion, datosYIncumplimientos, datosYPorcTotal, datosEjeX);

    if (!($("#inputIncumplimientos").prop("checked"))) {

        chart.load({
            columns: [
                datosYPorcConfirmacion
            ],
            types: {
                PorcConfirmacion: 'line'
            },
            axes: {
                PorcConfirmacion: "y2"
            },
            colors: {
                PorcConfirmacion: "#3D3B3B"
            },
            names: {
                PorcConfirmacion: "% Confir. visita total sobre total agendado"
            },
            unload: ["Incumplimientos", "PorcTotal"]
        });

    }

    if (!($("#inputConfirmacion").prop("checked"))) {

        chart.load({
            columns: [
                datosYPorcIncumplimientos
            ],
            types: {
                PorcIncumplimientos: 'line'
            },
            axes: {
                PorcIncumplimientos: "y2"
            },
            colors: {
                PorcIncumplimientos: "#3D3B3B"
            },
            names: {
                PorcIncumplimientos: "% Incumplimientos sobre total agendado"
            },
            unload: ["Confirmacion", "PorcTotal"]
        });

    }

}


function graficaIncumplimiento(idGrafica, datosYConfirmacion, datosIncumplimientos, datosPorcTotal, ejeX) {

    chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosYConfirmacion,
                datosIncumplimientos,
                datosPorcTotal
            ],
            type: "bar",
            types: {
                PorcTotal: 'line',
            },
            axes: {
                Confirmacion: "y",
                Incumplimientos: "y",
                PorcTotal: "y2",
            },
            groups: [
                ["Confirmacion", "Incumplimientos"]
            ],
            order: null,
            colors: {
                Confirmacion: "#1E78B6",
                Incumplimientos: "#FF7E10",
                PorcTotal: "#3D3B3B"
            },
            names: {
                Confirmacion: "Confirmación de visita",
                Incumplimientos: "Incumplimientos",
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

                    let fechaHora = ejeX[d] + " 00:00:00",
                        auxFecha = new Date(fechaHora),
                        diaSemana = auxFecha.getDay(),
                        fechaFinal = "";
                    // console.log(diasSemana[diaSemana]);

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

                    if (!(d[i] && (d[i].value || d[i].value === 0))) {
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
