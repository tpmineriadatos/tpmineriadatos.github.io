var renglonesR = [],
    renglonesR2 = [],
    tablaGeneralAct = [],
    tablaFinal = [[]],
    distritos = [],
    distritosTemp = [],
    tecnicosTemp = []
    tec_nIncid = [],
    listaDistTecnicos = [],
    maximosIncidDist = [],
    datosAnteriores = [],
    semanas = [];

var datosCompletosTR = [],
    nacionalTR = [],
    direccionTR = [],
    plazaTR = [],
    distritoTR = [],
    ejeXSemanas = [],
    datosYOrdenes = ["numOrdenes"],
    datosYTicketRep = ["porcTicketRepetido"];

var renglonesIDR = [],
    datosCompletosIDR = [],
    nacionalIDR = [],
    direccionIDR = [],
    plazaIDR = [],
    distritoIDR = [],
    ejeXMeses = [],
    datosYIDR = ["idr"],
    datosYIDS = ["ids"],
    datosYRSS = ["rss"];

var fuenteSemAnt = ["fuentes/ReincSem_Actual_M2.csv",
                    "fuentes/ReincSem_Actual_M3.csv",
                    "fuentes/ReincSem_Actual_M4.csv",
                    "fuentes/ReincSem_Actual_M5.csv"];



$(document).ready(function() {

    /**
     * Selecciona la opción de Reincidencias
     */

    $("#reincidencias").click(function () {

        document.getElementById("productividad").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("reincidencias").style.backgroundColor = "rgb(31, 77, 155)";
        document.getElementById("backlog").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("incumplimiento").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("top").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("mas72hrs").style.backgroundColor = "rgb(63, 124, 191)";

        lecturaTR1("fuentes/IDR.csv");

    });

    $("#porTecnico").click(function () {

        if (selecTop == 1) {
            $("#graficas").empty().append("<div class='col-md-12 col-sm-12'>"
                                            + "<div id='grafica1' class='tamanhoGrafica' style='text-align: center;'>"
                                            + "</div></div>");
        }

        $("#divGrafica").hide();
        $("#divTabla").hide();
        $("#divAct").hide();
        $("#desDireccion").hide();
        $("#desPlaza").hide();
        $("#desDistrito").hide();
        $("#kpiTodos").hide();
        $("#segundoNivel").hide();
        $("#kpiSegundoNivel").hide();
        
        $("#imgConecta").show();
        $("#tablaReincidencias").show();
        $("#divReinTitulo").show();
        $("#divGrafReincidencias").hide();

        $("#tituloReincidencias").html("Reincidencias por Técnico");

        // Coloca bandera de locación
        selecProductividad = 0;
        selecReincidencias = 1;
        selecTR = 0;
        selecBacklog = 0;
        selecIncumplimiento = 0;
        selecTop = 0;
        selec72hrs = 0;

        lecturaTG("fuentes/ReincSem_Actual.csv");

    });

    $("#ticketRep").click(function () {

        if (selecTop == 1) {
            $("#graficas").empty().append("<div class='col-md-12 col-sm-12'>"
                                            + "<div id='grafica1' class='tamanhoGrafica' style='text-align: center;'>"
                                            + "</div></div>");
        }

        if ((selecBacklog != 1) && (selecIncumplimiento != 1)) {
            
            valor = $("#opcDireccion option:selected").val();

            if (valor != "NACIONAL") {

                $("#desPlaza").show();
                $("#desDistrito").hide();

                $("#opcPlaza").empty();
                $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

                llenaListasPlaza(valor);

            }

        }

        $("#divGrafica").hide();
        $("#divTabla").hide();
        $("#divAct").hide();
        $("#desDireccion").show();
        $("#kpiTodos").hide();
        $("#segundoNivel").hide();
        $("#kpiSegundoNivel").hide();

        $("#imgConecta").show();
        $("#tablaReincidencias").hide();
        $("#divGrafReincidencias").show();

        $("#divReinTitulo").hide();
        $("#lblOpcPlaza").html("Plaza");

        // Coloca bandera de locación
        selecProductividad = 0;
        selecReincidencias = 1;
        selecTR = 1;
        selecBacklog = 0;
        selecIncumplimiento = 0;
        selecTop = 0;
        selec72hrs = 0;

        $("#grafica2").html("");
        $("#grafica3").html("");

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                pintaGraficaIDRDis(valor);
                pintaGraficaTRDis(valor);
            } else {
                valor = $("#opcPlaza option:selected").val();
                pintaGraficaIDRPlaza(valor);
                pintaGraficaTRPlaza(valor);
            }

        } else if ($("#desPlaza").is(":visible")) {

            valor = $("#opcPlaza option:selected").val();

            if (valor != "Seleccionar") {
                pintaGraficaIDRPlaza(valor);
                pintaGraficaTRPlaza(valor);
            } else {

                valor = $("#opcDireccion option:selected").val();

                if (valor == "NACIONAL") {
                    graficaBarraIDR("#grafica2", datosYIDR, datosYIDS, datosYRSS);
                    graficaBarraTR("#grafica3", datosYOrdenes, datosYTicketRep);
                    $(".c3-text").removeAttr("style");
                } else {
                    pintaGraficaIDRDir(valor);
                    pintaGraficaTRDir(valor);
                }

            }

        } else {

            valor = $("#opcDireccion option:selected").val();

            if (valor == "NACIONAL") {
                graficaBarraIDR("#grafica2", datosYIDR, datosYIDS, datosYRSS);
                graficaBarraTR("#grafica3", datosYOrdenes, datosYTicketRep);
                $(".c3-text").removeAttr("style");
            } else {
                pintaGraficaIDRDir(valor);
                pintaGraficaTRDir(valor);
            }

        }

    });

});


function lecturaTG(documento) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {
            renglonesR = data.split(/\r\n|\n/);
            renglonesR = renglonesR.filter((e, i) => i > 0);
            segmentacion();

            for (let i = 0; i < fuenteSemAnt.length; i++) {
                lecturaTGAnterior(fuenteSemAnt[i], i);
            }
            
        }

    });

}


function lecturaTR1(documento) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesIDR = data.split(/\r\n|\n/);
            renglonesIDR = renglonesIDR.filter((e, i) => i > 0);
            renglonesIDR = renglonesIDR.filter((e, i) => i < (renglonesIDR.length - 1));
            datosCompletosIDR.length = 0;

            for (let i = 0; i < renglonesIDR.length; i++) {
                const element = renglonesIDR[i].split(",");
                datosCompletosIDR.push(element);
            }

            lecturaTR2("fuentes/TicketRepetido.csv");

        }

    });

}


function lecturaTR2(documento) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglonesR = data.split(/\r\n|\n/);
            renglonesR = renglonesR.filter((e, i) => i > 0);
            renglonesR = renglonesR.filter((e, i) => i < (renglonesR.length - 1));
            datosCompletosTR.length = 0;

            for (let i = 0; i < renglonesR.length; i++) {
                const element = renglonesR[i].split(",");
                datosCompletosTR.push(element);
            }

            llenaArreglosTR();
            llenaArreglosIDR();

        }

    });

}


function lecturaTGAnterior(documento, k) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            let tablaGeneralAnt = [];

            renglonesR2 = data.split(/\r\n|\n/);
            renglonesR2 = renglonesR2.filter((e, i) => i > 0);
            
            for (let i = 0; i < renglonesR2.length; i++) {
                const element = renglonesR2[i].split(",");
                tablaGeneralAnt.push(element);
            }

            datosAnteriores[k] = [];
            datosAnteriores[k] = tablaGeneralAnt;

            if (k == 3) {
                pintaTabla();
            }

        }

    });

}


function segmentacion() {

    let auxTec = "";
    let conteoTec = 0,
        conteoIncid = 0,
        maxIncidDist = 0,
        totalTecDist = 0,
        porcTecnicos = 0;
    
    /**
     * Obtiene el listado limpio de los Distritos
     */

    tablaGeneralAct.length = 0;
    distritosTemp.length = 0;
    listaDistTecnicos.length = 0;

    for (let i = 0; i < renglonesR.length; i++) {
        const element = renglonesR[i].split(",");
        tablaGeneralAct.push(element);
        distritosTemp.push(element[0]);
    }

    const listDist = new Set(distritosTemp);
    distritos = [...listDist];
    distritos.sort();
    tablaGeneralAct.sort();

    /**
     * Llenado por Distrito
     */
    for (let k = 0; k < distritos.length; k++) {

        tecnicosTemp.length = 0;
        tec_nIncid.length = 0;
        
        for (let i = 0; i < tablaGeneralAct.length; i++) {
            
            if (tablaGeneralAct[i][0] == distritos[k]) {
                tecnicosTemp.push(tablaGeneralAct[i][9]);
                totalTecDist = tablaGeneralAct[i][12];
            }
            
        }
    
        tecnicosTemp.sort();
    
        /**
         * Comienza conteo por #Tecnico
         */
        conteoTec = 0;

        for (let i = 0; i < (tecnicosTemp.length + 1); i++) {
            
            if (i == 0) {
                auxTec = tecnicosTemp[i];
            } else {
    
                if (tecnicosTemp[i] == auxTec) {
                    conteoTec++;
                } else {
    
                    conteoTec++;
                    tec_nIncid.push([auxTec, conteoTec]);
                    listaDistTecnicos.push([distritos[k], auxTec, conteoTec]);
                    auxTec = tecnicosTemp[i];
                    conteoTec = 0;
    
                }
    
            }
            
        }
    
        /**
         * Comienza conteo por #Incidencias
         */
        maxIncidDist = maxIncidenciasDistrito(tec_nIncid);
        maximosIncidDist.push(maxIncidDist);

        tablaFinal[k] = [];
        tablaFinal[k].push(distritos[k], totalTecDist);
    
        for (let i = 1; i < 16; i++) {
    
            for (let j = 0; j < tec_nIncid.length; j++) {
    
                const element = tec_nIncid[j];
                
                if (element[1] == i) {
                    conteoIncid++;
                }
                
            }
    
            tablaFinal[k].push(conteoIncid);
            conteoIncid = 0;
    
        }
    
        porcTecnicos = (tec_nIncid.length / totalTecDist) * 100;
        porcTecnicos = porcTecnicos.toFixed(0);
        tablaFinal[k].push(tec_nIncid.length, porcTecnicos);
        
    }

}


function pintaTabla() {

    let maxIncid = Math.max(...maximosIncidDist) + 1;
    let iniTit = "<tr class='thead-active'>",
        finTit = "</tr>",
        cabecera = "",
        cuerpo = "";
    
    /**
     * Llenado del número de semanas
     */
    semanas[0] = ("0" + tablaGeneralAct[0][13]).slice(-2);
    semanas[1] = ("0" + datosAnteriores[0][0][13]).slice(-2);
    semanas[2] = ("0" + datosAnteriores[1][0][13]).slice(-2);
    semanas[3] = ("0" + datosAnteriores[2][0][13]).slice(-2);
    semanas[4] = ("0" + datosAnteriores[3][0][13]).slice(-2);
    
    let thInicial = "<tr class='thead-active'>"
                    + "<th scope='col' class='w-dist align-middle' rowspan='2'>DISTRITO</th>"
                    + "<th scope='col' class='w-tt' rowspan='2'>TOTAL DE TÉCNICOS SEMENA " + semanas[0] + "</th>"
                    + "<th scope='col' colspan='" + (maxIncid - 1) + "'>TÉCNICOS CON REINCIDENCIAS</th>"
                    + "<th scope='col' class='w-tt' rowspan='2'>TOTAL TÉCNICOS REINCIDENTES</th>"
                    + "<th scope='col' class='align-middle' rowspan='2'>%</th></tr>";

    for (let i = 1; i < maxIncid; i++) {
        cabecera += "<th scope='col' class='align-middle'>" + i + "R</th>";
    }

    $("#titulo_tabla").empty().append(thInicial + iniTit + cabecera + finTit);

    for (let i = 0; i < tablaFinal.length; i++) {
        
        const datosFinalesDist = tablaFinal[i];

        cuerpo += "<tr><td>" + datosFinalesDist[0] + "</td>"
                    + "<td align='center'>" + datosFinalesDist[1] + "</td>";

        for (let j = 2; j < (maxIncid + 1); j++) {

            let valor = (datosFinalesDist[j] > 0) ? datosFinalesDist[j] : "";
            let idLink = datosFinalesDist[0] + "_" + (j - 1);
            let linkValor = "<a href='#' id='" + idLink + "' class='primeros link-dark' "
                            + "data-bs-toggle='modal' data-bs-target='#listaTecnicos'>" + valor + "</a>";

            cuerpo += "<td align='center' class='w-ntt'>" + linkValor + "</td>";

        }

        cuerpo += "<td align='center'>" + datosFinalesDist[datosFinalesDist.length - 2] + "</td>"
                    + "<td align='right'>" + datosFinalesDist[datosFinalesDist.length - 1] + "%</td></tr>";
        
    }

    $("#contenido_tabla").empty().append(cuerpo);

    busquedaDistrito();

    $("a.primeros").on("click", function(event) {

        let listaTecnicos = "";
        let datosLink = this.id.split("_");
        let histIncidenciasTecnico = [];
        let distrito = datosLink[0],
            numIncidencias = parseInt(datosLink[1]);

        for (let i = 0; i < listaDistTecnicos.length; i++) {

            const element = listaDistTecnicos[i];

            if ((element[0] == distrito) && (element[2] == numIncidencias)) {

                let numTecnico = element[1];

                histIncidenciasTecnico = numIncidenciasAnt(numTecnico);

                for (let j = 0; j < tablaGeneralAct.length; j++) {

                    const element = tablaGeneralAct[j];

                    if (element[9] == numTecnico) {

                        let idLink5 = numTecnico + "_" + element[11].toUpperCase() + "_10",
                            idLink4 = numTecnico + "_" + element[11].toUpperCase() + "_0",
                            idLink3 = numTecnico + "_" + element[11].toUpperCase() + "_1",
                            idLink2 = numTecnico + "_" + element[11].toUpperCase() + "_2",
                            idLink1 = numTecnico + "_" + element[11].toUpperCase() + "_3";

                        let linkValor5 = "<a href='#' id='" + idLink5 + "' class='segundos link-dark' data-bs-dismiss='modal' "
                                        + "data-bs-toggle='modal' data-bs-target='#listaOS'>" + numIncidencias + "</a>",
                            linkValor4 = "<a href='#' id='" + idLink4 + "' class='segundos link-dark' data-bs-dismiss='modal' "
                                        + "data-bs-toggle='modal' data-bs-target='#listaOS'>" + histIncidenciasTecnico[0] + "</a>",
                            linkValor3 = "<a href='#' id='" + idLink3 + "' class='segundos link-dark' data-bs-dismiss='modal' "
                                        + "data-bs-toggle='modal' data-bs-target='#listaOS'>" + histIncidenciasTecnico[1] + "</a>",
                            linkValor2 = "<a href='#' id='" + idLink2 + "' class='segundos link-dark' data-bs-dismiss='modal' "
                                        + "data-bs-toggle='modal' data-bs-target='#listaOS'>" + histIncidenciasTecnico[2] + "</a>",
                            linkValor1 = "<a href='#' id='" + idLink1 + "' class='segundos link-dark' data-bs-dismiss='modal' "
                                        + "data-bs-toggle='modal' data-bs-target='#listaOS'>" + histIncidenciasTecnico[3] + "</a>";

                        linkValor4 = (histIncidenciasTecnico[0] == 0) ? 0 : linkValor4;
                        linkValor3 = (histIncidenciasTecnico[1] == 0) ? 0 : linkValor3;
                        linkValor2 = (histIncidenciasTecnico[2] == 0) ? 0 : linkValor2;
                        linkValor1 = (histIncidenciasTecnico[3] == 0) ? 0 : linkValor1;

                        listaTecnicos += "<tr><td align='center'>" + numTecnico + "</td>"
                                        + "<td>" + element[11].toUpperCase() + "</td>"
                                        + "<td align='center'>" + linkValor5 + "</td>"
                                        + "<td align='center'>" + linkValor4 + "</td>"
                                        + "<td align='center'>" + linkValor3 + "</td>"
                                        + "<td align='center'>" + linkValor2 + "</td>"
                                        + "<td align='center'>" + linkValor1 + "</td>";
                        
                        break;

                    }
                    
                }
                
            }
            
        }

        $("#listaTecnicosLabel").empty().append("Listado de técnicos con " + numIncidencias + " reincidencia(s)");
        $("#listTecnicos").empty().append(listaTecnicos);
        $("#s0").empty().append("S-" + semanas[0]);
        $("#s1").empty().append("S-" + semanas[1]);
        $("#s2").empty().append("S-" + semanas[2]);
        $("#s3").empty().append("S-" + semanas[3]);
        $("#s4").empty().append("S-" + semanas[4]);

        /**
         * Click para el listado de OS
         */
        $("a.segundos").on("click", function (event) {

            let datosLink2 = this.id.split("_");
            let buscar = parseInt(datosLink2[2]);
            let tecnico = datosLink2[0];
            let cuerpoOS = "",
                numSemana = "";

            if (buscar == 10) {

                numSemana = semanas[0];

                for (let j = 0; j < tablaGeneralAct.length; j++) {

                    const element = tablaGeneralAct[j];

                    if (element[9] == tecnico) {

                        let descTipoOS = "";
                        let numOS = element[1],
                            tipoOS = parseInt(element[2]),
                            tipoOS2 = element[2],
                            diasOS = parseFloat(element[5]).toFixed(1);

                        // if (tipoOS == 55) {
                        //     descTipoOS = "Soporte";
                        // } else if (tipoOS == 48) {
                        //     descTipoOS = "Instalación";
                        // } else if (tipoOS == 95) {
                        //     descTipoOS = "Cambio de domicilio";
                        // } else {
                        //     descTipoOS = "No Aplica";
                        // }

                        descTipoOS = tipoOS2;

                        cuerpoOS += "<tr><td align='center'>" + numOS + "</td>"
                                    + "<td>" + descTipoOS + "</td>"
                                    + "<td align='center'>" + diasOS + "</td></tr>"

                    }

                }

            } else {

                numSemana = semanas[buscar + 1];

                for (let j = 0; j < datosAnteriores[buscar].length; j++) {

                    const element = datosAnteriores[buscar][j];

                    if (element[9] == tecnico) {

                        let descTipoOS = "";
                        let numOS = element[1],
                            tipoOS = parseInt(element[2]),
                            tipoOS2 = element[2],
                            diasOS = parseFloat(element[5]).toFixed(1);

                        // if (tipoOS == 55) {
                        //     descTipoOS = "Soporte";
                        // } else if (tipoOS == 48) {
                        //     descTipoOS = "Instalación";
                        // } else if (tipoOS == 95) {
                        //     descTipoOS = "Cambio de domicilio";
                        // } else {
                        //     descTipoOS = "No Aplica";
                        // }

                        descTipoOS = tipoOS2;

                        cuerpoOS += "<tr><td align='center'>" + numOS + "</td>"
                            + "<td>" + descTipoOS + "</td>"
                            + "<td align='center'>" + diasOS + "</td></tr>"

                    }

                }
                
            }

            $("#listaOSLabel").empty().append("Listado de OS del Técnico Semana " + numSemana);
            $("#tecnicoLabel").empty().append(tecnico + " - " + datosLink2[1]);
            $("#listOS").empty().append(cuerpoOS);

        });

    });
    
}


function maxIncidenciasDistrito(datosTecnicos) {
    
    let maximo = 0;

    for (let i = 0; i < datosTecnicos.length; i++) {
        const element = datosTecnicos[i];
        maximo = (element[1] > maximo) ? element[1] : maximo;
    }

    return maximo;

}


function busquedaDistrito() {

    let busqueda = $('#distrito');
    let tr = $("tbody").children();

    $(tr).each(function () {

        let nomDistrito = $(this).find("td:first").html();

        if (!(typeof nomDistrito == "undefined")) {

            nomDistrito = nomDistrito.toLowerCase();
            let trActual = $(this);

            $(busqueda).keyup(function () {

                let txt = $(busqueda).val().toLowerCase();
                let seMuestra = nomDistrito.indexOf(txt);

                if (seMuestra > -1) {
                    trActual.show();
                } else {
                    trActual.hide();
                }

            });

        }

    });

}


function numIncidenciasAnt(numTecnico) {

    let historico = [];

    for (let i = 0; i < datosAnteriores.length; i++) {

        let conteo = 0;
        const datosSemana = datosAnteriores[i];

        for (let j = 0; j < datosSemana.length; j++) {

            const element = datosSemana[j];

            if (element[9] == numTecnico) {
                conteo++;
            }
            
        }

        historico[i] = conteo;
        
    }

    return historico;

}


function llenaArreglosTR() {
    
    nacionalTR.length = 0;
    direccionTR.length = 0;
    plazaTR.length = 0;
    distritoTR.length = 0;
    ejeXSemanas.length = 0;
    datosYOrdenes.length = 0;
    datosYTicketRep.length = 0;
    datosYOrdenes = ["numOrdenes"];
    datosYTicketRep = ["porcTicketRepetido"];

    for (let i = 0; i < datosCompletosTR.length; i++) {
        
        const element = datosCompletosTR[i];

        if (element[0] == "Nacional") {
            nacionalTR.push([element[1], element[2], element[3], element[5]]);
        } else if (element[0] == "DIRECCION") {
            direccionTR.push([element[1], element[2], element[3], element[5]]);
        } else if (element[0] == "PLAZA") {
            plazaTR.push([element[1], element[2], element[3], element[5]]);
        } else if (element[0] == "DISTRITO") {
            distritoTR.push([element[1], element[2], element[3], element[5]]);
        }

    }

    for (let i = 0; i < nacionalTR.length; i++) {

        const element = nacionalTR[i];
        // let numSemana = "Semana " + ("0" + element[1]).slice(-2);

        // ejeXSemanas.push(numSemana);
        datosYOrdenes.push(element[2]);
        datosYTicketRep.push(element[3]);

    }

    // $("#grafica2").html("");
    // graficaBarraTR("#grafica2", datosYOrdenes, datosYTicketRep);

}


function graficaBarraTR(idGrafica, datosNumOrdenes, datosTicketRepetido) {

    let optimos = datosTicketRepetido.filter((e, i) => i > 0);
    let maxY2 = Math.max(...optimos),
        minY2 = Math.min(...optimos),
        maxEjeY2 = parseFloat(maxY2.toFixed(1)),
        minEjeY2 = parseFloat(minY2.toFixed(1));

    maxEjeY2 += (maxEjeY2 > maxY2) ? 0 : 0.1;
    minEjeY2 -= (minEjeY2 < minY2) ? 0 : 0.1;

    maxEjeY2 = parseFloat(maxEjeY2.toFixed(1));
    minEjeY2 = parseFloat(minEjeY2.toFixed(1));

    maxEjeY2 -= ((maxEjeY2 - maxY2) > 0.05) ? 0.05 : 0;
    minEjeY2 -= ((minY2 - minEjeY2) > 0.05) ? 0 : 0.05;

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosNumOrdenes,
                datosTicketRepetido
            ],
            type: "bar",
            types: {
                porcTicketRepetido: 'line',
            },
            labels: {
                format:{
                    numOrdenes: d3.format(","),
                    porcTicketRepetido: d3.format(",.2%")
                }
            },
            axes: {
                numOrdenes: "y",
                porcTicketRepetido: "y2",
            },
            order: null,
            colors: {
                numOrdenes: "#E8DB87", //8BBB99
                porcTicketRepetido: "#3D3B3B"
            },
            names: {
                numOrdenes: "Soportes completos",
                porcTicketRepetido: "% Ticket Repetido"
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: ejeXMeses,
                tick: {
                    rotate: -90,
                    multiline: false,
                    culling: {
                        max: 40
                    }
                },
                height: 80
            },
            y: {
                tick: {
                    format: d3.format(",")
                }
            },
            y2: {
                tick: {
                    format: d3.format(",.2%")
                },
                max: maxEjeY2,
                min: minEjeY2,
                padding: {
                    // top: 0,
                    bottom: 0
                },
                show: true
            }
        },
        tooltip: {
            format: {
                value: function (value, ratio, id) {
                    var format = id === "numOrdenes" ? d3.format(",") : d3.format(",.2%");
                    return format(value);
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


function pintaGraficaTRDir(valor) {

    let datosYOrdenesDir = ["numOrdenes"],
        datosYTicketRepDir = ["porcTicketRepetido"];

    for (let i = 0; i < direccionTR.length; i++) {

        const element = direccionTR[i];
        
        if (element[0] == valor) {
            datosYOrdenesDir.push(element[2]);
            datosYTicketRepDir.push(element[3]);
        }

    }

    graficaBarraTR("#grafica3", datosYOrdenesDir, datosYTicketRepDir);

}


function pintaGraficaTRPlaza(valor) {

    let datosYOrdenesPlaza = ["numOrdenes"],
        datosYTicketRepPlaza = ["porcTicketRepetido"];

    for (let i = 0; i < plazaTR.length; i++) {

        const element = plazaTR[i];

        if (element[0] == valor) {
            datosYOrdenesPlaza.push(element[2]);
            datosYTicketRepPlaza.push(element[3]);
        }

    }

    graficaBarraTR("#grafica3", datosYOrdenesPlaza, datosYTicketRepPlaza);

}


function pintaGraficaTRDis(valor) {

    console.log(valor);

    let datosYOrdenesDis = ["numOrdenes"],
        datosYTicketRepDis = ["porcTicketRepetido"];

    for (let i = 0; i < distritoTR.length; i++) {

        const element = distritoTR[i];

        if (element[0] == valor) {
            datosYOrdenesDis.push(element[2]);
            datosYTicketRepDis.push(element[3]);
        }

    }

    graficaBarraTR("#grafica3", datosYOrdenesDis, datosYTicketRepDis);

}


function llenaArreglosIDR() {

    nacionalIDR.length = 0;
    direccionIDR.length = 0;
    plazaIDR.length = 0;
    distritoIDR.length = 0;
    ejeXMeses.length = 0;

    datosYIDR = ["idr"];
    datosYIDS = ["ids"];
    datosYRSS = ["rss"];

    for (let i = 0; i < datosCompletosIDR.length; i++) {

        const element = datosCompletosIDR[i];
        let rss = parseFloat(element[7]) / 100;
        // let ids = (parseFloat(element[9]) - parseFloat(element[10])) / 100;
        let ids = parseFloat(element[9]) / 100;
        let idr = parseFloat(element[10]) / 100;

        ids = ids.toFixed(4);
        ids = parseFloat(ids);

        ejeXMeses.push(element[2]);

        if (element[0] == "NACIONAL") {
            nacionalIDR.push([element[1], rss, ids, idr]);
        } else if (element[0] == "DIRECCION") {
            direccionIDR.push([element[1], rss, ids, idr]);
        } else if (element[0] == "PLAZA") {
            plazaIDR.push([element[1], rss, ids, idr]);
        } else if (element[0] == "DISTRITO") {
            distritoIDR.push([element[1], rss, ids, idr]);
        }

    }

    const listDist = new Set(ejeXMeses);

    ejeXMeses = [...listDist];

    for (let i = 0; i < nacionalIDR.length; i++) {

        const element = nacionalIDR[i];

        datosYRSS.push(element[1]);
        datosYIDS.push(element[2]);
        datosYIDR.push(element[3]);
        
    }
    
}


function graficaBarraIDR(idGrafica, datosIDR, datosISR, datosRSS) {

    let optimos = datosRSS.filter((e, i) => i > 0);
    let maxY2 = Math.max(...optimos),
        minY2 = Math.min(...optimos),
        maxEjeY2 = parseFloat(maxY2.toFixed(1)),
        minEjeY2 = parseFloat(minY2.toFixed(1));

    maxEjeY2 += (maxEjeY2 > maxY2) ? 0 : 0.1;
    minEjeY2 -= (minEjeY2 < minY2) ? 0 : 0.1;

    maxEjeY2 = parseFloat(maxEjeY2.toFixed(1));
    minEjeY2 = parseFloat(minEjeY2.toFixed(1));

    maxEjeY2 -= ((maxEjeY2 - maxY2) > 0.05) ? 0.05 : 0;
    minEjeY2 -= ((minY2 - minEjeY2) > 0.05) ? 0 : 0.05;

    var chart = c3.generate({
        bindto: idGrafica,
        data: {
            columns: [
                datosISR,
                datosIDR,
                datosRSS,
            ],
            type: "bar",
            types: {
                rss: 'line',
            },
            labels: {
                format: {
                    idr: function (v, id, i, j) {

                        let valor = parseFloat((v * 100).toFixed(2)),
                            simbolo = "",
                            etiqueta = "";

                        if (valor <= 0.7) {
                            simbolo = "  (√) ";
                        } else if (valor <= 1.3) {
                            simbolo = "  (!) ";
                        } else {
                            simbolo = "  (×) ";
                        }

                        etiqueta = simbolo + valor + "%";

                        return (etiqueta);
                        
                    },
                    // idr: d3.format(",.2%"),
                    ids: d3.format(",.2%"),
                    rss: d3.format(",.2%")
                }
            },
            axes: {
                idr: "y",
                ids: "y",
                rss: "y2",
            },
            // groups: [
            //     ["idr", "ids"]
            // ],
            order: null,
            colors: {
                idr: "#BFAB25", //3F7CBF //5E8C91
                ids: "#5E8C91", //EE9456 //87ADD7 
                rss: "#3D3B3B"
            },
            names: {
                idr: "Índice de Reincidencias",
                ids: "Índice de Soportes",
                rss: "Reincidencias sobre soportes"
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: ejeXMeses,
                tick: {
                    rotate: -90,
                    multiline: false,
                    culling: {
                        max: 40
                    }
                },
                height: 80
            },
            y: {
                tick: {
                    format: d3.format(",.2%")
                },
                max: 0.06,
                show: true
            },
            y2: {
                tick: {
                    format: d3.format(",.2%")
                },
                max: maxEjeY2,
                // min: minEjeY2,
                min: 0,
                padding: {
                    // top: 0,
                    bottom: 0
                },
                show: true
            }
        },
        // grid: {
        //     y: {
        //         lines: [
        //             { value: 0.007, text: "0.7%", class: "regular" },
        //             { value: 0.013, text: "1.3%", class: "malo" }
        //         ]
        //     }
        // },
        tooltip: {
            format: {
                value: function (value, ratio, id) {
                    var format = id === "numOrdenes" ? d3.format(",") : d3.format(",.2%");
                    return format(value);
                }
            }
        },
        zoom: {
            enabled: true
        },
        // tooltip: {
        //     contents: function (d, defaultTitleFormat, defaultValueFormat, color) {

        //         // console.log(color(d[0].id));

        //         function key_for_sum(arr) {

        //             let valor = (arr.id == "rss") ? 0 : arr.value;
        //             return valor; //value is the key

        //         }

        //         function sum(prev, next) {
        //             return prev + next;
        //         }

        //         var totals_object = {};
        //         totals_object.x = d[0]["x"];
        //         totals_object.value = d.map(key_for_sum).reduce(sum);// sum func
        //         totals_object.name = "Índice de Soporte"; //total will be shown in tooltip
        //         totals_object.index = d[0]["index"];
        //         totals_object.id = "total"; //c3 will use this
        //         d.push(totals_object);

        //         var $$ = this,
        //             config = $$.config,
        //             titleFormat = config.tooltip_format_title || defaultTitleFormat,
        //             nameFormat = config.tooltip_format_name || function (name) {
        //                 return name;
        //             },
        //             valueFormat = config.tooltip_format_value || defaultValueFormat,
        //             text, i, title, value, name, bgcolor;

        //         for (i = 0; i < d.length; i++) {

        //             if (!(d[i] && (d[i].value || d[i].value === 0))) {
        //                 continue;
        //             }

        //             if (d[i].id == "ids") {
        //                 continue;
        //             }

        //             if (!text) {
        //                 title = titleFormat ? titleFormat(d[i].x) : d[i].x;
        //                 text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
        //             }

        //             name = nameFormat(d[i].name);
        //             value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
        //             bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

        //             bgcolor = (d[i].id == "total") ? "#EE9456" : bgcolor; // cambio de color para el total

        //             text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
        //             text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
        //             text += "<td class='value'>" + value + "</td>";
        //             text += "</tr>";

        //         }

        //         return text + "</table>";

        //     }

        // }

    });

    setTimeout(function () {
        chart.resize();
    }, 300);

}


function pintaGraficaIDRDir(valor) {

    let datosYIDRDir = ["idr"],
        datosYIDSDir = ["ids"],
        datosYRSSDir = ["rss"];

    for (let i = 0; i < direccionIDR.length; i++) {

        const element = direccionIDR[i];

        if (element[0] == valor) {

            datosYRSSDir.push(element[1]);
            datosYIDSDir.push(element[2]);
            datosYIDRDir.push(element[3]);

        }

    }

    graficaBarraIDR("#grafica2", datosYIDRDir, datosYIDSDir, datosYRSSDir);

}


function pintaGraficaIDRPlaza(valor) {

    let datosYIDRPlaza = ["idr"],
        datosYIDSPlaza = ["ids"],
        datosYRSSPlaza = ["rss"];

    for (let i = 0; i < plazaIDR.length; i++) {

        const element = plazaIDR[i];

        if (element[0] == valor) {

            datosYRSSPlaza.push(element[1]);
            datosYIDSPlaza.push(element[2]);
            datosYIDRPlaza.push(element[3]);

        }

    }

    graficaBarraIDR("#grafica2", datosYIDRPlaza, datosYIDSPlaza, datosYRSSPlaza);

}


function pintaGraficaIDRDis(valor) {

    let datosYIDRDis = ["idr"],
        datosYIDSDis = ["ids"],
        datosYRSSDis = ["rss"];

    for (let i = 0; i < distritoIDR.length; i++) {

        const element = distritoIDR[i];

        if (element[0] == valor) {

            datosYRSSDis.push(element[1]);
            datosYIDSDis.push(element[2]);
            datosYIDRDis.push(element[3]);

        }

    }

    graficaBarraIDR("#grafica2", datosYIDRDis, datosYIDSDis, datosYRSSDis);

}

