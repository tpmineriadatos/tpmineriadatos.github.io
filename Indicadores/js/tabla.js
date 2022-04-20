var datosGenerales = [],
    renglones = [],
    direccion = [],
    region = [],
    distrito = [],
    cluster = [],
    semana = [],
    dia = [],
    direcRegion = [],
    regDistrito = [],
    disCluster = [];

var ejeYDatosNacDiario = ["nacional"],
    ejeYDatosNacSemanal = ["nacional"],
    ejeYDatosNacMensual = ["nacional"];
var ejeXSemanas = ["semanas", "Semana 01", "Semana 02", "Semana 03", "Semana 04", "Semana 05",
                    "Semana 06", "Semana 07", "Semana 08", "Semana 09", "Semana 10",
                    "Semana 11", "Semana 12", "Semana 13", "Semana 14", "Semana 15",
                    "Semana 16", "Semana 17", "Semana 18", "Semana 19", "Semana 20",
                    "Semana 21", "Semana 22", "Semana 23", "Semana 24", "Semana 25",
                    "Semana 26", "Semana 27", "Semana 28", "Semana 29", "Semana 30",
                    "Semana 31", "Semana 32", "Semana 33", "Semana 34", "Semana 35",
                    "Semana 36", "Semana 37", "Semana 38", "Semana 39", "Semana 40",
                    "Semana 41", "Semana 42", "Semana 43", "Semana 44", "Semana 45",
                    "Semana 46", "Semana 47", "Semana 48", "Semana 49", "Semana 50",
                    "Semana 51", "Semana 52"],
    ejeXMeses = ["meses", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                            "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    ejeXDiario = ["diario", "01/01/22", "02/01/22", "03/01/22", "04/01/22", "05/01/22", "06/01/22",
                    "07/01/22", "08/01/22", "09/01/22", "10/01/22", "11/01/22", "12/01/22", "13/01/22",
                    "14/01/22", "15/01/22", "16/01/22", "17/01/22", "18/01/22", "19/01/22", "20/01/22",
                    "21/01/22", "22/01/22", "23/01/22", "24/01/22", "25/01/22", "26/01/22", "27/01/22",
                    "28/01/22", "29/01/22", "30/01/22", "31/01/22", "01/02/22", "02/02/22", "03/02/22",
                    "04/02/22", "05/02/22", "06/02/22", "07/02/22", "08/02/22", "09/02/22", "10/02/22",
                    "11/02/22", "12/02/22", "13/02/22", "14/02/22", "15/02/22", "16/02/22", "17/02/22",
                    "18/02/22", "19/02/22", "20/02/22", "21/02/22", "22/02/22", "23/02/22", "24/02/22",
                    "25/02/22", "26/02/22", "27/02/22", "28/02/22", "01/03/22", "02/03/22", "03/03/22",
                    "04/03/22", "05/03/22", "06/03/22", "07/03/22", "08/03/22", "09/03/22", "10/03/22",
                    "11/03/22", "12/03/22", "13/03/22", "14/03/22", "15/03/22", "16/03/22", "17/03/22",
                    "18/03/22", "19/03/22", "20/03/22", "21/03/22", "22/03/22", "23/03/22", "24/03/22",
                    "25/03/22", "26/03/22", "27/03/22", "28/03/22", "29/03/22", "30/03/22", "31/03/22",
                    "01/04/22", "02/04/22", "03/04/22", "04/04/22", "05/04/22", "06/04/22", "07/04/22",
                    "08/04/22", "09/04/22", "10/04/22", "11/04/22", "12/04/22", "13/04/22", "14/04/22",
                    "15/04/22", "16/04/22", "17/04/22", "18/04/22", "19/04/22", "20/04/22", "21/04/22",
                    "22/04/22", "23/04/22", "24/04/22", "25/04/22", "26/04/22", "27/04/22", "28/04/22",
                    "29/04/22", "30/04/22", "01/05/22", "02/05/22", "03/05/22", "04/05/22", "05/05/22",
                    "06/05/22", "07/05/22", "08/05/22", "09/05/22", "10/05/22", "11/05/22", "12/05/22",
                    "13/05/22", "14/05/22", "15/05/22", "16/05/22", "17/05/22", "18/05/22", "19/05/22",
                    "20/05/22", "21/05/22", "22/05/22", "23/05/22", "24/05/22", "25/05/22", "26/05/22",
                    "27/05/22", "28/05/22", "29/05/22", "30/05/22", "31/05/22", "01/06/22", "02/06/22",
                    "03/06/22", "04/06/22", "05/06/22", "06/06/22", "07/06/22", "08/06/22", "09/06/22",
                    "10/06/22", "11/06/22", "12/06/22", "13/06/22", "14/06/22", "15/06/22", "16/06/22",
                    "17/06/22", "18/06/22", "19/06/22", "20/06/22", "21/06/22", "22/06/22", "23/06/22",
                    "24/06/22", "25/06/22", "26/06/22", "27/06/22", "28/06/22", "29/06/22", "30/06/22",
                    "01/07/22", "02/07/22", "03/07/22", "04/07/22", "05/07/22", "06/07/22", "07/07/22",
                    "08/07/22", "09/07/22", "10/07/22", "11/07/22", "12/07/22", "13/07/22", "14/07/22",
                    "15/07/22", "16/07/22", "17/07/22", "18/07/22", "19/07/22", "20/07/22", "21/07/22",
                    "22/07/22", "23/07/22", "24/07/22", "25/07/22", "26/07/22", "27/07/22", "28/07/22",
                    "29/07/22", "30/07/22", "31/07/22", "01/08/22", "02/08/22", "03/08/22", "04/08/22",
                    "05/08/22", "06/08/22", "07/08/22", "08/08/22", "09/08/22", "10/08/22", "11/08/22",
                    "12/08/22", "13/08/22", "14/08/22", "15/08/22", "16/08/22", "17/08/22", "18/08/22",
                    "19/08/22", "20/08/22", "21/08/22", "22/08/22", "23/08/22", "24/08/22", "25/08/22",
                    "26/08/22", "27/08/22", "28/08/22", "29/08/22", "30/08/22", "31/08/22", "01/09/22",
                    "02/09/22", "03/09/22", "04/09/22", "05/09/22", "06/09/22", "07/09/22", "08/09/22",
                    "09/09/22", "10/09/22", "11/09/22", "12/09/22", "13/09/22", "14/09/22", "15/09/22",
                    "16/09/22", "17/09/22", "18/09/22", "19/09/22", "20/09/22", "21/09/22", "22/09/22",
                    "23/09/22", "24/09/22", "25/09/22", "26/09/22", "27/09/22", "28/09/22", "29/09/22",
                    "30/09/22", "01/10/22", "02/10/22", "03/10/22", "04/10/22", "05/10/22", "06/10/22",
                    "07/10/22", "08/10/22", "09/10/22", "10/10/22", "11/10/22", "12/10/22", "13/10/22",
                    "14/10/22", "15/10/22", "16/10/22", "17/10/22", "18/10/22", "19/10/22", "20/10/22",
                    "21/10/22", "22/10/22", "23/10/22", "24/10/22", "25/10/22", "26/10/22", "27/10/22",
                    "28/10/22", "29/10/22", "30/10/22", "31/10/22", "01/11/22", "02/11/22", "03/11/22",
                    "04/11/22", "05/11/22", "06/11/22", "07/11/22", "08/11/22", "09/11/22", "10/11/22",
                    "11/11/22", "12/11/22", "13/11/22", "14/11/22", "15/11/22", "16/11/22", "17/11/22",
                    "18/11/22", "19/11/22", "20/11/22", "21/11/22", "22/11/22", "23/11/22", "24/11/22",
                    "25/11/22", "26/11/22", "27/11/22", "28/11/22", "29/11/22", "30/11/22", "01/12/22",
                    "02/12/22", "03/12/22", "04/12/22", "05/12/22", "06/12/22", "07/12/22", "08/12/22",
                    "09/12/22", "10/12/22", "11/12/22", "12/12/22", "13/12/22", "14/12/22", "15/12/22",
                    "16/12/22", "17/12/22", "18/12/22", "19/12/22", "20/12/22", "21/12/22", "22/12/22",
                    "23/12/22", "24/12/22", "25/12/22", "26/12/22", "27/12/22", "28/12/22", "29/12/22",
                    "30/12/22", "31/12/22"];
var meses = { "01": "Enero", "02": "Febrero", "03": "Marzo", "04": "Abril", "05": "Mayo", "06": "Junio",
                "07": "Julio", "08": "Agosto", "09": "Septiembre", "10": "Octubre", "11": "Noviembre", "12": "Diciembre" };

var datosGrafDirSemanal = new Object(),
    datosGrafRegSemanal = new Object(),
    datosGrafDisSemanal = new Object(),
    datosGrafClusSemanal = new Object(),
    datosGrafDirMensual = new Object(),
    datosGrafRegMensual = new Object(),
    datosGrafDisMensual = new Object(),
    datosGrafClusMensual = new Object(),
    datosGrafDirDiario = new Object(),
    datosGrafRegDiario = new Object(),
    datosGrafDisDiario = new Object(),
    datosGrafClusDiario = new Object();

var chart;


$(document).ready(function() {

    document.getElementById("efectividad").style.backgroundColor = "rgb(31, 77, 155)";

    $("#desRegion").hide();
    $("#desDistrito").hide();
    $("#desCluster").hide();
    $("#desBtnPresentacion").show();

    lecturaCSV("fuentes/EfectividadYasa.csv");

    $("#opcDireccion").on("change", function(e) {
        cambioOpcDireccion($("#opcDireccion").val());
    });

    $("#opcRegion").on("change", function(e) {
        cambioOpcRegion($("#opcRegion").val());
    });

    $("#opcDistrito").on("change", function(e) {
        cambioOpcDistrito($("#opcDistrito").val());
    });

    $("#opcCluster").on("change", function (e) {
        cambioOpcCluster($("#opcCluster option:selected").val());
    });

    $("#cambioGrafica").on("click", function(e) {

        if ($("#mensual").prop("checked")) {
            clickMensual();
        } else if ($("#semanal").prop("checked")) {
            clickSemanal();
        } else if ($("#diario").prop("checked")) {
            clickDiario();
        }

    });

    $(document).on("input", "input[name=temporalidad]", function () {

        let opcionSelec = $(this).val();

        if (opcionSelec == "mensual") {
            cambioMensualInput();
        } else if (opcionSelec == "semanal") {
            cambioSemanalInput();
        } else if (opcionSelec == "diario") {
            cambioDiarioInput();
        }

    });

});


function lecturaCSV(documento) {

    $.ajax({

        type: "GET",
        url: documento,
        dataType: "text",
        success: function (data) {

            renglones = data.split(/\r\n|\n/);
            renglones = renglones.filter((e, i) => i > 0);

            for (let i = 0; i < renglones.length; i++) {
                datosGenerales.push(renglones[i].split(","));
            }

            llenadoArreglos();

        }

    });

}


function llenadoArreglos() {
    
    for (let i = 0; i < datosGenerales.length; i++) {
        
        const element = datosGenerales[i];

        direccion.push(element[0]);
        region.push(element[1]);
        distrito.push(element[2]);
        cluster.push(element[3]);
        semana.push(element[4]);
        dia.push(element[5]);
        
    }

    const listDist = new Set(direccion);
    const listDist2 = new Set(region);
    const listDist3 = new Set(distrito);
    const listDist4 = new Set(cluster);
    const listDist5 = new Set(semana);
    const listDist6 = new Set(dia);

    direccion = [...listDist];
    region = [...listDist2];
    distrito = [...listDist3];
    cluster = [...listDist4];
    semana = [...listDist5];
    dia = [...listDist6];

    for (let j = 0; j < region.length; j++) {

        let existe = 0;
        
        for (let i = 0; i < datosGenerales.length; i++) {

            const element = datosGenerales[i];

            if ((element[1] == region[j] && existe == 0)) {
                direcRegion.push([element[0], element[1]]);
                existe++;
            }

        }
        
    }

    for (let j = 0; j < distrito.length; j++) {

        let existe = 0;

        for (let i = 0; i < datosGenerales.length; i++) {

            const element = datosGenerales[i];

            if ((element[2] == distrito[j] && existe == 0)) {
                regDistrito.push([element[1], element[2]]);
                existe++;
            }

        }

    }

    for (let j = 0; j < cluster.length; j++) {

        let existe = 0;

        for (let i = 0; i < datosGenerales.length; i++) {

            const element = datosGenerales[i];

            if ((element[3] == cluster[j] && existe == 0)) {
                disCluster.push([element[2], element[3]]);
                existe++;
            }

        }

    }

    /**
     * Datos Semanales
     */
    for (let k = 0; k < direccion.length; k++) {

        let direc = direccion[k];
        let datosDirec = [direc];

        for (let j = 1; j < 53; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];

                if ((element[4] == j) && (element[0] == direc)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            datosDirec.push(efectividad);

        }

        datosGrafDirSemanal[direc] = datosDirec;

    }

    for (let k = 0; k < region.length; k++) {

        let reg = region[k];
        let datosReg = [reg];

        for (let j = 1; j < 53; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];

                if ((element[4] == j) && (element[1] == reg)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            datosReg.push(efectividad);

        }

        datosGrafRegSemanal[reg] = datosReg;

    }

    for (let k = 0; k < distrito.length; k++) {

        let dis = distrito[k];
        let datosDis = [dis];

        for (let j = 1; j < 53; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];

                if ((element[4] == j) && (element[2] == dis)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            datosDis.push(efectividad);

        }

        datosGrafDisSemanal[dis] = datosDis;

    }

    for (let k = 0; k < cluster.length; k++) {

        let clus = cluster[k];
        let datosClus = [clus];

        for (let j = 1; j < 53; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];

                if ((element[4] == j) && (element[3] == clus)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            datosClus.push(efectividad);

        }

        datosGrafClusSemanal[clus] = datosClus;

    }

    /**
     * Datos Mensuales
     */
    for (let k = 0; k < direccion.length; k++) {

        let direc = direccion[k];
        let datosDirec = [direc];

        for (let j = 1; j < ejeXMeses.length; j++) {
            
            var numerador = 0,
                denominador = 0,
                efectividad = "";
            
            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];
                let mesDatosGen = element[5].substr(3, 2);
                let mes = meses[mesDatosGen];

                if ((mes == ejeXMeses[j]) && (element[0] == direc)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            datosDirec.push(efectividad);
            
        }

        datosGrafDirMensual[direc] = datosDirec;

    }

    for (let k = 0; k < region.length; k++) {

        let reg = region[k];
        let datosReg = [reg];

        for (let j = 1; j < ejeXMeses.length; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];
                let mesDatosGen = element[5].substr(3, 2);
                let mes = meses[mesDatosGen];

                if ((mes == ejeXMeses[j]) && (element[1] == reg)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            datosReg.push(efectividad);

        }

        datosGrafRegMensual[reg] = datosReg;

    }

    for (let k = 0; k < distrito.length; k++) {

        let dis = distrito[k];
        let datosDis = [dis];

        for (let j = 1; j < ejeXMeses.length; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];
                let mesDatosGen = element[5].substr(3, 2);
                let mes = meses[mesDatosGen];

                if ((mes == ejeXMeses[j]) && (element[2] == dis)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            datosDis.push(efectividad);

        }

        datosGrafDisMensual[dis] = datosDis;

    }

    for (let k = 0; k < cluster.length; k++) {

        let clus = cluster[k];
        let datosClus = [clus];

        for (let j = 1; j < ejeXMeses.length; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];
                let mesDatosGen = element[5].substr(3, 2);
                let mes = meses[mesDatosGen];

                if ((mes == ejeXMeses[j]) && (element[3] == clus)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            datosClus.push(efectividad);

        }

        datosGrafClusMensual[clus] = datosClus;

    }

    /**
     * Datos diarios
     */
    for (let k = 0; k < direccion.length; k++) {

        let direc = direccion[k];
        let datosDirec = [direc];

        for (let j = 1; j < ejeXDiario.length; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];

                if ((element[5] == ejeXDiario[j]) && (element[0] == direc)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            datosDirec.push(efectividad);

        }

        datosGrafDirDiario[direc] = datosDirec;

    }

    for (let k = 0; k < region.length; k++) {

        let reg = region[k];
        let datosReg = [reg];

        for (let j = 1; j < ejeXDiario.length; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];

                if ((element[5] == ejeXDiario[j]) && (element[1] == reg)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            datosReg.push(efectividad);

        }

        datosGrafRegDiario[reg] = datosReg;

    }

    for (let k = 0; k < distrito.length; k++) {

        let dis = distrito[k];
        let datosDis = [dis];

        for (let j = 1; j < ejeXDiario.length; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];

                if ((element[5] == ejeXDiario[j]) && (element[2] == dis)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            datosDis.push(efectividad);

        }

        datosGrafDisDiario[dis] = datosDis;

    }

    for (let k = 0; k < cluster.length; k++) {

        let clus = cluster[k];
        let datosClus = [clus];

        for (let j = 1; j < ejeXDiario.length; j++) {

            var numerador = 0,
                denominador = 0,
                efectividad = "";

            for (let i = 0; i < datosGenerales.length; i++) {

                const element = datosGenerales[i];

                if ((element[5] == ejeXDiario[j]) && (element[3] == clus)) {
                    numerador += parseInt(element[7]);
                    denominador += parseInt(element[6]);
                }

            }

            efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
            datosClus.push(efectividad);

        }

        datosGrafClusDiario[clus] = datosClus;

    }


    for (let i = 0; i < direccion.length; i++) {
        $("#opcDireccion").append($("<option>", { value: direccion[i], text: direccion[i] }));
    }

    armaDatosGrafica();

}


function armaDatosGrafica() {
    
    // Datos mensuales nacionales
    for (let j = 1; j < ejeXMeses.length; j++) {

        var numerador = 0,
            denominador = 0,
            efectividad = "";
        
        for (let i = 0; i < datosGenerales.length; i++) {

            const element = datosGenerales[i];
            let mesDatosGen = element[5].substr(3, 2);
            let mes = meses[mesDatosGen];

            if (mes == ejeXMeses[j]) {
                numerador += parseInt(element[7]);
                denominador += parseInt(element[6]);
            }

        }

        // console.log(ejeXMeses[j], numerador, denominador);

        efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
        ejeYDatosNacMensual.push(efectividad);

    }

    // Datos semanales nacionales
    for (let j = 1; j < 53; j++) {

        var numerador = 0,
            denominador = 0,
            efectividad = "";

        for (let i = 0; i < datosGenerales.length; i++) {

            const element = datosGenerales[i];

            if (element[4] == j) {
                numerador += parseInt(element[7]);
                denominador += parseInt(element[6]);
            }

        }

        efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
        ejeYDatosNacSemanal.push(efectividad);

    }

    // Datos diarios nacionales
    for (let j = 1; j < ejeXDiario.length; j++) {

        var numerador = 0,
            denominador = 0,
            efectividad = "";

        for (let i = 0; i < datosGenerales.length; i++) {

            const element = datosGenerales[i];

            if (element[5] == ejeXDiario[j]) {
                numerador += parseInt(element[7]);
                denominador += parseInt(element[6]);
            }

        }

        efectividad = (denominador != 0) ? (numerador / denominador).toFixed(2) : "NA";
        ejeYDatosNacDiario.push(efectividad);

    }

    dibujaGrafica("#grafica1", ejeXSemanas, "semanas", ejeYDatosNacSemanal);

}


function datosDesgNacional() {
    
    for (let i = 0; i < direccion.length; i++) {

        chart.load({
            columns: [
                datosGrafDirSemanal[direccion[i]]
            ]
        });
        
    }

    chart.unload({
        ids: "nacional"
    });

}


function grafSoloNacional() {

    chart.load({
        columns: [
            ejeYDatosNacSemanal
        ]
    });

    for (let i = 0; i < direccion.length; i++) {

        chart.unload({
            ids: direccion[i]
        });

    }

}


function dibujaGrafica(idGrafica, datosXGrafica, tipoX, datosYGrafica) {

    chart = c3.generate({
        bindto: idGrafica,
        data: {
            x: tipoX, // "semanas",
            columns: [datosXGrafica, datosYGrafica],
            colors: {
                nacional: "#C70039"
            },
            names: {
                nacional: "NACIONAL"
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
            },
            y: {
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


function cambioOpcDireccion(direccionSelec) {

    if (direccionSelec == "NACIONAL") {

        $("#desRegion").hide();
        $("#desDistrito").hide();
        $("#desCluster").hide();
        $("#desBtnPresentacion").show();
        $("#grafica1").html("");

        if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

            if ($("#mensual").prop("checked")) {

                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDirMensual[direccion[0]]);

                for (let i = 1; i < direccion.length; i++) {

                    chart.load({
                        columns: [
                            datosGrafDirMensual[direccion[i]]
                        ]
                    });

                }
                
            } else if ($("#semanal").prop("checked")) {

                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDirSemanal[direccion[0]]);

                for (let i = 1; i < direccion.length; i++) {

                    chart.load({
                        columns: [
                            datosGrafDirSemanal[direccion[i]]
                        ]
                    });

                }
                
            } else if ($("#diario").prop("checked")) {
                
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDirDiario[direccion[0]]);

                for (let i = 1; i < direccion.length; i++) {

                    chart.load({
                        columns: [
                            datosGrafDirDiario[direccion[i]]
                        ]
                    });

                }

            }

        } else {

            if ($("#mensual").prop("checked")) {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", ejeYDatosNacMensual);
            } else if ($("#semanal").prop("checked")) {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", ejeYDatosNacSemanal);
            } else if ($("#diario").prop("checked")) {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", ejeYDatosNacDiario);
            }

        }

    } else {

        $("#opcRegion").empty().append("<option selected disabled>Seleccionar</option>");

        for (let i = 0; i < direcRegion.length; i++) {

            const element = direcRegion[i];

            if (element[0] == direccionSelec) {
                $("#opcRegion").append($("<option>", { value: element[1], text: element[1] }));
            }

        }

        $("#desRegion").show();
        $("#desDistrito").hide();
        $("#desCluster").hide();
        $("#desBtnPresentacion").show();

        $("#grafica1").html("");

        if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

            if ($("#mensual").prop("checked")) {
                
                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == direccionSelec) {
                        dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == direccionSelec) {

                        chart.load({
                            columns: [
                                datosGrafRegMensual[element[1]]
                            ]
                        });

                    }

                }

            } else if ($("#semanal").prop("checked")) {
                
                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == direccionSelec) {
                        dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == direccionSelec) {

                        chart.load({
                            columns: [
                                datosGrafRegSemanal[element[1]]
                            ]
                        });

                    }

                }

            } else if ($("#diario").prop("checked")) {
                
                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == direccionSelec) {
                        dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == direccionSelec) {

                        chart.load({
                            columns: [
                                datosGrafRegDiario[element[1]]
                            ]
                        });

                    }

                }

            }

        } else {

            if ($("#mensual").prop("checked")) {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDirMensual[direccionSelec]);
            } else if ($("#semanal").prop("checked")) {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDirSemanal[direccionSelec]);
            } else if ($("#diario").prop("checked")) {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDirDiario[direccionSelec]);
            }

        }
        
    }

}


function cambioOpcRegion(regionSelec) {
    
    $("#opcDistrito").empty().append("<option selected disabled>Seleccionar</option>");

    for (let i = 0; i < regDistrito.length; i++) {

        const element = regDistrito[i];

        if (element[0] == regionSelec) {
            $("#opcDistrito").append($("<option>", { value: element[1], text: element[1] }));
        }

    }

    $("#desDistrito").show();
    $("#desCluster").hide();
    $("#desBtnPresentacion").show();

    $("#grafica1").html("");

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        if ($("#mensual").prop("checked")) {
            
            for (let i = 0; i < regDistrito.length; i++) {

                const element = regDistrito[i];

                if (element[0] == regionSelec) {
                    dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < regDistrito.length; i++) {

                const element = regDistrito[i];

                if (element[0] == regionSelec) {

                    chart.load({
                        columns: [
                            datosGrafDisMensual[element[1]]
                        ]
                    });

                }

            }

        } else if ($("#semanal").prop("checked")) {

            for (let i = 0; i < regDistrito.length; i++) {

                const element = regDistrito[i];

                if (element[0] == regionSelec) {
                    dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < regDistrito.length; i++) {

                const element = regDistrito[i];

                if (element[0] == regionSelec) {

                    chart.load({
                        columns: [
                            datosGrafDisSemanal[element[1]]
                        ]
                    });

                }

            }

        } else if ($("#diario").prop("checked")) {
            
            for (let i = 0; i < regDistrito.length; i++) {

                const element = regDistrito[i];

                if (element[0] == regionSelec) {
                    dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDisDiario[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < regDistrito.length; i++) {

                const element = regDistrito[i];

                if (element[0] == regionSelec) {

                    chart.load({
                        columns: [
                            datosGrafDisDiario[element[1]]
                        ]
                    });

                }

            }

        }

        

    } else {

        if ($("#mensual").prop("checked")) {
            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[regionSelec]);
        } else if ($("#semanal").prop("checked")) {
            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[regionSelec]);
        } else if ($("#diario").prop("checked")) {
            dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[regionSelec]);
        }

    }

}


function cambioOpcDistrito(distritoSelec) {
    
    $("#opcCluster").empty().append("<option selected disabled>Seleccionar</option>");

    for (let i = 0; i < disCluster.length; i++) {

        const element = disCluster[i];

        if (element[0] == distritoSelec) {
            $("#opcCluster").append($("<option>", { value: element[1], text: element[1] }));
        }

    }

    $("#desCluster").show();
    $("#desBtnPresentacion").show();

    $("#grafica1").html("");

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        if ($("#mensual").prop("checked")) {
            
            for (let i = 0; i < disCluster.length; i++) {

                const element = disCluster[i];

                if (element[0] == distritoSelec) {
                    dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafClusMensual[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < disCluster.length; i++) {

                const element = disCluster[i];

                if (element[0] == distritoSelec) {

                    chart.load({
                        columns: [
                            datosGrafClusMensual[element[1]]
                        ]
                    });

                }

            }

        } else if ($("#semanal").prop("checked")) {
            
            for (let i = 0; i < disCluster.length; i++) {

                const element = disCluster[i];

                if (element[0] == distritoSelec) {
                    dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafClusSemanal[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < disCluster.length; i++) {

                const element = disCluster[i];

                if (element[0] == distritoSelec) {

                    chart.load({
                        columns: [
                            datosGrafClusSemanal[element[1]]
                        ]
                    });

                }

            }

        } else if ($("#diario").prop("checked")) {
            
            for (let i = 0; i < disCluster.length; i++) {

                const element = disCluster[i];

                if (element[0] == distritoSelec) {
                    dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafClusDiario[element[1]]);
                    break;
                }

            }

            for (let i = 0; i < disCluster.length; i++) {

                const element = disCluster[i];

                if (element[0] == distritoSelec) {

                    chart.load({
                        columns: [
                            datosGrafClusDiario[element[1]]
                        ]
                    });

                }

            }

        }

    } else {

        if ($("#mensual").prop("checked")) {
            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[distritoSelec]);
        } else if ($("#semanal").prop("checked")) {
            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[distritoSelec]);
        } else if ($("#diario").prop("checked")) {
            dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDisDiario[distritoSelec]);
        }

    }

}


function cambioOpcCluster(clusterSelec) {
    
    $("#desBtnPresentacion").hide();
    $("#grafica1").html("");

    if ($("#mensual").prop("checked")) {
        dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafClusMensual[clusterSelec]);
    } else if ($("#semanal").prop("checked")) {
        dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafClusSemanal[clusterSelec]);
    } else if ($("#diario").prop("checked")) {
        dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafClusDiario[clusterSelec]);
    }

}


function cambioSemanalInput() {
    
    let valor = "";
    $("#grafica1").html("");

    if ($("#cambioGrafica")[0].innerHTML == "Mostrar Segmentación") {

        if ($("#desCluster").is(":visible")) {

            valor = $("#opcCluster option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafClusSemanal[valor]);
            } else {
                valor = $("#opcDistrito option:selected").val();
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[valor]);
            }

        } else if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[valor]);
            } else {
                valor = $("#opcRegion option:selected").val();
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[valor]);
            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[regionSelec]);
            } else {
                valor = $("#opcDireccion option:selected").val();
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDirSemanal[valor]);
            }

        } else {
            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", ejeYDatosNacSemanal);
        }

    } else {

        if ($("#desCluster").is(":visible")) {

            valor = $("#opcCluster option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafClusSemanal[valor]);
            } else {

                valor = $("#opcDistrito option:selected").val();
                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafClusSemanal[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusSemanal[element[1]]
                            ]
                        });

                    }

                }

            }

        } else if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafClusSemanal[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusSemanal[element[1]]
                            ]
                        });

                    }

                }

            } else {

                valor = $("#opcRegion option:selected").val();

                for (let i = 0; i < regDistrito.length; i++) {

                    const element = regDistrito[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < regDistrito.length; i++) {

                    const element = regDistrito[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafDisSemanal[element[1]]
                            ]
                        });

                    }

                }

            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Región");
            } else {

                valor = $("#opcDireccion option:selected").val();

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafRegSemanal[element[1]]
                            ]
                        });

                    }

                }

            }

        } else {

            dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDirSemanal[direccion[0]]);

            for (let i = 1; i < direccion.length; i++) {

                chart.load({
                    columns: [
                        datosGrafDirSemanal[direccion[i]]
                    ]
                });

            }
            
        }

    }

}


function cambioMensualInput() {

    let valor = "";
    $("#grafica1").html("");

    if ($("#cambioGrafica")[0].innerHTML == "Mostrar Segmentación") {

        if ($("#desCluster").is(":visible")) {

            valor = $("#opcCluster option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafClusMensual[valor]);
            } else {
                valor = $("#opcDistrito option:selected").val();
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[valor]);
            }

        } else if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Distrito");
            } else {
                valor = $("#opcRegion option:selected").val();
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[valor]);
            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[valor]);
            } else {
                valor = $("#opcDireccion option:selected").val();
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDirMensual[valor]);
            }

        } else {
            dibujaGrafica("#grafica1", ejeXMeses, "meses", ejeYDatosNacMensual);
        }

    } else {

        if ($("#desCluster").is(":visible")) {

            valor = $("#opcCluster option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafClusMensual[valor]);
            } else {

                valor = $("#opcDistrito option:selected").val();

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafClusMensual[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusMensual[element[1]]
                            ]
                        });

                    }

                }

            }

        } else if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Distrito");
            } else {

                valor = $("#opcRegion option:selected").val();

                for (let i = 0; i < regDistrito.length; i++) {

                    const element = regDistrito[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < regDistrito.length; i++) {

                    const element = regDistrito[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafDisMensual[element[1]]
                            ]
                        });

                    }

                }

            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Región");
            } else {

                valor = $("#opcDireccion option:selected").val();

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafRegMensual[element[1]]
                            ]
                        });

                    }

                }

            }

        } else {

            dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDirMensual[direccion[0]]);

            for (let i = 1; i < direccion.length; i++) {

                chart.load({
                    columns: [
                        datosGrafDirMensual[direccion[i]]
                    ]
                });

            }

        }

    }

}


function cambioDiarioInput() {

    let valor = "";
    $("#grafica1").html("");

    if ($("#cambioGrafica")[0].innerHTML == "Mostrar Segmentación") {

        if ($("#desCluster").is(":visible")) {

            valor = $("#opcCluster option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafClusDiario[valor]);
            } else {
                valor = $("#opcDistrito option:selected").val();
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDisDiario[valor]);
            }

        } else if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Distrito");
            } else {
                valor = $("#opcRegion option:selected").val();
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[valor]);
            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[valor]);
            } else {
                valor = $("#opcDireccion option:selected").val();
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDirDiario[valor]);
            }

        } else {
            dibujaGrafica("#grafica1", ejeXDiario, "diario", ejeYDatosNacDiario);
        }

    } else {

        if ($("#desCluster").is(":visible")) {

            valor = $("#opcCluster option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafClusDiario[valor]);
            } else {

                valor = $("#opcDistrito option:selected").val();

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafClusDiario[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusDiario[element[1]]
                            ]
                        });

                    }

                }

            }

        } else if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Distrito");
            } else {

                valor = $("#opcRegion option:selected").val();

                for (let i = 0; i < regDistrito.length; i++) {

                    const element = regDistrito[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDisDiario[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < regDistrito.length; i++) {

                    const element = regDistrito[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafDisDiario[element[1]]
                            ]
                        });

                    }

                }

            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Región");
            } else {

                valor = $("#opcDireccion option:selected").val();

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == valor) {
                        dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[element[1]]);
                        break;
                    }

                }

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafRegDiario[element[1]]
                            ]
                        });

                    }

                }

            }

        } else {

            dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDirDiario[direccion[0]]);

            for (let i = 1; i < direccion.length; i++) {

                chart.load({
                    columns: [
                        datosGrafDirDiario[direccion[i]]
                    ]
                });

            }

        }

    }

}


function clickSemanal() {
    
    let valor = "";

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();
            $("#grafica1").html("");

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDisSemanal[valor]);
            } else {
                valor = $("#opcRegion option:selected").val();
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[valor]);
            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                $("#grafica1").html("");
                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafRegSemanal[regionSelec]);
            } else {

                valor = $("#opcDireccion option:selected").val();

                $("#grafica1").html("");

                dibujaGrafica("#grafica1", ejeXSemanas, "semanas", datosGrafDirSemanal[valor]);

            }

        } else {
            grafSoloNacional();
        }

        $("#cambioGrafica")[0].innerHTML = "Mostrar Segmentación";

    } else {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusSemanal[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            } else {

                valor = $("#opcRegion option:selected").val();

                for (let i = 0; i < regDistrito.length; i++) {

                    const element = regDistrito[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafDisSemanal[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Región");
            } else {

                valor = $("#opcDireccion option:selected").val();

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafRegSemanal[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            }

        } else {
            datosDesgNacional();
        }

        $("#cambioGrafica")[0].innerHTML = "Ocultar Segmentación";

    }

}


function clickMensual() {

    let valor = "";

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        $("#grafica1").html("");

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDisMensual[valor]);
            } else {
                valor = $("#opcRegion option:selected").val();
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[valor]);
            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafRegMensual[valor]);
            } else {
                valor = $("#opcDireccion option:selected").val();
                dibujaGrafica("#grafica1", ejeXMeses, "meses", datosGrafDirMensual[valor]);
            }

        } else {
            dibujaGrafica("#grafica1", ejeXMeses, "meses", ejeYDatosNacMensual);
        }

        $("#cambioGrafica")[0].innerHTML = "Mostrar Segmentación";

    } else {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusMensual[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            } else {

                valor = $("#opcRegion option:selected").val();

                for (let i = 0; i < regDistrito.length; i++) {

                    const element = regDistrito[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafDisMensual[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Región");
            } else {

                valor = $("#opcDireccion option:selected").val();

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafRegMensual[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            }

        } else {
            
            for (let i = 0; i < direccion.length; i++) {

                chart.load({
                    columns: [
                        datosGrafDirMensual[direccion[i]]
                    ]
                });

            }

            chart.unload({
                ids: "nacional"
            });

        }

        $("#cambioGrafica")[0].innerHTML = "Ocultar Segmentación";

    }

}


function clickDiario() {

    let valor = "";

    if ($("#cambioGrafica")[0].innerHTML == "Ocultar Segmentación") {

        $("#grafica1").html("");

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDisDiario[valor]);
            } else {
                valor = $("#opcRegion option:selected").val();
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[valor]);
            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafRegDiario[valor]);
            } else {
                valor = $("#opcDireccion option:selected").val();
                dibujaGrafica("#grafica1", ejeXDiario, "diario", datosGrafDirDiario[valor]);
            }

        } else {
            dibujaGrafica("#grafica1", ejeXDiario, "diario", ejeYDatosNacDiario);
        }

        $("#cambioGrafica")[0].innerHTML = "Mostrar Segmentación";

    } else {

        if ($("#desDistrito").is(":visible")) {

            valor = $("#opcDistrito option:selected").val();

            if (valor != "Seleccionar") {

                for (let i = 0; i < disCluster.length; i++) {

                    const element = disCluster[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafClusDiario[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            } else {

                valor = $("#opcRegion option:selected").val();

                for (let i = 0; i < regDistrito.length; i++) {

                    const element = regDistrito[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafDisDiario[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            }

        } else if ($("#desRegion").is(":visible")) {

            valor = $("#opcRegion option:selected").val();

            if (valor != "Seleccionar") {
                alert("Pendiente opcion Región");
            } else {

                valor = $("#opcDireccion option:selected").val();

                for (let i = 0; i < direcRegion.length; i++) {

                    const element = direcRegion[i];

                    if (element[0] == valor) {

                        chart.load({
                            columns: [
                                datosGrafRegDiario[element[1]]
                            ]
                        });

                    }

                }

                chart.unload({
                    ids: valor
                });

            }

        } else {

            for (let i = 0; i < direccion.length; i++) {

                chart.load({
                    columns: [
                        datosGrafDirDiario[direccion[i]]
                    ]
                });

            }

            chart.unload({
                ids: "nacional"
            });

        }

        $("#cambioGrafica")[0].innerHTML = "Ocultar Segmentación";

    }

}
