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

var fuenteSemAnt = ["fuentes/ReincSem_Actual_M2.csv",
                    "fuentes/ReincSem_Actual_M3.csv",
                    "fuentes/ReincSem_Actual_M4.csv",
                    "fuentes/ReincSem_Actual_M5.csv"];



$(document).ready(function() {

    /**
     * Selecciona la opción de Reincidencias
     */
    $("#reincidencias").click(function () {

        if (selecTop == 1) {
            $("#graficas").empty().append("<div class='col-md-12 col-sm-12'>"
                                        + "<div id='grafica1' class='tamanhoGrafica' style='text-align: center;'>"
                                        + "</div></div>");
        }

        $("#divGrafica").hide();
        $("#divBtnDetalle").hide();
        $("#divTabla").hide();
        $("#divAct").hide();
        $("#desDireccion").hide();
        $("#desPlaza").hide();
        $("#desDistrito").hide();
        $("#kpiTodos").hide();
        
        $("#imgConecta").show();
        $("#tablaReincidencias").show();

        document.getElementById("productividad").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("reincidencias").style.backgroundColor = "rgb(31, 77, 155)";
        document.getElementById("backlog").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("incumplimiento").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("top").style.backgroundColor = "rgb(63, 124, 191)";
        document.getElementById("mas72hrs").style.backgroundColor = "rgb(63, 124, 191)";

        // Coloca bandera de locación
        selecProductividad = 0;
        selecReincidencias = 1;
        selecBacklog = 0;
        selecIncumplimiento = 0;
        selecTop = 0;
        selec72hrs = 0;

        lecturaTG("fuentes/ReincSem_Actual.csv");

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
