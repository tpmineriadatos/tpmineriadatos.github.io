var selecBacklog = 1,
    selecIncumplimiento = 0,
    selecTopIncumplimiento = 0,
    selecTop = 0,
    selec72hrs = 0;

var Fecha_Descarga = [],
    CDD = [],
    ADDON = [],
    Soportes = [],
    Instalaciones = [],
    Recolecciones = [];

var Fecha_Descarga2 = [],
    CDD2 = [],
    ADDON2 = [],
    Soportes2 = [],
    Instalaciones2 = [],
    Recolecciones2 = [];

var fecha_apertura = [],
    incumplimientoAgenda = [],
    splitter = [],
    clienteReagenda = [],
    incumplimientoFueraTiempo = [],
    confirmacionVisita = [];

var renglones = [],
    titulos = [],
    renglones2 = [],
    titulos2 = [],
    renglones3 = [],
    titulos3 = [];

var listaBacklog = ["NACIONAL", "CENTRO", "NORTE-NORESTE", "OCCIDENTE-BAJIO","ORIENTE-SUR"],
    listaPlazas = [];

var fechasBacklogNacional = [],
    datosDireccion = [];
   
var diasSemana = { 0: "domingo", 1: "lunes", 2: "martes", 3: "miércoles", 4: "jueves", 5: "viernes", 6: "sábado" };

var aux, aux2;


$(document).ready(function () {

    let valor = "";

    // Primera ejecución
    document.getElementById("backlog").style.backgroundColor = "rgb(31, 77, 155)";
    document.getElementById("incumplimiento").style.backgroundColor = "rgb(63, 124, 191)";
    document.getElementById("top").style.backgroundColor = "rgb(63, 124, 191)";
    document.getElementById("mas72hrs").style.backgroundColor = "rgb(63, 124, 191)";

    $("#divGrafica").show();
    $("#desPlaza").hide();
    $("#desDistrito").hide();

    obtieneFechas("fuentes/Backlog_Nacional.csv");
    lecturaBacklogNacional();
    dibujaGrafica("fuentes/Backlog_Nacional.csv", "#grafica1", "Fecha_Descarga");

    // Seleccionar menú Backlog
    $("#backlog").click(function () {

        $("#desDireccion").show();

        if (selecIncumplimiento != 1) {

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
        
        selecBacklog = 1;
        selecIncumplimiento = 0;
        selecTopIncumplimiento = 0;
        selecTop = 0;
        selec72hrs = 0;

        document.getElementById("backlog").style.backgroundColor = "rgb(31, 77, 155)";
        document.getElementById("incumplimiento").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("top").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("mas72hrs").style.backgroundColor = "rgb(63, 124, 191)";

        $("#grafica1").html("");

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                lecturaCSV("fuentes/Backlog_Distritos.csv", valor);
            } else {
                valor = $("#opcPlaza option:selected").val();
                lecturaCSV("fuentes/Backlog_Plazas.csv", valor);
            }

        } else if ($("#desPlaza").is(":visible")) {

            valor = $("#opcPlaza option:selected").val();

            if (valor != "Seleccionar") {
                lecturaCSV("fuentes/Backlog_Plazas.csv", valor);
            } else {

                valor = $("#opcDireccion option:selected").val();

                if (valor == "NACIONAL") {
                    dibujaGrafica("fuentes/Backlog_Nacional.csv", "#grafica1", "Fecha_Descarga");
                } else {
                    lecturaCSV("fuentes/Backlog_Direcciones.csv", valor);
                }

            }

        } else {

            valor = $("#opcDireccion option:selected").val();

            if (valor == "NACIONAL") {
                dibujaGrafica("fuentes/Backlog_Nacional.csv", "#grafica1", "Fecha_Descarga");
            } else {
                lecturaCSV("fuentes/Backlog_Direcciones.csv", valor);
            }

        }

    });

    // Seleccionar menú Top del día
    $("#top").click(function () {

        $("#divGrafica").show();

        $("#graficas").empty().append("<div class='col-md-6 col-sm-12' style='text-align: center;'><strong>"
                                        + "<label id='lblgrafica1' for='grafica1'></label></strong><hr>"
                                        + "<div id='grafica1' class='tamanhoGrafica2'></div></div>"
                                        + "<div class='col-md-6 col-sm-12' style='text-align: center;'><strong>"
                                        + "<label id='lblgrafica2' for='grafica2'></label></strong><hr>"
                                        + "<div id='grafica2' class='tamanhoGrafica2'></div></div>");

        $("#lblgrafica1").html("Top 20 Distritos - Backlog<br>Actualización: " + convierteFecha(fechaHoy));
        $("#lblgrafica2").html("Top 20 Distritos - Incumplimiento<br>Actualización: " + convierteFecha(fechaAyer));

        // Coloca bandera de locación
        selecBacklog = 0;
        selecIncumplimiento = 0;
        selecTopIncumplimiento = 0;
        selecTop = 1;
        selec72hrs = 0;

        document.getElementById("backlog").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("incumplimiento").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("top").style.backgroundColor = "rgb(31, 77, 155)";
        document.getElementById("mas72hrs").style.backgroundColor = "rgb(63, 124, 191)";

        $("#desDireccion").show();
        $("#desPlaza").hide();
        $("#desDistrito").hide();

        valor = $("#opcDireccion option:selected").val();

        if (valor == "NACIONAL") {
            lecturaCSV("fuentes/TopDistrito.csv", "DISTRITOS");
            lecturaCSV("fuentes/TopIncumplimientos.csv", "PLAZAS");
        } else {
            $("#lblgrafica2").html("Top 15 Distritos - Incumplimiento<br>Actualización: " + convierteFecha(fechaAyer));
            lecturaCSV("fuentes/TopDirDistritos.csv", "TOPD");
            lecturaCSV("fuentes/TopIncumplimientos.csv", "TOPP");
        }

    });

    // Seleccionar menú Más de 72 hrs
    $("#mas72hrs").click(function () {

        $("#graficas").empty().append("<div class='col-md-11 col-sm-12'>"
                                        + "<div id='grafica1' class='tamanhoGrafica'>"
                                        + "</div></div>");

        $("#divGrafica").show();
        
        selecBacklog = 0;
        selecIncumplimiento = 0;
        selecTopIncumplimiento = 0;
        selecTop = 0;
        selec72hrs = 1;

        document.getElementById("backlog").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("incumplimiento").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("top").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("mas72hrs").style.backgroundColor = "rgb(31, 77, 155)";

        $("#desDireccion").show();
        $("#desPlaza").hide();
        $("#desDistrito").hide();

        valor = $("#opcDireccion option:selected").val();

        if (valor == "NACIONAL") {
            dibujaGrafica("fuentes/Backlog_72hrs_Nacional.csv", "#grafica1", "Fecha");
        } else {
            lecturaCSV("fuentes/Backlog_72hs_Direcciones.csv", valor);
        }

    });

    // Select de zonas
    $("#opcDireccion").on("change", function (event) {

        valor = $("#opcDireccion option:selected").val();

        if (selecBacklog == 1) {

            if (valor == "NACIONAL") {

                $("#desPlaza").hide();
                $("#desDistrito").hide();

                $("#grafica1").html("");
                dibujaGrafica("fuentes/Backlog_Nacional.csv", "#grafica1", "Fecha_Descarga");

            } else {

                $("#desPlaza").show();
                $("#desDistrito").hide();

                $("#grafica1").html("");
                lecturaCSV("fuentes/Backlog_Direcciones.csv", valor);

                $("#opcPlaza").empty();
                $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

                llenaListasPlaza(valor);

            }

        } else if (selecIncumplimiento == 1) {

            if (valor == "NACIONAL") {

                $("#desPlaza").hide();
                $("#desDistrito").hide();

                $("#grafica1").html("");
                lecturaCSV("fuentes/Nacional_incumplimientos.csv", "NACIONAL");

            } else {

                $("#opcPlaza").empty();
                $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

                llenaListasPlaza(valor);

                $("#desPlaza").show();
                $("#desDistrito").hide();
                $("#grafica1").html("");

            }

        } else if (selecTop == 1) {

            $("#desPlaza").hide();
            $("#desDistrito").hide();

            $("#grafica1").html("");
            $("#grafica2").html("");

            if (valor == "NACIONAL") {
                $("#lblgrafica2").html("Top 20 Distritos - Incumplimiento<br>Actualización: " + convierteFecha(fechaAyer));
                lecturaCSV("fuentes/TopDistrito.csv", "DISTRITOS");
                lecturaCSV("fuentes/TopIncumplimientos.csv", "PLAZAS");
            } else {
                $("#lblgrafica2").html("Top 15 Distritos - Incumplimiento<br>Actualización: " + convierteFecha(fechaAyer));
                lecturaCSV("fuentes/TopDirDistritos.csv", "TOPD");
                lecturaCSV("fuentes/TopIncumplimientos.csv", "TOPP");

            }

        } else if (selec72hrs == 1) {

            $("#desPlaza").hide();
            $("#desDistrito").hide();
            $("#grafica1").html("");

            if (valor == "NACIONAL") {
                dibujaGrafica("fuentes/Backlog_72hrs_Nacional.csv", "#grafica1", "Fecha");
            } else {
                lecturaCSV("fuentes/Backlog_72hs_Direcciones.csv", valor);
            }

        } else if (selecTopIncumplimiento == 1) {

            $("#grafica1").html("");
            $("#grafica2").html("");

            if (valor == "NACIONAL") {
                $("#lblgrafica1").html("Top 15 Distritos - Mayor incremento en incumplimiento");
                $("#lblgrafica2").html("Top 15 Distritos - Mayor decremento en incumplimiento");
            } else {
                $("#lblgrafica1").html("Top 5 Distritos - Mayor incremento en incumplimiento");
                $("#lblgrafica2").html("Top 5 Distritos - Mayor decremento en incumplimiento");
            }

            lecturaCSV("fuentes/Top10Incumplimientos.csv", valor);

        }

    });

    $("#opcPlaza").on("change", function (event) {

        valor = $("#opcPlaza option:selected").val();

        $("#desDistrito").show();

        if (selecBacklog == 1) {
            $("#grafica1").html("");
            lecturaCSV("fuentes/Backlog_Plazas.csv", valor);
        } else if (selecIncumplimiento == 1) {
            $("#grafica1").html("");
            lecturaCSV("fuentes/Plaza_incumplimientos.csv", valor);
        }

        $("#opcDistrito").empty();
        $("#opcDistrito").append("<option disabled selected>Seleccionar</option>");

        llenaListasDIstrito(valor);

    });

    $("#opcDistrito").on("change", function (event) {

        valor = $("#opcDistrito option:selected").val();

        if (selecBacklog == 1) {
            $("#grafica1").html("");
            lecturaCSV("fuentes/Backlog_Distritos.csv", valor);
        } else if (selecIncumplimiento == 1) {
            $("#grafica1").html("");
            lecturaCSV("fuentes/Distritos_incumplimientos.csv", valor);
        }

    });

});


function dibujaGrafica(urlDatos, idGrafica, valorX) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            x: valorX,
            url: urlDatos,
            types: "line",
            colors: {
                Instalaciones: "#108326",
                ADDON: "#06336B",
                CDD: "#F59809",
                Soportes: "#C70039",
                Recolecciones: "#079594"
            }
        },
        point: {
            show: false
        },
        axis: {
            x: {
                type: "category",
                tick: {
                    rotate: -90,
                    multiline: false,
                    culling: {
                        max: 40
                    }
                },
                height: 80
            }
        },
        zoom: {
            enabled: true
        },
        tooltip: {
            format: {

                title: function (d) {

                    let fechaHora = fechasBacklogNacional[d] + " 00:00:00",
                        auxFecha = new Date(fechaHora),
                        diaSemana = auxFecha.getDay();
                    // console.log(diasSemana[diaSemana]);
                    return (fechasBacklogNacional[d] + " - " + diasSemana[diaSemana]);

                }

            },
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {

                d.sort(function (a, b) {
                    return b.value - a.value;
                });

                function key_for_sum(arr) {

                    let valor = (arr.id == "incumplimientoAgenda") ? 0 : arr.value;
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
    }, 300);

}


function dibujaGraficaJSON(idGrafica, valorX) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            x: valorX,
            json: {
                Fecha_Descarga: Fecha_Descarga,
                CDD: CDD,
                ADDON: ADDON,
                Soportes: Soportes,
                Instalaciones: Instalaciones,
                Recolecciones: Recolecciones
            },
            types: "line",
            colors: {
                CDD: "#F59809",
                ADDON: "#06336B",
                Soportes: "#C70039",
                Instalaciones: "#108326",
                Recolecciones: "#079594"
            }
        },
        point: {
            show: false
        },
        axis: {
            x: {
                type: "category",
                tick: {
                    rotate: -90,
                    multiline: false,
                    culling: {
                        max: 40
                    }
                },
                height: 80
            }
        },
        zoom: {
            enabled: true
        },
        tooltip: {
            format: {

                title: function (d) {

                    let fechaHora = Fecha_Descarga[d] + " 00:00:00",
                        auxFecha = new Date(fechaHora),
                        diaSemana = auxFecha.getDay();
                    // console.log(diasSemana[diaSemana]);
                    return (Fecha_Descarga[d] + " - " + diasSemana[diaSemana]);

                }

            },
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {

                d.sort(function (a, b) {
                    return b.value - a.value;
                });

                function key_for_sum(arr) {

                    let valor = (arr.id == "incumplimientoAgenda") ? 0 : arr.value;
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
    }, 300);

}


function dibujaGraficaJSON72hrs(idGrafica, valorX) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            x: valorX,
            json: {
                Fecha: Fecha_Descarga,
                Soportes: Soportes,
                ADDON: ADDON,
                CDD: CDD
            },
            types: "line",
            colors: {
                Soportes: "#C70039",
                ADDON: "#06336B",
                CDD: "#F59809"
            }
        },
        point: {
            show: false
        },
        axis: {
            x: {
                type: "category",
                tick: {
                    rotate: -90,
                    multiline: false,
                    culling: {
                        max: 40
                    }
                },
                height: 80
            }
        },
        tooltip: {
            format: {

                title: function (d) {

                    let fechaHora = Fecha_Descarga[d] + " 00:00:00",
                        auxFecha = new Date(fechaHora),
                        diaSemana = auxFecha.getDay();
                    // console.log(diasSemana[diaSemana]);
                    return (Fecha_Descarga[d] + " - " + diasSemana[diaSemana]);

                }

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


function dibujaGraficaBarra(idGrafica) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                confirmacionVisita,
                incumplimientoFueraTiempo,
                clienteReagenda,
                splitter,
                incumplimientoAgenda
            ],
            type: "bar",
            types: {
                incumplimientoAgenda: 'line',
            },
            axes: {
                confirmacionVisita: "y",
                incumplimientoFueraTiempo: "y",
                clienteReagenda: "y",
                splitter: "y",
                incumplimientoAgenda: "y2",
            },
            groups: [
                ["confirmacionVisita", "incumplimientoFueraTiempo", "clienteReagenda", "splitter"]
            ],
            order: null,
            colors: {
                confirmacionVisita: "#1E78B6",
                incumplimientoFueraTiempo: "#FF7E10",
                clienteReagenda: "#43933E",
                splitter: "#C72C30",
                incumplimientoAgenda: "#3D3B3B"
            },
            names: {
                confirmacionVisita: "Confirmación de visita",
                incumplimientoFueraTiempo: "Incumplimiento fuera de tiempo",
                clienteReagenda: "Cliente reagenda",
                splitter: "Splitter",
                incumplimientoAgenda: "% Incumplimiento sobre total agendado"
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
                categories: fecha_apertura,
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

                    let fechaHora = fecha_apertura[d] + " 00:00:00",
                        auxFecha = new Date(fechaHora),
                        diaSemana = auxFecha.getDay();
                    // console.log(diasSemana[diaSemana]);
                    return (fecha_apertura[d] + " - " + diasSemana[diaSemana]);

                }

            },
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {

                d.sort(function (a, b) {
                    return b.value - a.value;
                });

                function key_for_sum(arr) {

                    let valor = (arr.id == "incumplimientoAgenda") ? 0 : arr.value;
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
    }, 300);

}


function dibujaGraficaBarraTop(idGrafica, Fecha_Descarga, Instalaciones, ADDON, Soportes, CDD, Recolecciones) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                Instalaciones,
                ADDON,
                Soportes,
                CDD,
                Recolecciones
            ],
            type: "bar",
            labels: {
                format: {
                    Recolecciones: function (v, id, i, j) {
                        return (Instalaciones[i + 1] + ADDON[i + 1] + Soportes[i + 1] + CDD[i + 1] + Recolecciones[i + 1]);
                    },
                }
            },
            groups: [
                ["Instalaciones", "ADDON", "Soportes", "CDD", "Recolecciones"]
            ],
            order: null,
            colors: {
                CDD: "#F59809",
                ADDON: "#06336B",
                Soportes: "#C70039",
                Instalaciones: "#108326",
                Recolecciones: "#079594"
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
                categories: Fecha_Descarga,
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


function dibujaGraficaBarraTopIncum(idGrafica, fecha_apertura, confirmacionVisita, incumplimientoFueraTiempo, clienteReagenda, splitter) {

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                confirmacionVisita,
                incumplimientoFueraTiempo,
                clienteReagenda,
                splitter,
                incumplimientoAgenda
            ],
            type: "bar",
            types: {
                incumplimientoAgenda: 'line',
            },
            axes: {
                confirmacionVisita: "y",
                incumplimientoFueraTiempo: "y",
                clienteReagenda: "y",
                splitter: "y",
                incumplimientoAgenda: "y2",
            },
            groups: [
                ["confirmacionVisita", "incumplimientoFueraTiempo", "clienteReagenda", "splitter"]
            ],
            order: null,
            colors: {
                confirmacionVisita: "#1E78B6",
                incumplimientoFueraTiempo: "#FF7E10",
                clienteReagenda: "#43933E",
                splitter: "#C72C30",
                incumplimientoAgenda: "#3D3B3B"
            },
            names: {
                confirmacionVisita: "Confirmación de visita",
                incumplimientoFueraTiempo: "Incumplimiento fuera de tiempo",
                clienteReagenda: "Cliente reagenda",
                splitter: "Splitter",
                incumplimientoAgenda: "% Incumplimiento sobre total agendado"
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
                categories: fecha_apertura,
                tick: {
                    rotate: -90,
                    multiline: false
                },
                height: 80
            },
            y2: {
                show: true,
                tick: {
                    format: d3.format(",.0%")
                }
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


function lecturaCSV(documento, direccion) {

    $.ajax({
        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglones = data.split(/\r\n|\n/);
            titulos = renglones[0].split(",");

            if (selecTopIncumplimiento == 1) {
                datosTopIncumplimiento(direccion);
            } else {
                datosDIreccionSeleccionada(direccion);
            }

        }
    });

}


function datosDIreccionSeleccionada(direccionSeleccionada) {

    // Limpian los arreglos lineales
    Fecha_Descarga.length = 0;
    CDD.length = 0;
    ADDON.length = 0;
    Soportes.length = 0;
    Instalaciones.length = 0;
    Recolecciones.length = 0;


    // Limpian los arreglos incumplimiento
    if (selecTop != 1) {

        fecha_apertura.length = 0;
        incumplimientoAgenda.length = 0;
        splitter.length = 0;
        clienteReagenda.length = 0;
        incumplimientoFueraTiempo.length = 0;
        confirmacionVisita.length = 0;

    }

    if (selecBacklog == 1) {

        for (let i = 1; i < renglones.length; i++) {

            const element = renglones[i].split(",");

            if (element[0] == direccionSeleccionada) {

                Fecha_Descarga.push(element[1]);
                CDD.push(parseFloat(element[2]));
                ADDON.push(parseFloat(element[3]));
                Soportes.push(parseFloat(element[4]));
                Instalaciones.push(parseFloat(element[5]));
                Recolecciones.push(parseFloat(element[6]));

            }

        }

        dibujaGraficaJSON("#grafica1", "Fecha_Descarga");

    } else if (selecIncumplimiento == 1) {

        confirmacionVisita.push("confirmacionVisita");
        incumplimientoFueraTiempo.push("incumplimientoFueraTiempo");
        incumplimientoAgenda.push("incumplimientoAgenda");
        splitter.push("splitter");
        clienteReagenda.push("clienteReagenda");

        if (direccionSeleccionada == "NACIONAL") {

            for (let i = 1; i < renglones.length; i++) {

                const element = renglones[i].split(",");

                fecha_apertura.push(element[0]);
                confirmacionVisita.push(parseFloat(element[2]));
                incumplimientoFueraTiempo.push(parseFloat(element[3]));
                incumplimientoAgenda.push(parseFloat(element[5]) / 100);
                splitter.push(parseFloat(element[4]));
                clienteReagenda.push(parseFloat(element[1]));

            }

        } else {

            for (let i = 1; i < renglones.length; i++) {

                const element = renglones[i].split(",");

                if (element[0] == direccionSeleccionada) {

                    fecha_apertura.push(element[1]);
                    confirmacionVisita.push(parseFloat(element[3]));
                    incumplimientoFueraTiempo.push(parseFloat(element[4]));
                    incumplimientoAgenda.push(parseFloat(element[6]) / 100);
                    splitter.push(parseFloat(element[5]));
                    clienteReagenda.push(parseFloat(element[2]));

                }

            }

        }

        dibujaGraficaBarra("#grafica1");

    } else if (selecTop == 1) {

        let valor = $("#opcDireccion option:selected").val();

        if (direccionSeleccionada == "PLAZAS") {

            fecha_apertura.length = 0;
            incumplimientoAgenda.length = 0;
            splitter.length = 0;
            clienteReagenda.length = 0;
            incumplimientoFueraTiempo.length = 0;
            confirmacionVisita.length = 0;

            confirmacionVisita.push("confirmacionVisita");
            incumplimientoFueraTiempo.push("incumplimientoFueraTiempo");
            incumplimientoAgenda.push("incumplimientoAgenda");
            splitter.push("splitter");
            clienteReagenda.push("clienteReagenda");

            for (let i = 1; i < renglones.length; i++) {

                const element = renglones[i].split(",");

                if (element[0] == valor) {

                    fecha_apertura.push(element[1]);
                    confirmacionVisita.push(parseFloat(element[3]));
                    incumplimientoFueraTiempo.push(parseFloat(element[4]));
                    incumplimientoAgenda.push(parseFloat(element[6]) / 100);
                    splitter.push(parseFloat(element[5]));
                    clienteReagenda.push(parseFloat(element[2]));

                }

            }

            dibujaGraficaBarraTopIncum("#grafica2", fecha_apertura, confirmacionVisita, incumplimientoFueraTiempo, clienteReagenda, splitter);

        } else if (direccionSeleccionada == "DISTRITOS") {

            Fecha_Descarga2.length = 0;
            CDD2.length = 0;
            ADDON2.length = 0;
            Soportes2.length = 0;
            Instalaciones2.length = 0;
            Recolecciones2.length = 0;

            CDD2.push("CDD");
            ADDON2.push("ADDON");
            Soportes2.push("Soportes");
            Instalaciones2.push("Instalaciones");
            Recolecciones2.push("Recolecciones");

            for (let i = 1; i < renglones.length; i++) {

                const element = renglones[i].split(",");

                Fecha_Descarga2.push(element[0]);
                CDD2.push(parseFloat(element[3]));
                ADDON2.push(parseFloat(element[2]));
                Soportes2.push(parseFloat(element[4]));
                Instalaciones2.push(parseFloat(element[1]));
                Recolecciones2.push(parseFloat(element[5]));

            }

            dibujaGraficaBarraTop("#grafica1", Fecha_Descarga2, Instalaciones2, ADDON2, Soportes2, CDD2, Recolecciones2);

        } else if (direccionSeleccionada == "TOPP") {

            fecha_apertura.length = 0;
            incumplimientoAgenda.length = 0;
            splitter.length = 0;
            clienteReagenda.length = 0;
            incumplimientoFueraTiempo.length = 0;
            confirmacionVisita.length = 0;

            confirmacionVisita.push("confirmacionVisita");
            incumplimientoFueraTiempo.push("incumplimientoFueraTiempo");
            incumplimientoAgenda.push("incumplimientoAgenda");
            splitter.push("splitter");
            clienteReagenda.push("clienteReagenda");

            for (let i = 1; i < renglones.length; i++) {

                const element = renglones[i].split(",");

                if (element[0] == valor) {

                    fecha_apertura.push(element[1]);
                    confirmacionVisita.push(parseFloat(element[3]));
                    incumplimientoFueraTiempo.push(parseFloat(element[4]));
                    incumplimientoAgenda.push(parseFloat(element[6]) / 100);
                    splitter.push(parseFloat(element[5]));
                    clienteReagenda.push(parseFloat(element[2]));

                }

            }

            dibujaGraficaBarraTopIncum("#grafica2", fecha_apertura, confirmacionVisita, incumplimientoFueraTiempo, clienteReagenda, splitter);

        } else if (direccionSeleccionada == "TOPD") {

            Fecha_Descarga2.length = 0;
            CDD2.length = 0;
            ADDON2.length = 0;
            Soportes2.length = 0;
            Instalaciones2.length = 0;
            Recolecciones2.length = 0;

            CDD2.push("CDD");
            ADDON2.push("ADDON");
            Soportes2.push("Soportes");
            Instalaciones2.push("Instalaciones");
            Recolecciones2.push("Recolecciones");

            for (let i = 1; i < renglones.length; i++) {

                const element = renglones[i].split(",");

                if (element[0] == valor) {

                    Fecha_Descarga2.push(element[1]);
                    CDD2.push(parseFloat(element[4]));
                    ADDON2.push(parseFloat(element[3]));
                    Soportes2.push(parseFloat(element[5]));
                    Instalaciones2.push(parseFloat(element[2]));
                    Recolecciones2.push(parseFloat(element[6]));

                }

            }

            dibujaGraficaBarraTop("#grafica1", Fecha_Descarga2, Instalaciones2, ADDON2, Soportes2, CDD2, Recolecciones2);

        }

    } else if (selec72hrs == 1) {

        for (let i = 1; i < renglones.length; i++) {

            const element = renglones[i].split(",");

            if (element[0] == direccionSeleccionada) {

                Fecha_Descarga.push(element[1]);
                Soportes.push(parseFloat(element[2]));
                ADDON.push(parseFloat(element[3]));
                CDD.push(parseFloat(element[4]));

            }

        }

        dibujaGraficaJSON72hrs("#grafica1", "Fecha");

    }

}


function llenaListasPlaza(direccionSelec) {

    $.ajax({
        type: "GET",
        url: "fuentes/Direccion.csv",
        dataType: "text",
        success: function (data) {
            renglones2 = data.split(/\r\n|\n/);
            titulos2 = renglones2[0].split(",");
            listasComboPlaza(direccionSelec);
        }
    });

}


function listasComboPlaza(direccionSelec) {

    let datoRepetido = "";

    listaPlazas.length = 0;

    for (let i = 1; i < renglones2.length; i++) {

        const element = renglones2[i].split(",");

        if (element[0] == direccionSelec) {

            if ((listaPlazas.length == 0) || (element[1] != datoRepetido)) {
                datoRepetido = element[1];
                listaPlazas.push(element[1]);
                $("#opcPlaza").append($("<option>", { value: element[1], text: element[1] }));
            }

        }

    }

}


function llenaListasDIstrito(plazaSeleccionada) {

    $.ajax({
        type: "GET",
        url: "fuentes/Direccion.csv",
        dataType: "text",
        success: function (data) {
            renglones3 = data.split(/\r\n|\n/);
            titulos3 = renglones2[0].split(",");
            listasComboDistrito(plazaSeleccionada);
        }
    });

}


function listasComboDistrito(plazaSeleccionada) {

    for (let i = 1; i < renglones3.length; i++) {

        const element = renglones3[i].split(",");

        if (element[1] == plazaSeleccionada) {
            $("#opcDistrito").append($("<option>", { value: element[2], text: element[2] }));
        }

    }

}


function obtieneFechas(documento) {

    $.ajax({
        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglones4 = data.split(/\r\n|\n/);
            titulos4 = renglones4[0].split(",");

            let indiceHoy = renglones4.length - 1;
            let indiceAyer = indiceHoy - 1;
            let datosHoy = renglones4[indiceHoy].split(",");
            let datosAyer = renglones4[indiceAyer].split(",");

            fechaHoy = datosHoy[0];
            fechaAyer = datosAyer[0];

        }

    });

}


function convierteFecha(fecha) {

    let faux = fecha.split("-");
    let fresult = faux.reverse().join("-");
    return fresult;

}


function lecturaBacklogNacional() {

    $.ajax({
        type: "GET",
        url: "fuentes/Backlog_Nacional.csv",
        dataType: "text",
        success: function (data) {

            renglones = data.split(/\r\n|\n/);
            titulos = renglones[0].split(",");

            for (let i = 1; i < renglones.length; i++) {
                const element = renglones[i].split(",");
                fechasBacklogNacional.push(element[0]);
            }

        }
    });

}
