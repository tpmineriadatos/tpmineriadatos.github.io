var renglonesTabla = [],
    titulosTabla = [];

var datosCompleto = [],
    datosDireccion = [],
    listaRegion = [],
    listaDistritosProd = [];

var aux;


$(document).ready(function () {

    var currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    result -= 3;
    console.log(`The week number of the current date (${currentdate}) is ${result}.`);

    document.getElementById("productividad").style.backgroundColor = "rgb(25, 86, 255)";

    obtieneDatos();

    $("#opcDireccion").on("change", function (event) {

        valor = $("#opcDireccion option:selected").val();

        if (valor == "NACIONAL") {
            mostrarTablaCompleta();
        } else {

            mostrarTablaFiltro(valor, "direccion");

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

    datosCompleto.length = 0;

    for (let i = 1; i < renglonesTabla.length; i++) {

        const element = renglonesTabla[i].split(",");
        var row = {};

        row["direccion"] = element[0];
        row["region"] = element[1];
        row["distrito"] = element[2];
        row["semana"] = element[3];
        row["nsupervisor"] = element[4];
        row["nombresupervisor"] = element[5];
        row["ninstalador"] = element[6];
        row["nombreinstalador"] = element[7];
        row["fingreso"] = element[8];
        row["productividad"] = element[9];
        row["reincidencias"] = element[10];
        row["diastrabajados"] = element[11];
        row["ventatecnico"] = element[12];
        row["calificacion"] = parseFloat(element[13]) * 100;

        datosCompleto.push(row);

    }

    // aux = datosCompleto;
    mostrarTablaCompleta();

}


function mostrarTablaCompleta() {

    var datosImprimir = [];

    for (let i = 0; i < datosCompleto.length; i++) {

        const element = datosCompleto[i];
        var row = {};

        row["semana"] = element.semana;
        row["nsupervisor"] = element.nsupervisor;
        row["nombresupervisor"] = element.nombresupervisor;
        row["ninstalador"] = element.ninstalador;
        row["nombreinstalador"] = element.nombreinstalador;
        row["fingreso"] = element.fingreso;
        row["productividad"] = element.productividad;
        row["reincidencias"] = element.reincidencias;
        row["diastrabajados"] = element.diastrabajados;
        row["ventatecnico"] = element.ventatecnico;
        row["calificacion"] = element.calificacion;

        datosImprimir.push(row);

    }

    datosImprimir.sort(function (a, b) {
        return a.calificacion - b.calificacion;
    });

    // $("#contenidoTabla").empty();
    imprimeTabla(datosImprimir);

}


function mostrarTablaFiltro(filtro, combo) {

    var datosImprimir = [];

    if (combo == "direccion") {

        for (let i = 0; i < datosCompleto.length; i++) {

            const element = datosCompleto[i];

            if (element.direccion == filtro) {

                var row = {};

                row["semana"] = element.semana;
                row["nsupervisor"] = element.nsupervisor;
                row["nombresupervisor"] = element.nombresupervisor;
                row["ninstalador"] = element.ninstalador;
                row["nombreinstalador"] = element.nombreinstalador;
                row["fingreso"] = element.fingreso;
                row["productividad"] = element.productividad;
                row["reincidencias"] = element.reincidencias;
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
                row["nsupervisor"] = element.nsupervisor;
                row["nombresupervisor"] = element.nombresupervisor;
                row["ninstalador"] = element.ninstalador;
                row["nombreinstalador"] = element.nombreinstalador;
                row["fingreso"] = element.fingreso;
                row["productividad"] = element.productividad;
                row["reincidencias"] = element.reincidencias;
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
                row["nsupervisor"] = element.nsupervisor;
                row["nombresupervisor"] = element.nombresupervisor;
                row["ninstalador"] = element.ninstalador;
                row["nombreinstalador"] = element.nombreinstalador;
                row["fingreso"] = element.fingreso;
                row["productividad"] = element.productividad;
                row["reincidencias"] = element.reincidencias;
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

    // $("#contenidoTabla").empty();
    imprimeTabla(datosImprimir);

}


function imprimeTabla(datos) {

    var source = {
        localData: datos,
        dataType: "array",
        dataFields:
            [
                { name: "semana", type: "string" },
                { name: "nsupervisor", type: "string" },
                { name: "nombresupervisor", type: "string" },
                { name: "ninstalador", type: "string" },
                { name: "nombreinstalador", type: "string" },
                { name: "fingreso", type: "string" },
                { name: "productividad", type: "number" },
                { name: "reincidencias", type: "number" },
                { name: "diastrabajados", type: "number" },
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

    var firstNameColumnFilter = function () {
        var filtergroup = new $.jqx.filter();
        var filter_or_operator = 1;
        var filtervalue = "4";
        var filtercondition = "contains";
        var filter = filtergroup.createfilter("stringfilter", filtervalue, filtercondition);
        filtergroup.addfilter(filter_or_operator, filter);
        
        return filtergroup;

    }();

    $("#contenidoTabla").jqxGrid({

        autoheight: true,
        width: 1415, // Ocupa toda la pantalla: "100%"
        // height: 720,
        theme: "energyblue",
        pageSize: 20,
        pageable: true, // Lo separa por hojas
        pagerButtonsCount: 5, // Número de hojas a elegir
        source: dataAdapter,
        columnsResize: true,
        sortable: true,
        sortmode: "many",
        filterable: true,
        autoshowfiltericon: true,
        altrows: true,
        // selectionmode: 'singlecell',
        // ready: function () {
        //     $("#jqxgrid").jqxGrid('localizestrings', localizationobj);
        // },
        columns: [
            { text: "Semana", dataField: "semana", width: 65, cellsAlign: "center", align: "center", cellclassname: cellclass },
            { text: "#Empleado Supervisor", dataField: "nsupervisor", width: 160, align: "center", cellclassname: cellclass },
            { text: "Supervisor", dataField: "nombresupervisor", width: 200, align: "center", cellclassname: cellclass },
            { text: "#Empleado Instalador", dataField: "ninstalador", width: 160, align: "center", cellclassname: cellclass },
            { text: "Instalador", dataField: "nombreinstalador", width: 200, align: "center", cellclassname: cellclass },
            { text: "Antigüedad", dataField: "fingreso", width: 100, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Productividad", dataField: "productividad", width: 100, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Reincidencias", dataField: "reincidencias", width: 100, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Días Trabajados", dataField: "diastrabajados", width: 120, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Venta Técnico", dataField: "ventatecnico", width: 110, cellsAlign: "right", align: "center", cellclassname: cellclass },
            { text: "Calificación", dataField: "calificacion", width: 100, cellsAlign: "right", align: "center", cellsformat: "p2", cellclassname: cellclass },
        ],
        ready: function () {
            // $("#contenidoTabla").jqxGrid('sortby', 'calificacion', "asc");
            $("#contenidoTabla").jqxGrid('sortby', 'semana', "desc");
            // addfilter();
        },

    });

    // $("#contenidoTabla").on("filter", function(event) {

    //     console.log(event);
    //     aux = $("#contenidoTabla").jqxGrid('getfilterinformation');

    // });

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

}
