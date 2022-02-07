var selecBacklog = 1,
    selecIncumplimiento = 0,
    selecTop = 0,
    selec72hrs = 0;

var Fecha_Descarga = [],
    CDD = [],
    ADDON = [],
    Soportes = [],
    Instalaciones = [],
    Recolecciones = [];

var fecha_apertura = [],
    incumplimientoAgenda = [],
    splitter = [],
    clienteReagenda = [],
    incumplimientoFueraTiempo = [],
    confirmacionVisita = [];

var renglones = [],
    titulos = [];

var listaBacklog = ["NACIONAL", "CENTRO-SUR", "NORTE-NORESTE", "OCCIDENTE-BAJIO"],
    listaPlaza = ["CIUDAD DE MEXICO", "GUADALAJARA", "CIUDAD JUAREZ", "MONTERREY", "SAN LUIS POTOSI",
                    "TIJUANA", "TOLUCA", "TAMPICO", "PUEBLA", "LEON", "CANCUN", "QUERETARO", "MERIDA",
                    "CUERNAVACA", "VERACRUZ", "CHIHUAHUA", "SALTILLO", "AGUASCALIENTES", "TUXTLA",
                    "PACHUCA", "CULIACAN", "CELAYA", "MEXICALI", "IRAPUATO", "XALAPA", "TORREON",
                    "MAZATLAN", "HERMOSILLO", "GUANAJUATO", "TEPIC", "COATZA / MINA", "PUERTO VALLARTA",
                    "VILLAHERMOSA", "CORDOBA / ORIZABA", "MORELIA", "COLIMA / MANZANILLO", "REYNOSA",
                    "POZA RICA", "CIUDAD OBREGON / NAVOJOA", "ACAPULCO"],
    listaDistrito = ["JUAREZ NORTE", "SAN LUIS POTOSI PONIENTE", "JUAREZ SUR", "TAMPICO",
                    "SAN LUIS POTOSI ORIENTE", "GDL LAZARO CARDENAS", "GDL LOPEZ MATEOS", "GDL LA PRIMAVERA",
                    "CENTRO HISTORICO", "TULTITLAN", "GDL COLOMOS", "TULTEPEC", "NUEVA CONDESA",
                    "MTY SANTA LUCIA", "MTY SENDERO DIVISORIO", "SANTA FE", "TIJ FRONTERA",
                    "MTY CARRETERA NACIONAL", "ARAGON", "TIJ TECATE", "GUADALUPE TEPEYAC",
                    "MTY CERRO DE LA SILLA", "CANCUN", "TLALPAN", "QUERETARO", "TOL LERMA SAN MATEO", "DELTA",
                    "MTY MITRAS", "XOCHIMILCO", "TIJ PLAYAS", "COACALCO", "TIJ RIO", "NICOLAS ROMERO",
                    "GDL ESTADIO", "VERACRUZ", "PEDREGAL", "TOL SAN CARLOS", "TECAMAC", "CHALCO",
                    "MTY SIERRA MADRE", "LAS AGUILAS", "SALTILLO", "NEZA 2", "POLANCO", "GDL EL TAPATIO",
                    "IZTAPALAPA", "MTY AEROPUERTO", "AGUASCALIENTES", "PUE LORETO", "AZCAPOTZALCO",
                    "MERIDA NORTE", "ECATEPEC", "GDL BARRANCA", "TUXTLA", "PACHUCA", "AEROPUERTO", "TEXCOCO",
                    "PORTALES", "HUEHUETOCA", "PUE LA NORIA", "CHIHUAHUA DEL RELIZ", "CERRO GORDO", "NEZA 1",
                    "CELAYA", "SATELITE", "CUERNAVACA BUGAMBILIAS", "CONSTITUCION", "LOS REYES", "MERIDA SUR",
                    "CUERNAVACA DE CORTEZ", "MEXICALI", "GDL CHAPULTEPEC", "IRAPUATO", "MTY GARCIA", "XALAPA",
                    "PUE ANGELOPOLIS", "TOL METEPEC", "TLALNEPANTLA", "MAZATLAN", "CULIACAN", "HERMOSILLO",
                    "GUANAJUATO", "CHIHUAHUA CUMBRES", "TEPIC", "COATZA / MINA", "OJO DE AGUA", "PUERTO VALLARTA",
                    "VILLAHERMOSA", "CORDOBA / ORIZABA", "NAUCALPAN", "LA LAGUNA GOMEZ", "LOS MOCHIS", "MORELIA",
                    "COLIMA / MANZANILLO", "LA LAGUNA TORREON", "REYNOSA", "POZA RICA", "CIUDAD OBREGON / NAVOJOA",
                    "ACAPULCO"];

var aux;


$(document).ready(function () {

    // var meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

    // Primera ejecución
    document.getElementById("backlog").style.backgroundColor = "rgb(25, 86, 255)";
    document.getElementById("incumplimiento").style.backgroundColor = "rgb(25, 136, 255)";
    document.getElementById("top").style.backgroundColor = "rgb(25, 136, 255)";
    document.getElementById("mas72hrs").style.backgroundColor = "rgb(25, 136, 255)";

    $("#desPlaza").hide();
    $("#desDistrito").hide();
    dibujaGrafica("fuentes/Backlog_Nacional.csv", "#grafica1", "Fecha_Descarga");

    // Seleccionar menú Backlog
    $("#backlog").click(function() {
        
        console.log("Click Backlog");

        if (selecTop == 1) {
            $("#graficas").empty().append("<div class='col-md-12 col-sm-12'><div id='grafica1' class='tamanhoGrafica' style='text-align: center;'></div></div>");
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

        $("#opcDireccion").empty();
        $("#opcDireccion").append("<option selected>NACIONAL</option>");

        for (let i = 1; i < listaBacklog.length; i++) {
            $("#opcDireccion").append($("<option>", { value: listaBacklog[i], text: listaBacklog[i] }));
        }

        $("#desDireccion").show();
        $("#desPlaza").hide();
        $("#desDistrito").hide();

        dibujaGrafica("fuentes/Backlog_Nacional.csv", "#grafica1", "Fecha_Descarga");

    });

    // Seleccionar menú Incumplimiento
    $("#incumplimiento").click(function () {

        console.log("Click Incumplimiento");

        if (selecTop == 1) {
            $("#graficas").empty().append("<div class='col-md-12 col-sm-12'><div id='grafica1' class='tamanhoGrafica' style='text-align: center;'></div></div>");
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

        $("#opcDireccion").empty();
        $("#opcDireccion").append("<option selected>NACIONAL</option>");

        for (let i = 1; i < listaBacklog.length; i++) {
            $("#opcDireccion").append($("<option>", { value: listaBacklog[i], text: listaBacklog[i] }));
        }

        $("#desDireccion").show();
        $("#desPlaza").hide();
        $("#desDistrito").hide();

        lecturaCSV("fuentes/Nacional_incumplimientos.csv", "NACIONAL");

    });

    // Seleccionar menú Top del día
    $("#top").click(function () {

        console.log("Click Top del día");

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

        $("#desDireccion").hide();
        $("#desPlaza").hide();
        $("#desDistrito").hide();

        lecturaCSV("fuentes/TopPlaza.csv", "PLAZAS");
        lecturaCSV("fuentes/TopDistrito.csv", "DISTRITOS");

    });

    // Seleccionar menú Más de 72 hrs
    $("#mas72hrs").click(function () {

        console.log("Click Más de 72 hrs");

        if (selecTop == 1) {
            $("#graficas").empty().append("<div class='col-md-12 col-sm-12'><div id='grafica1' class='tamanhoGrafica' style='text-align: center;'></div></div>");
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

        $("#opcDireccion").empty();
        $("#opcDireccion").append("<option selected>NACIONAL</option>");

        for (let i = 1; i < listaBacklog.length; i++) {
            $("#opcDireccion").append($("<option>", { value: listaBacklog[i], text: listaBacklog[i] }));
        }

        $("#desDireccion").show();
        $("#desPlaza").hide();
        $("#desDistrito").hide();

        dibujaGrafica("fuentes/Backlog_72hrs_Nacional.csv", "#grafica1", "Fecha");

    });

    // Select de zonas
    $("#opcDireccion").on("change", function(event) {

        let valor = $("#opcDireccion option:selected").val();

        if (selecBacklog == 1) {
            
            if (valor == "NACIONAL") {

                $("#desPlaza").hide();
                $("#desDistrito").hide();

                $("#grafica1").html("");
                dibujaGrafica("fuentes/Backlog_Nacional.csv", "#grafica1", "Fecha_Descarga");
    
            } else {

                $("#opcPlaza").empty();
                $("#opcPlaza").append("<option disable selected>Seleccionar</option>");

                for (let i = 1; i < listaPlaza.length; i++) {
                    $("#opcPlaza").append($("<option>", { value: listaPlaza[i], text: listaPlaza[i] }));
                }

                $("#desPlaza").show();
                $("#desDistrito").hide();

                $("#grafica1").html("");
                lecturaCSV("fuentes/Backlog_Direcciones.csv", valor);
    
            }

        } else if(selecIncumplimiento == 1) {

            if (valor == "NACIONAL") {

                $("#desPlaza").hide();
                $("#desDistrito").hide();

                $("#grafica1").html("");
                lecturaCSV("fuentes/Nacional_incumplimientos.csv", "NACIONAL");

            } else {

                $("#opcPlaza").empty();
                $("#opcPlaza").append("<option disable selected>Seleccionar</option>");

                for (let i = 1; i < listaPlaza.length; i++) {
                    $("#opcPlaza").append($("<option>", { value: listaPlaza[i], text: listaPlaza[i] }));
                }

                $("#desPlaza").show();
                $("#desDistrito").hide();
                $("#grafica1").html("");

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

        let valor = $("#opcPlaza option:selected").val();

        $("#opcDistrito").empty();
        $("#opcDistrito").append("<option disable selected>Seleccionar</option>");

        for (let i = 1; i < listaDistrito.length; i++) {
            $("#opcDistrito").append($("<option>", { value: listaDistrito[i], text: listaDistrito[i] }));
        }

        $("#desDistrito").show();
        $("#grafica1").html("");

        if (selecBacklog == 1) {
            lecturaCSV("fuentes/Backlog_Plazas.csv", valor);
        } else if (selecIncumplimiento == 1) {
            lecturaCSV("fuentes/Plaza_incumplimientos.csv", valor);
        }

    });

    $("#opcDistrito").on("change", function (event) {

        let valor = $("#opcDistrito option:selected").val();

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
                confirmacionVisita: "#06336B",
                incumplimientoFueraTiempo: "#F59809",
                clienteReagenda: "#108326",
                splitter: "#C70039",
                incumplimientoAgenda: "#06336B"
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


function dibujaGraficaBarraTop(idGrafica) {

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
    
    console.log(documento);

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
    Fecha_Descarga.length = 0;
    CDD.length = 0;
    ADDON.length = 0;
    Soportes.length = 0;
    Instalaciones.length = 0;
    Recolecciones.length = 0;

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
                incumplimientoAgenda.push(parseFloat(element[5]));
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
                    incumplimientoAgenda.push(parseFloat(element[6]));
                    splitter.push(parseFloat(element[5]));
                    clienteReagenda.push(parseFloat(element[2]));

                }

            }
            
        }
        
        dibujaGraficaBarra("#grafica1");

    } else if (selecTop == 1) {

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

        if (direccionSeleccionada == "PLAZAS") {
            dibujaGraficaBarraTop("#grafica1");
        } else {
            dibujaGraficaBarraTop("#grafica2");
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
