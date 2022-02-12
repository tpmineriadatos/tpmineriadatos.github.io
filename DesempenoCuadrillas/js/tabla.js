var renglonesTabla = [],
    titulosTabla = [];

var datosCompleto = [],
    datosDireccion = [],
    listaRegion = [],
    listaDistritosProd = [];

var aux;


$(document).ready(function () {

    let actSemana = "";
    var currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    result -= 3;
    actSemana = "Última actualización: Semana " + ("0" + result).slice(-2) +"&nbsp;&nbsp;&nbsp;";

    $("#ultActualizacion").html(actSemana);
    document.getElementById("productividad").style.backgroundColor = "rgb(25, 86, 255)";

    $("#desPlaza").hide();
    $("#desDistrito").hide();

    obtieneDatos();

    $("#opcDireccion").on("change", function (event) {

        valor = $("#opcDireccion option:selected").val();

        if (valor == "NACIONAL") {
            $("#desPlaza").hide();
            $("#desDistrito").hide();
            mostrarTablaCompleta();
        } else {

            mostrarTablaFiltro(valor, "direccion");

            $("#desDistrito").hide();
            $("#opcPlaza").empty();
            $("#opcPlaza").append("<option disabled selected>Seleccionar</option>");

            listasComboRegion(valor);

        }

    });

    $("#opcPlaza").on("change", function (event) {

        valor = $("#opcPlaza option:selected").val();

        mostrarTablaFiltro(valor, "region");

        $("#opcDistrito").empty();
        $("#opcDistrito").append("<option disabled selected>Seleccionar</option>");

        listasComboDistritoProd(valor);

    });

    $("#opcDistrito").on("change", function (event) {
        valor = $("#opcDistrito option:selected").val();
        mostrarTablaFiltro(valor, "distrito");
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

    for (let i = 1; i < renglonesTabla.length; i++) {

        const element = renglonesTabla[i].split(",");
        let antiguedad = "";
        var row = {};

        if (parseFloat(element[13]) != 0) {

            let fecha = element[8];

            if (fecha.length == 8) {
                
                let arr = fecha.split("/");
                let fechaOrden = arr[1] + "/" + arr[0] + "/" + arr[2];
                let fechaIni = new Date(fechaOrden),
                    fechaFin = new Date();
                let diferencia = fechaFin - fechaIni;
                let difAnios = diferencia / (1000 * 60 * 60 * 24 * 365);

                antiguedad = difAnios.toFixed(1) + " años";

            } else {
                antiguedad = "-";
            }
            
            row["direccion"] = element[0];
            row["region"] = element[1];
            row["distrito"] = element[2];
            row["semana"] = element[3];
            row["nsupervisor"] = element[4];
            row["nombresupervisor"] = element[5];
            row["ninstalador"] = element[6];
            row["nombreinstalador"] = element[7];
            row["antiguedad"] = antiguedad;
            row["productividad"] = element[9];
            row["numreincidencias"] = element[10];
            row["porcreincidencias"] = element[10];
            row["diastrabajados"] = element[11];
            row["ventatecnico"] = element[12];
            row["calificacion"] = parseFloat(element[13]) * 100;
    
            datosCompleto.push(row);

        } else {
            cantidadCeros++;
        }

    }

    // aux = datosCompleto;
    console.log("cantidadCeros=", cantidadCeros);

    mostrarTablaCompleta();

}


function mostrarTablaCompleta() {

    var datosImprimir = [];

    for (let i = 0; i < datosCompleto.length; i++) {

        const element = datosCompleto[i];
        var row = {};

        row["semana"] = element.semana;
        row["direccion"] = element.direccion;
        row["region"] = element.region;
        row["distrito"] = element.distrito;
        row["nsupervisor"] = element.nsupervisor;
        row["nombresupervisor"] = element.nombresupervisor;
        row["ninstalador"] = element.ninstalador;
        row["nombreinstalador"] = element.nombreinstalador;
        row["antiguedad"] = element.antiguedad;
        row["productividad"] = element.productividad;
        row["numreincidencias"] = element.numreincidencias;
        row["porcreincidencias"] = element.porcreincidencias;
        row["diastrabajados"] = element.diastrabajados;
        row["ventatecnico"] = element.ventatecnico;
        row["calificacion"] = element.calificacion;

        datosImprimir.push(row);

    }

    datosImprimir.sort(function (a, b) {
        return a.calificacion - b.calificacion;
    });

    // aux = datosImprimir;
    imprimeTabla(datosImprimir, "nacional");

}


function mostrarTablaFiltro(filtro, combo) {

    var datosImprimir = [];

    if (combo == "direccion") {

        for (let i = 0; i < datosCompleto.length; i++) {

            const element = datosCompleto[i];

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
                row["antiguedad"] = element.antiguedad;
                row["productividad"] = element.productividad;
                row["numreincidencias"] = element.numreincidencias;
                row["porcreincidencias"] = element.porcreincidencias;
                row["diastrabajados"] = element.diastrabajados;
                row["ventatecnico"] = element.ventatecnico;
                row["calificacion"] = element.calificacion;

                datosImprimir.push(row);

            }

        }

    } else if (combo == "region") {

        for (let i = 0; i < datosCompleto.length; i++) {

            const element = datosCompleto[i];

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
                row["antiguedad"] = element.antiguedad;
                row["productividad"] = element.productividad;
                row["numreincidencias"] = element.numreincidencias;
                row["porcreincidencias"] = element.porcreincidencias;
                row["diastrabajados"] = element.diastrabajados;
                row["ventatecnico"] = element.ventatecnico;
                row["calificacion"] = element.calificacion;

                datosImprimir.push(row);

            }

        }

    } else if (combo == "distrito") {

        for (let i = 0; i < datosCompleto.length; i++) {

            const element = datosCompleto[i];

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
                row["antiguedad"] = element.antiguedad;
                row["productividad"] = element.productividad;
                row["numreincidencias"] = element.numreincidencias;
                row["porcreincidencias"] = element.porcreincidencias;
                row["diastrabajados"] = element.diastrabajados;
                row["ventatecnico"] = element.ventatecnico;
                row["calificacion"] = element.calificacion;

                datosImprimir.push(row);

            }

        }

    }

    datosImprimir.sort(function (a, b) {
        return a.calificacion - b.calificacion;
    });

    imprimeTabla(datosImprimir, combo);

}


function imprimeTabla(datos, combo) {

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
                { name: "antiguedad", type: "string" },
                { name: "diastrabajados", type: "number" },
                { name: "productividad", type: "number" },
                { name: "numreincidencias", type: "number" },
                { name: "porcreincidencias", type: "number" },
                { name: "ventatecnico", type: "number" },
                { name: "calificacion", type: "number" },

            ]//,
        // sortcolumn: 'calificacion',
        // sortdirection: 'asc'
    };

    var cellclass = function (row, columnfield, value) {

        var rowData = $("#contenidoTabla").jqxGrid('getrowdata', row);
        var quantity = rowData.calificacion;

        if (quantity <= 70) {
            return "red";
        } else if (quantity < 90) {
            return "yellow";
        } else
            return "green";

    };

    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#contenidoTabla").jqxGrid({

        autoheight: true,
        autorowheight: true,
        width: "100%", // Ocupa toda la pantalla: "100%"
        // height: 720,
        theme: "energyblue",
        // pageSize: 20,
        pageable: true, // Lo separa por hojas
        pagerButtonsCount: 5, // Número de hojas a elegir
        source: dataAdapter,
        columnsResize: true,
        sortable: true,
        sortmode: "many",
        filterable: true,
        autoshowfiltericon: true,
        pagesizeoptions: ['10', '20', '50', '100', '1000'],
        // altrows: true,
        // selectionmode: 'singlecell',
        columns: [
            { text: "Semana", dataField: "semana", width: 65, cellsAlign: "center", align: "center", cellclassname: cellclass },
            { text: "Dirección", dataField: "direccion", width: 160, cellsAlign: "left", cellclassname: cellclass },
            { text: "Región", dataField: "region", width: 160, cellsAlign: "left", cellclassname: cellclass },
            { text: "Distrito", dataField: "distrito", width: 160, cellsAlign: "left", cellclassname: cellclass },
            { text: "#Empleado Supervisor", dataField: "nsupervisor", width: 160, align: "center", cellclassname: cellclass },
            { text: "Supervisor", dataField: "nombresupervisor", width: 200, align: "center", cellclassname: cellclass },
            { text: "#Empleado Instalador", dataField: "ninstalador", width: 160, align: "center", cellclassname: cellclass },
            { text: "Instalador", dataField: "nombreinstalador", width: 200, align: "center", cellclassname: cellclass },
            { text: "Antigüedad", dataField: "antiguedad", width: 100, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Obj: >=6 Pond: 20%", columngroup: "dias", dataField: "diastrabajados", width: 120, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Obj: >=3.5 Pond: 35%", columngroup: "produc", dataField: "productividad", width: 100, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Cantidad", columngroup: "nrein", dataField: "numreincidencias", width: 100, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Porcentaje Obj: 0%", columngroup: "nrein", dataField: "porcreincidencias", width: 100, cellsAlign: "right", align: "center", cellclassname: cellclass, cellsformat: "p2" },
            { text: "Obj: >=1 Pond: 5%", columngroup: "vtatec", dataField: "ventatecnico", width: 110, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Calificación", dataField: "calificacion", width: 100, cellsAlign: "right", align: "center", cellsformat: "p2", cellclassname: cellclass,
                createwidget: function (row, column, value, htmlElement) {

                    var datarecord = "";

                    if (value <= 70) {
                        datarecord = "roja";
                    } else if (value < 90) {
                        datarecord = "amarilla";
                    } else{
                        datarecord = "verde";
                    }

                    var imgurl = "img/" + datarecord + ".png";
                    var img = '<img style="margin-top: 8px;" height="25" width="25" src="' + imgurl + '"/>';
                    var button = $("<div style='border:none;'>" + img
                                    + "<div class='btnTexto'>" + value + "</div></div>");
                    $(htmlElement).append(button);
                    button.jqxButton({ template: "success", height: '100%', width: '100%' });
                    // button.click(function (event) {
                    //     var clickedButton = button.find(".buttonValue")[0].innerHTML;
                    //     alert(clickedButton);
                    // });
                },
                initwidget: function (row, column, value, htmlElement) {

                    var datarecord = "";

                    if (value <= 70) {
                        datarecord = "roja";
                    } else if (value < 90) {
                        datarecord = "amarilla";
                    } else {
                        datarecord = "verde";
                    }
                    var imgurl = "img/" + datarecord + ".png";
                    $(htmlElement).find('.btnTexto')[0].innerHTML = parseFloat(value).toFixed(2);
                    $(htmlElement).find('img')[0].src = imgurl;
                }
            }
        ],
        columngroups: [
            { text: "Días Trabajados", align: "center", name: "dias" },
            { text: "Productividad", align: "center", name: "produc" },
            { text: "Reincidencias Pond: 40%", align: "center", name: "nrein" },
            { text: "Venta Técnico", align: "center", name: "vtatec" }
        ],
        ready: function () { // Solo se ejecuta la primera vez que se carga la tabla
            // $("#contenidoTabla").jqxGrid('sortby', 'calificacion', "asc");
            $("#contenidoTabla").jqxGrid("sortby", "semana", "desc");
            // $("#contenidoTabla").jqxGrid("hidecolumn", "direccion");
            $("#contenidoTabla").jqxGrid("autoresizecolumns");
        },

    });

    // $("#contenidoTabla").on("filter", function(event) {

    //     console.log(event);
    //     aux = $("#contenidoTabla").jqxGrid('getfilterinformation');

    // });


    /**
     * Control de las columnas de acuerdo al filtro aplicado
     */
    $("#contenidoTabla").jqxGrid("beginupdate");
    // $("#contenidoTabla").jqxGrid("autoresizecolumns");

    if (combo == "nacional") {

        $("#contenidoTabla").jqxGrid("showcolumn", "direccion");
        $("#contenidoTabla").jqxGrid("showcolumn", "region");
        $("#contenidoTabla").jqxGrid("showcolumn", "distrito");

    } else if (combo == "direccion") {

        $("#contenidoTabla").jqxGrid("hidecolumn", "direccion");
        $("#contenidoTabla").jqxGrid("showcolumn", "region");
        $("#contenidoTabla").jqxGrid("showcolumn", "distrito");

    } else if (combo == "region") {

        $("#contenidoTabla").jqxGrid("hidecolumn", "direccion");
        $("#contenidoTabla").jqxGrid("hidecolumn", "region");
        $("#contenidoTabla").jqxGrid("showcolumn", "distrito");

    } else if (combo == "distrito") {

        $("#contenidoTabla").jqxGrid("hidecolumn", "direccion");
        $("#contenidoTabla").jqxGrid("hidecolumn", "region");
        $("#contenidoTabla").jqxGrid("hidecolumn", "distrito");

    }

    // $("#contenidoTabla").jqxGrid("sortby", "calificacion", "asc");
    $("#contenidoTabla").jqxGrid("endupdate");

}


function listasComboRegion(direccionSelec) {

    // let datoRepetido = "";

    listaRegion.length = 0;

    for (let i = 0; i < datosCompleto.length; i++) {

        const element = datosCompleto[i];

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

    // let datoRepetido = "";

    listaDistritosProd.length = 0;

    for (let i = 0; i < datosCompleto.length; i++) {

        const element = datosCompleto[i];

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
