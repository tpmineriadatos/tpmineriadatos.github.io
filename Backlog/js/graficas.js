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

        $("#grafica1").html("");
        dibujaGrafica("fuentes/Backlog_Nacional.csv", "#grafica1", "Fecha_Descarga");

    });

    // Seleccionar menú Incumplimiento
    $("#incumplimiento").click(function () {

        console.log("Click Incumplimiento");

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

        $("#grafica1").html("");
        // dibujaGrafica("fuentes/Nac_incump.csv", "#grafica1", "Fecha_Descarga");

    });

    // Seleccionar menú Top del día
    $("#top").click(function () {

        console.log("Click Top del día");

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

        $("#grafica1").html("");

    });

    // Seleccionar menú Más de 72 hrs
    $("#mas72hrs").click(function () {

        console.log("Click Más de 72 hrs");

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

        $("#grafica1").html("");
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

        for (let i = 1; i < listaPlaza.length; i++) {
            $("#opcDistrito").append($("<option>", { value: listaPlaza[i], text: listaPlaza[i] }));
        }

        $("#desDistrito").show();

        $("#grafica1").html("");
        lecturaCSV("fuentes/Backlog_Plazas.csv", valor);

    });

    $("#opcDistrito").on("change", function (event) {

        let valor = $("#opcDistrito option:selected").val();

        $("#grafica1").html("");
        lecturaCSV("fuentes/Backlog_Distritos.csv", valor);

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

    // Limpian los arreglos
    Fecha_Descarga.length = 0;
    CDD.length = 0;
    ADDON.length = 0;
    Soportes.length = 0;
    Instalaciones.length = 0;
    Recolecciones.length = 0;

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
