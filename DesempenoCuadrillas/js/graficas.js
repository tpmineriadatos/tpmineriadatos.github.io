var selecBacklog = 1,
    selecIncumplimiento = 0,
    selecProductividad = 0; // Agregarlo y considerarlo
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

var listaBacklog = ["NACIONAL", "CENTRO-SUR", "NORTE-NORESTE", "OCCIDENTE-BAJIO"],
    listaPlazas = [];

var aux;


$(document).ready(function () {

    let valor = "";

    // Primera ejecución
    document.getElementById("backlog").style.backgroundColor = "rgb(25, 86, 255)";
    document.getElementById("incumplimiento").style.backgroundColor = "rgb(25, 136, 255)";
    document.getElementById("top").style.backgroundColor = "rgb(25, 136, 255)";
    document.getElementById("mas72hrs").style.backgroundColor = "rgb(25, 136, 255)";

    selecBacklog = 1;

    // llenaListasPlaza();

    $("#desPlaza").hide();
    $("#desDistrito").hide();
    dibujaGrafica("fuentes/Backlog_Nacional.csv", "#grafica1", "Fecha_Descarga");

    // Seleccionar menú Backlog
    $("#backlog").click(function() {

        if (selecTop == 1) {
            $("#graficas").empty().append("<div class='col-md-12 col-sm-12'>"
                                            + "<div id='grafica1' class='tamanhoGrafica' style='text-align: center;'>"
                                            + "</div></div>");
        }

        // Coloca bandera de locación
        selecBacklog = 1;
        selecIncumplimiento = 0;
        selecTop = 0;
        selec72hrs = 0;

        document.getElementById("backlog").style.backgroundColor = "rgb(25, 86, 255)";
        document.getElementById("incumplimiento").style.backgroundColor = "rgb(25, 136, 255)";
        document.getElementById("top").style.backgroundColor = "rgb(25, 136, 255)";
        document.getElementById("mas72hrs").style.backgroundColor = "rgb(25, 136, 255)";

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

    // Seleccionar menú Incumplimiento
    $("#incumplimiento").click(function () {

        if (selecTop == 1) {
            $("#graficas").empty().append("<div class='col-md-12 col-sm-12'>"
                                            + "<div id='grafica1' class='tamanhoGrafica' style='text-align: center;'>"
                                            + "</div></div>");
        }

        // Coloca bandera de locación
        selecBacklog = 0;
        selecIncumplimiento = 1;
        selecTop = 0;
        selec72hrs = 0;

        document.getElementById("backlog").style.backgroundColor = "rgb(25, 136, 255)";
        document.getElementById("incumplimiento").style.backgroundColor = "rgb(25, 86, 255)";
        document.getElementById("top").style.backgroundColor = "rgb(25, 136, 255)";
        document.getElementById("mas72hrs").style.backgroundColor = "rgb(25, 136, 255)";

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

    // Seleccionar menú Top del día
    $("#top").click(function () {

        $("#graficas").empty().append("<div class='col-md-6 col-sm-12' style='text-align: center;'><strong>"
                                        + "<label for='grafica1'>Top 10 BackLog - Plazas</label></strong><hr>"
                                        + "<div id='grafica1' class='tamanhoGrafica2'></div></div>"
                                        + "<div class='col-md-6 col-sm-12' style='text-align: center;'><strong>"
                                        + "<label for='grafica2'>Top 20 Backlog - Distritos</label></strong><hr>"
                                        + "<div id='grafica2' class='tamanhoGrafica2'></div></div>");

        // Coloca bandera de locación
        selecBacklog = 0;
        selecIncumplimiento = 0;
        selecTop = 1;
        selec72hrs = 0;

        document.getElementById("backlog").style.backgroundColor = "rgb(25, 136, 255)";
        document.getElementById("incumplimiento").style.backgroundColor = "rgb(25, 136, 255)";
        document.getElementById("top").style.backgroundColor = "rgb(25, 86, 255)";
        document.getElementById("mas72hrs").style.backgroundColor = "rgb(25, 136, 255)";

        $("#desDireccion").show();
        $("#desPlaza").hide();
        $("#desDistrito").hide();

        lecturaCSV("fuentes/TopPlaza.csv", "PLAZAS");
        lecturaCSV("fuentes/TopDistrito.csv", "DISTRITOS");

    });

    // Seleccionar menú Más de 72 hrs
    $("#mas72hrs").click(function () {

        if (selecTop == 1) {
            $("#graficas").empty().append("<div class='col-md-12 col-sm-12'>"
                                            + "<div id='grafica1' class='tamanhoGrafica' style='text-align: center;'>"
                                            + "</div></div>");
        }

        // Coloca bandera de locación
        selecBacklog = 0;
        selecIncumplimiento = 0;
        selecTop = 0;
        selec72hrs = 1;

        document.getElementById("backlog").style.backgroundColor = "rgb(25, 136, 255)";
        document.getElementById("incumplimiento").style.backgroundColor = "rgb(25, 136, 255)";
        document.getElementById("top").style.backgroundColor = "rgb(25, 136, 255)";
        document.getElementById("mas72hrs").style.backgroundColor = "rgb(25, 86, 255)";

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
    $("#opcDireccion").on("change", function(event) {

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

                // if (valor == "CENTRO-SUR") {
                //     for (let i = 0; i < listaCentro.length; i++) {
                //         $("#opcPlaza").append($("<option>", { value: listaCentro[i], text: listaCentro[i] }));
                //     }
                // } else if (valor == "NORTE-NORESTE") {
                //     for (let i = 0; i < listaNorte.length; i++) {
                //         $("#opcPlaza").append($("<option>", { value: listaNorte[i], text: listaNorte[i] }));
                //     }
                // } else if (valor == "OCCIDENTE-BAJIO") {
                //     for (let i = 0; i < listaOccidente.length; i++) {
                //         $("#opcPlaza").append($("<option>", { value: listaOccidente[i], text: listaOccidente[i] }));
                //     }
                // }

            }

        } else if(selecIncumplimiento == 1) {

            if (valor == "NACIONAL") {

                $("#desPlaza").hide();
                $("#desDistrito").hide();

                $("#grafica1").html("");
                lecturaCSV("fuentes/Nacional_incumplimientos.csv", "NACIONAL");

            } else {

                $("#opcPlaza").empty();
                $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

                if (valor == "CENTRO-SUR") {
                    for (let i = 0; i < listaCentro.length; i++) {
                        $("#opcPlaza").append($("<option>", { value: listaCentro[i], text: listaCentro[i] }));
                    }
                } else if (valor == "NORTE-NORESTE") {
                    for (let i = 0; i < listaNorte.length; i++) {
                        $("#opcPlaza").append($("<option>", { value: listaNorte[i], text: listaNorte[i] }));
                    }
                } else if (valor == "OCCIDENTE-BAJIO") {
                    for (let i = 0; i < listaOccidente.length; i++) {
                        $("#opcPlaza").append($("<option>", { value: listaOccidente[i], text: listaOccidente[i] }));
                    }
                }

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
                lecturaCSV("fuentes/TopPlaza.csv", "PLAZAS");
                lecturaCSV("fuentes/TopDistrito.csv", "DISTRITOS");
            } else {
                alert("Falta trabajar esta parte");
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

        }

    });

    $("#opcPlaza").on("change", function (event) {

        valor = $("#opcPlaza option:selected").val();
        
        $("#desDistrito").show();
        $("#grafica1").html("");
        
        if (selecBacklog == 1) {
            lecturaCSV("fuentes/Backlog_Plazas.csv", valor);
        } else if (selecIncumplimiento == 1) {
            lecturaCSV("fuentes/Plaza_incumplimientos.csv", valor);
        }
        
        $("#opcDistrito").empty();
        $("#opcDistrito").append("<option disabled selected>Seleccionar</option>");
        
        llenaListasDIstrito(valor);

    });

    $("#opcDistrito").on("change", function (event) {

        valor = $("#opcDistrito option:selected").val();

        $("#grafica1").html("");

        if (selecBacklog == 1) {
            lecturaCSV("fuentes/Backlog_Distritos.csv", valor);
        } else if (selecIncumplimiento == 1) {
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


function lecturaCSV(documento, direccion) {

    $.ajax({
        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {
            renglones = data.split(/\r\n|\n/);
            titulos = renglones[0].split(",");
            datosDIreccionSeleccionada(direccion);
        }
    });

}


function datosDIreccionSeleccionada(direccionSeleccionada) {

    // Limpian los arreglos lineales
    if (direccionSeleccionada != "DISTRITOS") {

        Fecha_Descarga.length = 0;
        CDD.length = 0;
        ADDON.length = 0;
        Soportes.length = 0;
        Instalaciones.length = 0;
        Recolecciones.length = 0;

    }

    // Limpian los arreglos incumplimiento
    fecha_apertura.length = 0;
    incumplimientoAgenda.length = 0;
    splitter.length = 0;
    clienteReagenda.length = 0;
    incumplimientoFueraTiempo.length = 0;
    confirmacionVisita.length = 0;

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
                incumplimientoAgenda.push(parseFloat(element[5])/100);
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
                    incumplimientoAgenda.push(parseFloat(element[6])/100);
                    splitter.push(parseFloat(element[5]));
                    clienteReagenda.push(parseFloat(element[2]));

                }

            }
            
        }
        
        dibujaGraficaBarra("#grafica1");

    } else if (selecTop == 1) {
        
        if (direccionSeleccionada == "PLAZAS") {

            CDD.push("CDD");
            ADDON.push("ADDON");
            Soportes.push("Soportes");
            Instalaciones.push("Instalaciones");
            Recolecciones.push("Recolecciones");
            
            for (let i = 1; i < renglones.length; i++) {
    
                const element = renglones[i].split(",");
    
                Fecha_Descarga.push(element[0]);
                CDD.push(parseFloat(element[3]));
                ADDON.push(parseFloat(element[2]));
                Soportes.push(parseFloat(element[4]));
                Instalaciones.push(parseFloat(element[1]));
                Recolecciones.push(parseFloat(element[5]));
    
            }

            dibujaGraficaBarraTop("#grafica1", Fecha_Descarga, Instalaciones, ADDON, Soportes, CDD, Recolecciones);

        } else {

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

            dibujaGraficaBarraTop("#grafica2", Fecha_Descarga2, Instalaciones2, ADDON2, Soportes2, CDD2, Recolecciones2);

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

    // for (let i = 1; i < renglones2.length; i++) {

    //     const element = renglones2[i].split(",");

    //     if (element[0] == "NORTE-NORESTE") {

    //         if ((listaNorte.length == 0) || (element[1] != datoRepetido)) {
    //             datoRepetido = element[1];
    //             listaNorte.push(element[1]);
    //         }

    //     }

    // }

    // for (let i = 1; i < renglones2.length; i++) {

    //     const element = renglones2[i].split(",");

    //     if (element[0] == "OCCIDENTE-BAJIO") {

    //         if ((listaOccidente.length == 0) || (element[1] != datoRepetido)) {
    //             datoRepetido = element[1];
    //             listaOccidente.push(element[1]);
    //         }

    //     }

    // }

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
