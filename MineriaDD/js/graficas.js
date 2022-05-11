var selecBacklog = 0,
    selecIncumplimiento = 0,
    selecTopIncumplimiento = 0, // Agregarlo en todos los cambios de vista
    selecProductividad = 1, // Agregarlo y considerarlo
    selecReincidencias = 0,
    selecTR = 0,
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

var renglonesTabla = [],
    titulosTabla = [];

var datosCompleto = [],
    datosDireccion = [],
    listaRegion = [],
    listaDistritosProd = [],
    listaSupervisor = [],
    semanasReporte = [];

var pesosRelativos = { "addon": 1, "instCDD": 1.5, "empHS": 3, "soporProac": 1, "recol": 0.5 }

var btnAplicado = 1,
    semanaAct = "",
    nivelActualTabla = "";

var datosFiltroNacional = [],
    datosFiltroDireccion = [],
    datosFiltroRegion = [],
    datosFiltroDistrito = [],
    datosFiltroSupervisor = [],
    tablaActual = []; // revisar si vale la pena

var aux, aux2;


$(document).ready(function () {

    let valor = "";

    // Primera ejecución
    document.getElementById("productividad").style.backgroundColor = "rgb(31, 77, 155)";
    document.getElementById("reincidencias").style.backgroundColor = "rgb(63, 124, 191)";
    document.getElementById("backlog").style.backgroundColor = "rgb(63, 124, 191)";
    document.getElementById("incumplimiento").style.backgroundColor = "rgb(63, 124, 191)";
    document.getElementById("top").style.backgroundColor = "rgb(63, 124, 191)";
    document.getElementById("mas72hrs").style.backgroundColor = "rgb(63, 124, 191)";

    $("#divGrafica").hide();
    $("#divTabla").show();
    $("#tablaReincidencias").hide();
    $("#divReinTitulo").hide();
    $("#divGrafReincidencias").hide();
    $("#segundoNivel").show();
    $("#desSupervisor").hide();
    $("#kpiSegundoNivel").hide();

    // selecProductividad = 1;

    $("#desPlaza").hide();
    $("#desDistrito").hide();

    obtieneDatos();
    obtieneFechas("fuentes/Backlog_Nacional.csv");
    // dibujaGrafica("fuentes/Backlog_Nacional.csv", "#grafica1", "Fecha_Descarga");

    // Seleccionar menú Desempeño
    $("#productividad").click(function () {

        if (selecTop == 1) {
            $("#graficas").empty().append("<div class='col-md-12 col-sm-12'>"
                                            + "<div id='grafica1' class='tamanhoGrafica' style='text-align: center;'>"
                                            + "</div></div>");
        }

        $("#divGrafica").hide();
        $("#divTabla").show();
        $("#divAct").show();
        $("#imgConecta").show();
        $("#desDireccion").show();
        $("#kpiTodos").show();
        $("#desPlaza").hide();
        $("#tablaReincidencias").hide();
        $("#divReinTitulo").hide();
        $("#divGrafReincidencias").hide();
        $("#segundoNivel").show();
        $("#desSupervisor").hide();
        $("#kpiSegundoNivel").hide();

        // Coloca bandera de locación
        selecProductividad = 1;
        selecReincidencias = 0;
        selecTR = 0;
        selecBacklog = 0;
        selecIncumplimiento = 0;
        selecTopIncumplimiento = 0;
        selecTop = 0;
        selec72hrs = 0;

        document.getElementById("productividad").style.backgroundColor = "rgb(31, 77, 155)";
        document.getElementById("reincidencias").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("backlog").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("incumplimiento").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("top").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("mas72hrs").style.backgroundColor = "rgb(63, 124, 191)";

        valor = $("#opcDireccion option:selected").val();

        if (valor == "NACIONAL") {
            $("#desPlaza").hide();
            $("#desDistrito").hide();
            mostrarTablaCompleta();
        } else {

            mostrarTablaFiltro(valor, "direccion");

            $("#desDistrito").hide();
            $("#desPlaza").show();
            $("#lblOpcPlaza").html("&nbsp;&nbsp;&nbsp;Región");
            $("#opcPlaza").empty();
            $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

            listasComboRegion(valor);

        }

        $("#kpiRegion").html("");
        $("#kpiDistrito").html("");

    });

    // Seleccionar menú Backlog
    $("#backlog").click(function () {

        $("#desDireccion").show();

        if ((selecIncumplimiento != 1) && (selecTR != 1)) {

            if ((selecProductividad == 1) || (selecReincidencias == 1)) {

                // $("#divGrafica").show();
                $("#divTabla").hide();
                $("#divAct").hide();
                $("#imgConecta").hide();
                $("#lblOpcPlaza").html("Plaza");
                $("#desPlaza").hide();
                $("#desDistrito").hide();
                $("#kpiTodos").hide();
                $("#segundoNivel").hide();
                $("#kpiSegundoNivel").hide();

            }

            valor = $("#opcDireccion option:selected").val();

            if (valor != "NACIONAL") {

                $("#desPlaza").show();
                $("#desDistrito").hide();

                $("#opcPlaza").empty();
                $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

                llenaListasPlaza(valor);

            }

        }

        $("#graficas").empty().append("<div class='col-md-12 col-sm-12'>"
                                        + "<div id='grafica1' class='tamanhoGrafica' style='text-align: center;'>"
                                        + "</div></div>");

        $("#divGrafica").show();
        $("#tablaReincidencias").hide();
        $("#divReinTitulo").hide();
        $("#divGrafReincidencias").hide();

        // Coloca bandera de locación
        selecProductividad = 0;
        selecReincidencias = 0;
        selecTR = 0;
        selecBacklog = 1;
        selecIncumplimiento = 0;
        selecTopIncumplimiento = 0;
        selecTop = 0;
        selec72hrs = 0;

        document.getElementById("productividad").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("reincidencias").style.backgroundColor = "rgb(63, 124, 191)";
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

        if ((selecProductividad == 1) || (selecReincidencias == 1)) {

            // $("#divGrafica").show();
            $("#divTabla").hide();
            $("#divAct").hide();
            $("#imgConecta").hide();
            $("#desPlaza").hide();
            $("#desDistrito").hide();
            $("#kpiTodos").hide();
            $("#segundoNivel").hide();
            $("#kpiSegundoNivel").hide();

        }

        $("#divGrafica").show();
        $("#tablaReincidencias").hide();
        $("#divReinTitulo").hide();
        $("#divGrafReincidencias").hide();

        $("#graficas").empty().append("<div class='col-md-6 col-sm-12' style='text-align: center;'><strong>"
                                        + "<label id='lblgrafica1' for='grafica1'></label></strong><hr>"
                                        + "<div id='grafica1' class='tamanhoGrafica2'></div></div>"
                                        + "<div class='col-md-6 col-sm-12' style='text-align: center;'><strong>"
                                        + "<label id='lblgrafica2' for='grafica2'></label></strong><hr>"
                                        + "<div id='grafica2' class='tamanhoGrafica2'></div></div>");

        $("#lblgrafica1").html("Top 20 Distritos - Backlog<br>Actualización: " + convierteFecha(fechaHoy));
        $("#lblgrafica2").html("Top 20 Distritos - Incumplimiento<br>Actualización: " + convierteFecha(fechaAyer));

        // Coloca bandera de locación
        selecProductividad = 0;
        selecReincidencias = 0;
        selecTR = 0;
        selecBacklog = 0;
        selecIncumplimiento = 0;
        selecTopIncumplimiento = 0;
        selecTop = 1;
        selec72hrs = 0;

        document.getElementById("productividad").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("reincidencias").style.backgroundColor = "rgb(63, 124, 191)";
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

        if ((selecProductividad == 1) || (selecReincidencias == 1)) {

            // $("#divGrafica").show();
            $("#divTabla").hide();
            $("#divAct").hide();
            $("#imgConecta").hide();
            $("#kpiTodos").hide();
            $("#segundoNivel").hide();
            $("#kpiSegundoNivel").hide();

            valor = $("#opcDireccion option:selected").val();

            if (valor != "NACIONAL") {

                $("#desPlaza").show();
                $("#desDistrito").hide();

                $("#opcPlaza").empty();
                $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

                llenaListasPlaza(valor);

            }

        }

        $("#graficas").empty().append("<div class='col-md-12 col-sm-12'>"
                                        + "<div id='grafica1' class='tamanhoGrafica' style='text-align: center;'>"
                                        + "</div></div>");

        $("#divGrafica").show();
        $("#tablaReincidencias").hide();
        $("#divReinTitulo").hide();
        $("#divGrafReincidencias").hide();

        // Coloca bandera de locación
        selecProductividad = 0;
        selecReincidencias = 0;
        selecTR = 0;
        selecBacklog = 0;
        selecIncumplimiento = 0;
        selecTopIncumplimiento = 0;
        selecTop = 0;
        selec72hrs = 1;

        document.getElementById("productividad").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("reincidencias").style.backgroundColor = "rgb(63, 124, 191)";
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

        $("#lblOpcPlaza").html("Plaza");

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

        } else if (selecProductividad == 1) {

            if (valor == "NACIONAL") {

                $("#desPlaza").hide();
                $("#desDistrito").hide();
                $("#desSupervisor").hide();
                $("#kpiSegundoNivel").hide();
                mostrarTablaCompleta();

            } else {

                mostrarTablaFiltro(valor, "direccion");

                $("#desDistrito").hide();
                $("#desSupervisor").hide();
                $("#kpiSegundoNivel").hide();
                $("#lblOpcPlaza").html("&nbsp;&nbsp;&nbsp;Región");
                $("#opcPlaza").empty();
                $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

                listasComboRegion(valor);

            }

            $("#kpiRegion").html("");
            $("#kpiDistrito").html("");
            // $("#kpiSupervisor").html("");

        } else if (selecReincidencias == 1) {

            if (valor == "NACIONAL") {

                $("#desPlaza").hide();
                $("#desDistrito").hide();

                $("#grafica22").html("");
                $("#grafica3").html("");

                graficaBarraIDR("#grafica22", datosYIDR, datosYIDS, datosYRSS);
                graficaBarraTR("#grafica3", datosYOrdenes, datosYTicketRep);

            } else {

                $("#opcPlaza").empty();
                $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

                llenaListasPlaza(valor);

                $("#desPlaza").show();
                $("#desDistrito").hide();

                $("#grafica22").html("");
                $("#grafica3").html("");

                pintaGraficaIDRDir(valor);
                pintaGraficaTRDir(valor);

            }

        } else if (selecTopIncumplimiento == 1) {

            // $("#desPlaza").hide();
            // $("#desDistrito").hide();

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
        $("#desSupervisor").hide();
        $("#kpiSegundoNivel").hide();
        
        if (selecProductividad != 1) {

            if (selecBacklog == 1) {
                $("#grafica1").html("");
                lecturaCSV("fuentes/Backlog_Plazas.csv", valor);
            } else if (selecIncumplimiento == 1) {
                $("#grafica1").html("");
                lecturaCSV("fuentes/Plaza_incumplimientos.csv", valor);
            } else if (selecReincidencias == 1) {

                $("#grafica2").html("");
                $("#grafica3").html("");

                pintaGraficaIDRPlaza(valor);
                pintaGraficaTRPlaza(valor);

            }

            $("#opcDistrito").empty();
            $("#opcDistrito").append("<option disabled selected>Seleccionar</option>");

            llenaListasDIstrito(valor);

        } else {

            mostrarTablaFiltro(valor, "region");

            $("#opcDistrito").empty();
            $("#opcDistrito").append("<option disabled selected>Seleccionar</option>");

            listasComboDistritoProd(valor);

            $("#kpiDistrito").html("");
            // $("#kpiSupervisor").html("");

        }


    });

    $("#opcDistrito").on("change", function (event) {

        valor = $("#opcDistrito option:selected").val();

        $("#desSupervisor").show();
        $("#kpiSegundoNivel").show();

        if (selecProductividad != 1) {

            if (selecBacklog == 1) {
                $("#grafica1").html("");
                lecturaCSV("fuentes/Backlog_Distritos.csv", valor);
            } else if (selecIncumplimiento == 1) {
                $("#grafica1").html("");
                lecturaCSV("fuentes/Distritos_incumplimientos.csv", valor);
            } else if (selecReincidencias == 1) {

                $("#grafica2").html("");
                $("#grafica3").html("");

                pintaGraficaIDRDis(valor);
                pintaGraficaTRDis(valor);

            }

        } else {

            mostrarTablaFiltro(valor, "distrito");

            $("#opcSupervisor").empty();
            $("#opcSupervisor").append("<option disabled selected>Seleccionar</option>");

            listasComboSupervisor(valor);

            $("#kpiSupervisor").html("");

        }

    });

    $("#opcSupervisor").on("change", function (event) {
        valor = $("#opcSupervisor option:selected").val();
        mostrarTablaFiltro(valor, "supervisor");
    });

    // Select color de tarjeta
    $("#opcTarjeta").on("change", function (event) {
        valor = $("#opcTarjeta option:selected").val();
        cambioColorTarjeta(valor);
    });

    // Checkbox de semanas
    $("#semM2").change(function() {
        datosSemM2(this.checked);
    });

    $("#semM3").change(function() {
        datosSemM3(this.checked);
    });

    $("#semM4").change(function () {
        datosSemM4(this.checked);
    });

    $("#semM5").change(function () {
        datosSemM5(this.checked);
    });

    $("#btnExcel").jqxButton();

    $("#btnExcel").click(function () {
        $("#contenidoTabla").jqxGrid("exportview", "xlsx", "DesempeñoCuadrillasPI");
    });

    $("#contenidoTabla").on("filter", function (event) {

        console.log(event);
        aux2 = event;
        aux = $("#contenidoTabla").jqxGrid('getfilterinformation');

    });

});


function obtieneDatos() {

    $.ajax({
        type: "GET",
        url: "fuentes/ejercicioTabla.csv",
        dataType: "text",
        success: function (data) {
            renglonesTabla = data.split(/\r\n|\n/);
            titulosTabla = renglonesTabla[0].split(",");
            llenadoInfo();
        }
    });

}


function llenadoInfo() {

    let cantidadCeros = 0;
    datosCompleto.length = 0;
    semanasReporte.length = 0;

    for (let i = 1; i < renglonesTabla.length; i++) {

        const element = renglonesTabla[i].split(",");
        var row = {};

        semanasReporte.push(element[3]);

        if (parseFloat(element[13]) != 0) {

            let nreincidencias = parseFloat(element[10]);
            let nordenes = parseFloat(element[15]);
            let porcreincidencias = 0;

            if (nordenes > 0) {
                porcreincidencias = (nreincidencias / nordenes) * 100;
                porcreincidencias = porcreincidencias.toFixed(2);
            }

            row["direccion"] = element[0];
            row["region"] = element[1];
            row["distrito"] = element[2];
            row["semana"] = element[3];
            row["nsupervisor"] = element[4];
            row["nombresupervisor"] = element[5];
            row["ninstalador"] = element[6];
            row["nombreinstalador"] = element[7];
            row["empresa"] = element[14];
            row["productividad"] = parseFloat(element[9]).toFixed(1);
            row["numordenes"] = element[15];
            row["numreincidencias"] = element[10];
            row["porcreincidencias"] = porcreincidencias;
            row["diastrabajados"] = element[11];
            row["ventatecnico"] = element[12];
            row["calificacion"] = parseFloat(element[13]) * 100;

            row["addon"] = element[16];
            row["cddInstalaciones"] = element[17];
            row["empresarialHS"] = element[18];
            row["soporteProactiva"] = element[19];
            row["recolecciones"] = element[20];

            row["tarjetaamarilla"] = element[21];
            row["fechaultcurso"] = element[22];
            row["curso"] = element[23].toUpperCase();

            // row["cmcumplimiento"] = parseFloat(element[24]) * 100;
            row["fibra"] = element[25];
            row["promfibra"] = element[26];
            row["utp"] = element[27];
            row["promutp"] = element[28];

            datosCompleto.push(row);

        } else {
            cantidadCeros++;
        }

    }

    // aux = datosCompleto;
    console.log("cantidadCeros=", cantidadCeros);

    const listDist = new Set(semanasReporte);

    semanasReporte = [...listDist];
    semanasReporte.reverse();
    semanaAct = semanasReporte[0];

    let actSemana = "Última actualización: Semana " + ("0" + semanaAct).slice(-2) + "&nbsp;&nbsp;&nbsp;";

    $("#ultActualizacion").empty().html(actSemana);
    $("#numSemActual").empty().html(semanasReporte[0]);
    $("#numSemM2").empty().html(semanasReporte[1]);
    $("#numSemM3").empty().html(semanasReporte[2]);
    $("#numSemM4").empty().html(semanasReporte[3]);
    $("#numSemM5").empty().html(semanasReporte[4]);

    mostrarTablaCompleta();

}


function mostrarTablaCompleta() {

    let color = $("#opcTarjeta option:selected").val();

    datosNacionalFijos.length = 0;
    datosFiltroNacional.length = 0;

    for (let i = 0; i < datosCompleto.length; i++) {

        const element = datosCompleto[i];
        var row = {};

        if (element.semana == semanasReporte[0]) {
            
            row["semana"] = element.semana;
            row["direccion"] = element.direccion;
            row["region"] = element.region;
            row["distrito"] = element.distrito;
            row["nsupervisor"] = element.nsupervisor;
            row["nombresupervisor"] = element.nombresupervisor;
            row["ninstalador"] = element.ninstalador;
            row["nombreinstalador"] = element.nombreinstalador;
            row["empresa"] = element.empresa;
            row["productividad"] = element.productividad;
            row["numordenes"] = element.numordenes;
            row["numreincidencias"] = element.numreincidencias;
            row["porcreincidencias"] = element.porcreincidencias;
            row["diastrabajados"] = element.diastrabajados;
            row["ventatecnico"] = element.ventatecnico;
            row["calificacion"] = element.calificacion;
    
            row["addon"] = element.addon;
            row["cddInstalaciones"] = element.cddInstalaciones;
            row["empresarialHS"] = element.empresarialHS;
            row["soporteProactiva"] = element.soporteProactiva;
            row["recolecciones"] = element.recolecciones;
    
            row["tarjetaamarilla"] = element.tarjetaamarilla;
            row["fechaultcurso"] = element.fechaultcurso;
            row["curso"] = element.curso;

            // row["cmcumplimiento"] = element.cmcumplimiento;
            row["fibra"] = element.fibra;
            row["promfibra"] = element.promfibra;
            row["utp"] = element.utp;
            row["promutp"] = element.promutp;
    
            // datosImprimir.push(row);
            datosNacionalFijos.push(row);
            datosFiltroNacional.push(row);

        }

    }

    kpiProductividad(datosNacionalFijos, semanaAct, "Dirección");

    for (let i = 1; i < semanasReporte.length; i++) {
        nacionalFiltros(i);
    }

    tarjetaNacional(color);

    datosFiltroNacional.sort(function (a, b) {
        return a.calificacion - b.calificacion;
    });

    // aux = datosFiltroNacional;
    imprimeTabla(datosFiltroNacional, "nacional");

}


function mostrarTablaFiltro(filtro, combo) {

    // var datosImprimir = [];
    let tipo = "";

    if (combo == "direccion") {

        tipo = "Dirección";
        datosFiltroDireccion.length = 0;

        for (let i = 0; i < datosFiltroNacional.length; i++) {

            const element = datosFiltroNacional[i];

            if (element.direccion == filtro) {

                var row = {};

                row["semana"] = element.semana;
                row["direccion"] = element.direccion;
                row["region"] = element.region;
                row["distrito"] = element.distrito;
                row["nsupervisor"] = element.nsupervisor;
                row["nombresupervisor"] = element.nombresupervisor;
                row["ninstalador"] = element.ninstalador;
                row["nombreinstalador"] = element.nombreinstalador;
                row["empresa"] = element.empresa;
                row["productividad"] = element.productividad;
                row["numordenes"] = element.numordenes;
                row["numreincidencias"] = element.numreincidencias;
                row["porcreincidencias"] = element.porcreincidencias;
                row["diastrabajados"] = element.diastrabajados;
                row["ventatecnico"] = element.ventatecnico;
                row["calificacion"] = element.calificacion;

                row["addon"] = element.addon;
                row["cddInstalaciones"] = element.cddInstalaciones;
                row["empresarialHS"] = element.empresarialHS;
                row["soporteProactiva"] = element.soporteProactiva;
                row["recolecciones"] = element.recolecciones;

                row["tarjetaamarilla"] = element.tarjetaamarilla;
                row["fechaultcurso"] = element.fechaultcurso;
                row["curso"] = element.curso;

                // row["cmcumplimiento"] = element.cmcumplimiento;
                row["fibra"] = element.fibra;
                row["promfibra"] = element.promfibra;
                row["utp"] = element.utp;
                row["promutp"] = element.promutp;

                // datosImprimir.push(row);
                datosFiltroDireccion.push(row);

            }

        }

        // console.log("datosFiltroDireccion");
        // console.log(datosFiltroDireccion);

        // kpiProductividad(datosFiltroDireccion, semanaAct, tipo);
        kpiProductividad2(datosNacionalFijos, semanaAct, tipo, filtro);

        datosFiltroDireccion.sort(function (a, b) {
            return a.calificacion - b.calificacion;
        });

        imprimeTabla(datosFiltroDireccion, combo);

    } else if (combo == "region") {

        tipo = "Región";
        datosFiltroRegion.length = 0;

        for (let i = 0; i < datosFiltroDireccion.length; i++) {

            const element = datosFiltroDireccion[i];

            if (element.region == filtro) {

                var row = {};

                row["semana"] = element.semana;
                row["direccion"] = element.direccion;
                row["region"] = element.region;
                row["distrito"] = element.distrito;
                row["nsupervisor"] = element.nsupervisor;
                row["nombresupervisor"] = element.nombresupervisor;
                row["ninstalador"] = element.ninstalador;
                row["nombreinstalador"] = element.nombreinstalador;
                row["empresa"] = element.empresa;
                row["productividad"] = element.productividad;
                row["numordenes"] = element.numordenes;
                row["numreincidencias"] = element.numreincidencias;
                row["porcreincidencias"] = element.porcreincidencias;
                row["diastrabajados"] = element.diastrabajados;
                row["ventatecnico"] = element.ventatecnico;
                row["calificacion"] = element.calificacion;

                row["addon"] = element.addon;
                row["cddInstalaciones"] = element.cddInstalaciones;
                row["empresarialHS"] = element.empresarialHS;
                row["soporteProactiva"] = element.soporteProactiva;
                row["recolecciones"] = element.recolecciones;

                row["tarjetaamarilla"] = element.tarjetaamarilla;
                row["fechaultcurso"] = element.fechaultcurso;
                row["curso"] = element.curso;

                // row["cmcumplimiento"] = element.cmcumplimiento;
                row["fibra"] = element.fibra;
                row["promfibra"] = element.promfibra;
                row["utp"] = element.utp;
                row["promutp"] = element.promutp;

                // datosImprimir.push(row);
                datosFiltroRegion.push(row);

            }

        }

        // console.log("datosFiltroRegion");
        // console.log(datosFiltroRegion);

        // kpiProductividad(datosFiltroRegion, semanaAct, tipo);
        kpiProductividad2(datosNacionalFijos, semanaAct, tipo, filtro);

        datosFiltroRegion.sort(function (a, b) {
            return a.calificacion - b.calificacion;
        });

        imprimeTabla(datosFiltroRegion, combo);

    } else if (combo == "distrito") {

        tipo = "Distrito";
        datosFiltroDistrito.length = 0;

        for (let i = 0; i < datosFiltroRegion.length; i++) {

            const element = datosFiltroRegion[i];

            if (element.distrito == filtro) {

                var row = {};

                row["semana"] = element.semana;
                row["direccion"] = element.direccion;
                row["region"] = element.region;
                row["distrito"] = element.distrito;
                row["nsupervisor"] = element.nsupervisor;
                row["nombresupervisor"] = element.nombresupervisor;
                row["ninstalador"] = element.ninstalador;
                row["nombreinstalador"] = element.nombreinstalador;
                row["empresa"] = element.empresa;
                row["productividad"] = element.productividad;
                row["numordenes"] = element.numordenes;
                row["numreincidencias"] = element.numreincidencias;
                row["porcreincidencias"] = element.porcreincidencias;
                row["diastrabajados"] = element.diastrabajados;
                row["ventatecnico"] = element.ventatecnico;
                row["calificacion"] = element.calificacion;

                row["addon"] = element.addon;
                row["cddInstalaciones"] = element.cddInstalaciones;
                row["empresarialHS"] = element.empresarialHS;
                row["soporteProactiva"] = element.soporteProactiva;
                row["recolecciones"] = element.recolecciones;

                row["tarjetaamarilla"] = element.tarjetaamarilla;
                row["fechaultcurso"] = element.fechaultcurso;
                row["curso"] = element.curso;

                // row["cmcumplimiento"] = element.cmcumplimiento;
                row["fibra"] = element.fibra;
                row["promfibra"] = element.promfibra;
                row["utp"] = element.utp;
                row["promutp"] = element.promutp;

                // datosImprimir.push(row);
                datosFiltroDistrito.push(row);

            }

        }

        // console.log("datosFiltroDistrito");
        // console.log(datosFiltroDistrito);

        // kpiProductividad(datosFiltroDistrito, semanaAct, tipo);
        kpiProductividad2(datosNacionalFijos, semanaAct, tipo, filtro);

        datosFiltroDistrito.sort(function (a, b) {
            return a.calificacion - b.calificacion;
        });

        imprimeTabla(datosFiltroDistrito, combo);

    } else if (combo == "supervisor") {

        tipo = "Supervisor";
        datosFiltroSupervisor.length = 0;

        for (let i = 0; i < datosFiltroDistrito.length; i++) {

            const element = datosFiltroDistrito[i];

            if (element.nombresupervisor == filtro) {

                var row = {};

                row["semana"] = element.semana;
                row["direccion"] = element.direccion;
                row["region"] = element.region;
                row["distrito"] = element.distrito;
                row["nsupervisor"] = element.nsupervisor;
                row["nombresupervisor"] = element.nombresupervisor;
                row["ninstalador"] = element.ninstalador;
                row["nombreinstalador"] = element.nombreinstalador;
                row["empresa"] = element.empresa;
                row["productividad"] = element.productividad;
                row["numordenes"] = element.numordenes;
                row["numreincidencias"] = element.numreincidencias;
                row["porcreincidencias"] = element.porcreincidencias;
                row["diastrabajados"] = element.diastrabajados;
                row["ventatecnico"] = element.ventatecnico;
                row["calificacion"] = element.calificacion;

                row["addon"] = element.addon;
                row["cddInstalaciones"] = element.cddInstalaciones;
                row["empresarialHS"] = element.empresarialHS;
                row["soporteProactiva"] = element.soporteProactiva;
                row["recolecciones"] = element.recolecciones;

                row["tarjetaamarilla"] = element.tarjetaamarilla;
                row["fechaultcurso"] = element.fechaultcurso;
                row["curso"] = element.curso;

                // row["cmcumplimiento"] = element.cmcumplimiento;
                row["fibra"] = element.fibra;
                row["promfibra"] = element.promfibra;
                row["utp"] = element.utp;
                row["promutp"] = element.promutp;

                // datosImprimir.push(row);
                datosFiltroSupervisor.push(row);

            }

        }

        // console.log("datosFiltroSupervisor");
        // console.log(datosFiltroSupervisor);

        // kpiProductividad(datosFiltroSupervisor, semanaAct, tipo);
        kpiProductividad2(datosNacionalFijos, semanaAct, tipo, filtro);

        datosFiltroSupervisor.sort(function (a, b) {
            return a.calificacion - b.calificacion;
        });

        imprimeTabla(datosFiltroSupervisor, combo);

    }

}


function imprimeTabla(datos, combo) {

    tablaActual.length = 0;
    nivelActualTabla = combo;

    for (let i = 0; i < datos.length; i++) {
        tablaActual.push(datos[i]);
    }


    var source = {
        localData: datos,
        dataType: "array",
        dataFields:
            [
                { name: "semana", type: "number" },
                { name: "direccion", type: "string" },
                { name: "region", type: "string" },
                { name: "distrito", type: "string" },
                { name: "nsupervisor", type: "string" },
                { name: "nombresupervisor", type: "string" },
                { name: "ninstalador", type: "string" },
                { name: "nombreinstalador", type: "string" },
                { name: "empresa", type: "string" },
                { name: "diastrabajados", type: "number" },
                { name: "productividad", type: "number" },
                { name: "numordenes", type: "number" },
                { name: "numreincidencias", type: "number" },
                { name: "porcreincidencias", type: "number" },
                { name: "ventatecnico", type: "number" },
                { name: "calificacion", type: "number" },
                { name: "addon", type: "number" },
                { name: "cddInstalaciones", type: "number" },
                { name: "empresarialHS", type: "number" },
                { name: "soporteProactiva", type: "number" },
                { name: "recolecciones", type: "number" },

                { name: "tarjetaamarilla", type: "string" },
                { name: "fechaultcurso", type: "string" },
                { name: "curso", type: "string" },

                // { name: "cmcumplimiento", type: "number" },
                { name: "fibra", type: "number" },
                { name: "promfibra", type: "number" },
                { name: "utp", type: "number" },
                { name: "promutp", type: "number" }

            ]//,
        // sortcolumn: 'calificacion',
        // sortdirection: 'asc'
    };

    var cellclass = function (row, columnfield, value) {

        var rowData = $("#contenidoTabla").jqxGrid('getrowdata', row);
        var quantity = rowData.calificacion;

        if (quantity <= 70) {
            return "red";
        }// else if (quantity < 90) {
        //     return "yellow";
        // } else
        //     return "green";

    };

    var cellTarjeta = function (row, columnfield, value) {

        var rowData = $("#contenidoTabla").jqxGrid('getrowdata', row);
        var colorTarjeta = rowData.tarjetaamarilla;
        var quantity = rowData.calificacion;

        if (colorTarjeta == "Amarilla") {
            return "yellow";
        } else if (colorTarjeta == "Naranja") {
            return "naranja";
        } else if (colorTarjeta == "Morada") {
            return "morada";
        } else if (colorTarjeta == "Roja") {
            return "roja";
        } else if ((colorTarjeta == "-") && (quantity <= 70)) {
            return "red";
        }

    };

    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#contenidoTabla").jqxGrid({

        autoheight: true,
        autorowheight: true,
        width: "100%", // Ocupa toda la pantalla: "100%"
        // height: 720,
        theme: "ui-smoothness",
        // pageSize: 20,
        pageable: true, // Lo separa por hojas
        pagerButtonsCount: 5, // Número de hojas a elegir
        source: dataAdapter,
        columnsResize: true,
        sortable: true,
        sortmode: "many",
        filterable: true,
        // filtermode: "excel",
        autoshowfiltericon: true,
        pagesizeoptions: ['10', '20', '50', '100'],
        // altrows: true,
        // selectionmode: 'singlecell',
        columns: [
            { text: "Semana", dataField: "semana", width: 65, cellsAlign: "center", align: "center", cellclassname: cellclass },
            { text: "Dirección", dataField: "direccion", width: 160, cellsAlign: "left", cellclassname: cellclass },
            { text: "Región", dataField: "region", width: 160, cellsAlign: "left", cellclassname: cellclass },
            { text: "Distrito", dataField: "distrito", width: 160, cellsAlign: "left", cellclassname: cellclass },
            { text: "#Empleado Sup.", dataField: "nsupervisor", width: 160, align: "center", cellclassname: cellclass },
            { text: "Supervisor", dataField: "nombresupervisor", width: 200, align: "center", cellclassname: cellclass },
            { text: "#Empleado", dataField: "ninstalador", width: 160, align: "center", cellclassname: cellclass },
            { text: "Instalador", dataField: "nombreinstalador", width: 200, align: "center", cellclassname: cellclass },
            { text: "Empresa", dataField: "empresa", width: 200, align: "center", cellclassname: cellclass },

            { text: "Color Tarjeta", dataField: "tarjetaamarilla", cellsAlign: "center", align: "center", cellclassname: cellTarjeta },
            { text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fecha&nbsp;&nbsp;&nbsp;&nbsp;", columngroup: "ultcurso", dataField: "fechaultcurso", cellsAlign: "center", align: "center", cellclassname: cellclass },
            { text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Descripción&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", columngroup: "ultcurso", dataField: "curso", cellsAlign: "center", align: "center", cellclassname: cellclass },

            { text: "#Órd. en Fibra", columngroup: "sobreconsumo", dataField: "fibra", width: 100, cellsAlign: "center", align: "center", cellclassname: cellclass },
            { text: "Prom. sobreconsumo (mts.)", columngroup: "sobreconsumo", dataField: "promfibra", width: 100, cellsAlign: "center", align: "center", cellsformat: "n", cellclassname: cellclass },
            { text: "#Órd. en UTP", columngroup: "sobreconsumo", dataField: "utp", width: 100, cellsAlign: "center", align: "center", cellclassname: cellclass },
            { text: "Prom. sobreconsumo (mts.)", columngroup: "sobreconsumo", dataField: "promutp", width: 100, cellsAlign: "center", align: "center", cellsformat: "n", cellclassname: cellclass },
            // { text: "% Órdenes", columngroup: "sobreconsumo", dataField: "cmcumplimiento", width: 100, cellsAlign: "center", align: "center", cellsformat: "p0", cellclassname: cellclass },

            { text: "Obj: Igual a 6", columngroup: "dias", dataField: "diastrabajados", width: 120, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Obj: Mayor a 3.5", columngroup: "produc", dataField: "productividad", width: 100, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "OT Terminadas", columngroup: "nrein", dataField: "numordenes", width: 100, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Reincidencias", columngroup: "nrein", dataField: "numreincidencias", width: 100, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "%", columngroup: "nrein", dataField: "porcreincidencias", width: 100, cellsAlign: "right", align: "center", cellclassname: cellclass, cellsformat: "p2" },
            { text: "Obj: Mayor a 1", columngroup: "vtatec", dataField: "ventatecnico", width: 110, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Calificación", dataField: "calificacion", width: 100, cellsAlign: "right", align: "center", cellsformat: "p2", cellclassname: cellclass },
            { text: "ADDON", dataField: "addon", width: 65, cellsAlign: "center", align: "center", cellclassname: cellclass },
            { text: "Instalaciones + CDD", dataField: "cddInstalaciones", width: 65, cellsAlign: "center", align: "center", cellclassname: cellclass },
            { text: "Empresarial + Hogar Seguro", dataField: "empresarialHS", width: 65, cellsAlign: "center", align: "center", cellclassname: cellclass },
            { text: "Soportes + Órdenes Proactivas", dataField: "soporteProactiva", width: 65, cellsAlign: "center", align: "center", cellclassname: cellclass },
            { text: "Recolecciones", dataField: "recolecciones", width: 65, cellsAlign: "center", align: "center", cellclassname: cellclass }
        ],
        columngroups: [
            { text: "Último curso", align: "center", name: "ultcurso" },
            // { text: "% Órdenes con", align: "center", name: "consumo" },
            { text: "Sobreconsumo de materiales", align: "center", name: "sobreconsumo" },
            { text: "Asistencia: 20%", align: "center", name: "dias" },
            { text: "Productividad: 35%", align: "center", name: "produc" },
            { text: "% Reincidencias Pond: 40%", align: "center", name: "nrein" },
            { text: "Venta Técnico: 5%", align: "center", name: "vtatec" }
        ],
        ready: function () { // Solo se ejecuta la primera vez que se carga la tabla
            // $("#contenidoTabla").jqxGrid('sortby', 'calificacion', "asc");
            // $("#contenidoTabla").jqxGrid("sortby", "semana", "desc");
            $("#contenidoTabla").jqxGrid("autoresizecolumns");

            // $("#contenidoTabla").jqxGrid("hidecolumn", "addon");
            // $("#contenidoTabla").jqxGrid("hidecolumn", "cddInstalaciones");
            // $("#contenidoTabla").jqxGrid("hidecolumn", "empresarialHS");
            // $("#contenidoTabla").jqxGrid("hidecolumn", "soporteProactiva");
            // $("#contenidoTabla").jqxGrid("hidecolumn", "recolecciones");

        },

    });

    // $("#contenidoTabla").on("filter", function (event) {

    //     console.log(event);
    //     aux2 = event;
    //     aux = $("#contenidoTabla").jqxGrid('getfilterinformation');

    // });

    // $('#contenidoTabla').on('rowclick', function (event) {
    //     // event.args.rowindex is a bound index.
    //     aux2 = event;
    //     alert("Se seleccionó el supervisor: " + event.args.row.bounddata.nombresupervisor);
    // });


    /**
     * Control de las columnas de acuerdo al filtro aplicado
     */
    $("#contenidoTabla").jqxGrid("beginupdate");
    $("#contenidoTabla").jqxGrid("autoresizecolumns");

    if (combo == "nacional") {

        $("#contenidoTabla").jqxGrid("showcolumn", "direccion");
        $("#contenidoTabla").jqxGrid("showcolumn", "region");
        $("#contenidoTabla").jqxGrid("showcolumn", "distrito");
        $("#contenidoTabla").jqxGrid("showcolumn", "nsupervisor");
        $("#contenidoTabla").jqxGrid("showcolumn", "nombresupervisor");

    } else if (combo == "direccion") {

        $("#contenidoTabla").jqxGrid("hidecolumn", "direccion");
        $("#contenidoTabla").jqxGrid("showcolumn", "region");
        $("#contenidoTabla").jqxGrid("showcolumn", "distrito");
        $("#contenidoTabla").jqxGrid("showcolumn", "nsupervisor");
        $("#contenidoTabla").jqxGrid("showcolumn", "nombresupervisor");

    } else if (combo == "region") {

        $("#contenidoTabla").jqxGrid("hidecolumn", "direccion");
        $("#contenidoTabla").jqxGrid("hidecolumn", "region");
        $("#contenidoTabla").jqxGrid("showcolumn", "distrito");
        $("#contenidoTabla").jqxGrid("showcolumn", "nsupervisor");
        $("#contenidoTabla").jqxGrid("showcolumn", "nombresupervisor");

    } else if (combo == "distrito") {

        $("#contenidoTabla").jqxGrid("hidecolumn", "direccion");
        $("#contenidoTabla").jqxGrid("hidecolumn", "region");
        $("#contenidoTabla").jqxGrid("hidecolumn", "distrito");
        $("#contenidoTabla").jqxGrid("showcolumn", "nsupervisor");
        $("#contenidoTabla").jqxGrid("showcolumn", "nombresupervisor");

    } else if (combo == "supervisor") {

        $("#contenidoTabla").jqxGrid("hidecolumn", "direccion");
        $("#contenidoTabla").jqxGrid("hidecolumn", "region");
        $("#contenidoTabla").jqxGrid("hidecolumn", "distrito");
        $("#contenidoTabla").jqxGrid("hidecolumn", "nsupervisor");
        $("#contenidoTabla").jqxGrid("hidecolumn", "nombresupervisor");

    }

    // if (btnAplicado == 1) {

    //     $("#contenidoTabla").jqxGrid("showcolumn", "numordenes");
    //     $("#contenidoTabla").jqxGrid("showcolumn", "numreincidencias");
    //     $("#contenidoTabla").jqxGrid("showcolumn", "porcreincidencias");
    //     $("#contenidoTabla").jqxGrid("showcolumn", "ventatecnico");
    //     $("#contenidoTabla").jqxGrid("showcolumn", "calificacion");

    //     $("#contenidoTabla").jqxGrid("hidecolumn", "addon");
    //     $("#contenidoTabla").jqxGrid("hidecolumn", "cddInstalaciones");
    //     $("#contenidoTabla").jqxGrid("hidecolumn", "empresarialHS");
    //     $("#contenidoTabla").jqxGrid("hidecolumn", "soporteProactiva");
    //     $("#contenidoTabla").jqxGrid("hidecolumn", "recolecciones");

    // }

    // $("#contenidoTabla").jqxGrid("sortby", "calificacion", "asc");
    // $("#contenidoTabla").jqxGrid("sortby", "semana", "desc");
    $("#contenidoTabla").jqxGrid("endupdate");

    // $("#btnPDF").jqxButton();

    // $("#btnPDF").click(function () {
    //     $("#contenidoTabla").jqxGrid('exportdata', 'xlsx', 'jqxGrid');
    // });

}


function listasComboRegion(direccionSelec) {

    listaRegion.length = 0;

    for (let i = 0; i < datosNacionalFijos.length; i++) {

        const element = datosNacionalFijos[i];

        if (element.direccion == direccionSelec) {

            if ((listaRegion.length == 0) || !(listaRegion.includes(element.region))) {
                // datoRepetido = element.region;
                listaRegion.push(element.region);
                $("#opcPlaza").append($("<option>", { value: element.region, text: element.region }));
            }

        }

    }

    $("#desPlaza").show();

}


function listasComboDistritoProd(regionSelec) {

    listaDistritosProd.length = 0;

    for (let i = 0; i < datosNacionalFijos.length; i++) {

        const element = datosNacionalFijos[i];

        if (element.region == regionSelec) {

            if ((listaDistritosProd.length == 0) || !(listaDistritosProd.includes(element.distrito))) {
                // datoRepetido = element.distrito;
                listaDistritosProd.push(element.distrito);
                $("#opcDistrito").append($("<option>", { value: element.distrito, text: element.distrito }));
            }

        }

    }

    $("#desDistrito").show();

}


function listasComboSupervisor(distritoSelec) {

    listaSupervisor.length = 0;

    for (let i = 0; i < datosNacionalFijos.length; i++) {

        const element = datosNacionalFijos[i];

        if (element.distrito == distritoSelec) {

            if ((listaSupervisor.length == 0) || !(listaSupervisor.includes(element.nombresupervisor))) {
                listaSupervisor.push(element.nombresupervisor);
                $("#opcSupervisor").append($("<option>", { value: element.nombresupervisor, text: element.nombresupervisor }));
            }

        }

    }

    $("#desSupervisor").show();

}


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
        },
        tooltip: {
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {

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
            // labels: {
            //     format: {
            //         incumplimientoAgenda: function (v, id, i, j) {
            //             return ((incumplimientoAgenda[i + 1] * 100) + "%");
            //         },
            //     }
            // },
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


function kpiProductividad(datos, semana, nivel) {

    let divKPI = "";
    let prodAcum = 0,
        diasAcum = 0,
        kpiProd = 0;

    if (datos.length > 0) {

        let lon = datos.length - 1;

        for (let i = lon; i > 0; i--) {

            const element = datos[i];

            if (element.semana == semana) {

                let prod = 0;

                prod = element.addon * pesosRelativos.addon;
                prod += element.cddInstalaciones * pesosRelativos.instCDD;
                prod += element.empresarialHS * pesosRelativos.empHS;
                prod += element.soporteProactiva * pesosRelativos.soporProac;
                prod += element.recolecciones * pesosRelativos.recol;

                prodAcum += prod;
                diasAcum += parseFloat(element.diastrabajados);

            } else {
                break;
            }

        }

        kpiProd = (diasAcum == 0) ? 0 : (prodAcum / diasAcum).toFixed(2);

        if (nivel == "Dirección") {
            divKPI = "#kpiDireccion";
        } else if (nivel == "Región") {
            divKPI = "#kpiRegion";
        } else if (nivel == "Distrito") {
            divKPI = "#kpiDistrito";
        } else if (nivel == "Supervisor") {
            divKPI = "#kpiSupervisor";
        }

        $(divKPI).html("&nbsp;&nbsp;&nbsp;Productividad " + nivel + " = <strong>" + kpiProd + "</strong>");

    } else {
        console.log("Filtro sin información.");
        $(divKPI).html("&nbsp;&nbsp;&nbsp;Productividad " + nivel + " = <strong>-</strong>");
    }

}


function kpiProductividad2(datos, semana, nivel, opcSeleccionada) {

    let divKPI = "";
    let prodAcum = 0,
        diasAcum = 0,
        kpiProd = 0;

    if (nivel == "Dirección") {

        divKPI = "#kpiDireccion";

        if (datos.length > 0) {

            for (let i = 0; i < datos.length; i++) {

                const element = datos[i];
                
                if ((element.semana == semana) && (element.direccion == opcSeleccionada)) {

                    let prod = 0;

                    prod = element.addon * pesosRelativos.addon;
                    prod += element.cddInstalaciones * pesosRelativos.instCDD;
                    prod += element.empresarialHS * pesosRelativos.empHS;
                    prod += element.soporteProactiva * pesosRelativos.soporProac;
                    prod += element.recolecciones * pesosRelativos.recol;

                    prodAcum += prod;
                    diasAcum += parseFloat(element.diastrabajados);

                }
                
            }

            kpiProd = (diasAcum == 0) ? 0 : (prodAcum / diasAcum).toFixed(2);

            $(divKPI).html("&nbsp;&nbsp;&nbsp;Productividad " + nivel + " = <strong>" + kpiProd + "</strong>");

        } else {
            console.log("Filtro sin información en la dirección", opcSeleccionada);
            $(divKPI).html("&nbsp;&nbsp;&nbsp;Productividad " + nivel + " = <strong>-</strong>");
        }

    } else if (nivel == "Región") {

        divKPI = "#kpiRegion";

        if (datos.length > 0) {

            for (let i = 0; i < datos.length; i++) {

                const element = datos[i];

                if ((element.semana == semana) && (element.region == opcSeleccionada)) {

                    let prod = 0;

                    prod = element.addon * pesosRelativos.addon;
                    prod += element.cddInstalaciones * pesosRelativos.instCDD;
                    prod += element.empresarialHS * pesosRelativos.empHS;
                    prod += element.soporteProactiva * pesosRelativos.soporProac;
                    prod += element.recolecciones * pesosRelativos.recol;

                    prodAcum += prod;
                    diasAcum += parseFloat(element.diastrabajados);

                }

            }

            kpiProd = (diasAcum == 0) ? 0 : (prodAcum / diasAcum).toFixed(2);

            $(divKPI).html("&nbsp;&nbsp;&nbsp;Productividad " + nivel + " = <strong>" + kpiProd + "</strong>");

        } else {
            console.log("Filtro sin información en la dirección", opcSeleccionada);
            $(divKPI).html("&nbsp;&nbsp;&nbsp;Productividad " + nivel + " = <strong>-</strong>");
        }

    } else if (nivel == "Distrito") {

        divKPI = "#kpiDistrito";

        if (datos.length > 0) {

            for (let i = 0; i < datos.length; i++) {

                const element = datos[i];

                if ((element.semana == semana) && (element.distrito == opcSeleccionada)) {

                    let prod = 0;

                    prod = element.addon * pesosRelativos.addon;
                    prod += element.cddInstalaciones * pesosRelativos.instCDD;
                    prod += element.empresarialHS * pesosRelativos.empHS;
                    prod += element.soporteProactiva * pesosRelativos.soporProac;
                    prod += element.recolecciones * pesosRelativos.recol;

                    prodAcum += prod;
                    diasAcum += parseFloat(element.diastrabajados);

                }

            }

            kpiProd = (diasAcum == 0) ? 0 : (prodAcum / diasAcum).toFixed(2);

            $(divKPI).html("&nbsp;&nbsp;&nbsp;Productividad " + nivel + " = <strong>" + kpiProd + "</strong>");

        } else {
            console.log("Filtro sin información en la dirección", opcSeleccionada);
            $(divKPI).html("&nbsp;&nbsp;&nbsp;Productividad " + nivel + " = <strong>-</strong>");
        }

    } else if (nivel == "Supervisor") {

        divKPI = "#kpiSupervisor";

        if (datos.length > 0) {

            for (let i = 0; i < datos.length; i++) {

                const element = datos[i];

                if ((element.semana == semana) && (element.nombresupervisor == opcSeleccionada)) {

                    let prod = 0;

                    prod = element.addon * pesosRelativos.addon;
                    prod += element.cddInstalaciones * pesosRelativos.instCDD;
                    prod += element.empresarialHS * pesosRelativos.empHS;
                    prod += element.soporteProactiva * pesosRelativos.soporProac;
                    prod += element.recolecciones * pesosRelativos.recol;

                    prodAcum += prod;
                    diasAcum += parseFloat(element.diastrabajados);

                }

            }

            kpiProd = (diasAcum == 0) ? 0 : (prodAcum / diasAcum).toFixed(2);

            $(divKPI).html("&nbsp;&nbsp;&nbsp;Productividad " + nivel + " = <strong>" + kpiProd + "</strong>");

        } else {
            console.log("Filtro sin información en la dirección", opcSeleccionada);
            $(divKPI).html("&nbsp;&nbsp;&nbsp;Productividad " + nivel + " = <strong>-</strong>");
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
