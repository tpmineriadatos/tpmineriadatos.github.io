$(document).ready(function () {
	// prepare the data
	var data = new Array();
	var firstNames =
		["Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars", "Petra", "Martin", "Sven", "Elio", "Beate", "Cheryl", "Michael", "Guylene"];
	var lastNames =
		["Fuller", "Davolio", "Burke", "Murphy", "Nagase", "Saavedra", "Ohno", "Devling", "Wilson", "Peterson", "Winkler", "Bein", "Petersen", "Rossi", "Vileid", "Saylor", "Bjorn", "Nodier"];
	var productNames =
		["Black Tea", "Green Tea", "Caffe Espresso", "Doubleshot Espresso", "Caffe Latte", "White Chocolate Mocha", "Cramel Latte", "Caffe Americano", "Cappuccino", "Espresso Truffle", "Espresso con Panna", "Peppermint Mocha Twist"];
	var priceValues =
		["2.25", "1.5", "3.0", "3.3", "4.5", "3.6", "3.8", "2.5", "5.0", "1.75", "3.25", "4.0"];
	for (var i = 0; i < 100; i++) {
		var row = {};
		var productindex = Math.floor(Math.random() * productNames.length);
		var price = parseFloat(priceValues[productindex]);
		var quantity = 1 + Math.round(Math.random() * 10);
		row["firstname"] = firstNames[Math.floor(Math.random() * firstNames.length)];
		row["lastname"] = lastNames[Math.floor(Math.random() * lastNames.length)];
		row["productname"] = productNames[productindex];
		row["price"] = price;
		row["quantity"] = quantity;
		row["total"] = price * quantity;
		data[i] = row;
	}
	var source =
	{
		localdata: data,
		datatype: "array"
	};
	var cellclass = function (row, columnfield, value) {
		var rowData = $("#jqxgrid").jqxGrid('getrowdata', row);
		var quantity = rowData.quantity;
		if (quantity < 6) {
			return 'red';
		} else if (quantity < 10) {
			return 'yellow';
		} else return 'green';
	};
	$("#jqxgrid").jqxGrid(
		{
			width: 820,
			source: source,
			pageable: true,
			autoheight: true,
			/*ready: function(){
			  var data=$('#jqxgrid').jqxGrid('getrows');
			  alert(JSON.stringify(data[1])+"\n\n"+
			  JSON.stringify($('#jqxgrid').jqxGrid('getrowdata', data[1].uid))
				   +"\n\n"+
			  JSON.stringify($('#jqxgrid').jqxGrid('getcell', data[1].uid, 'Test1'))
				   );
			  //$('#jqxgrid :input[value="Test 1"]').prop('disabled', true);
			},*/
			columns: [
				{
					text: 'First Name', datafield: 'firstname', width: 100, cellclassname: cellclass, rendered: function (element) {
						$(element).jqxTooltip({ position: 'mouse', content: "First Name tooltip!" });
					}
				},
				{ text: 'Last Name', datafield: 'lastname', width: 100, cellclassname: cellclass },
				{ text: 'Product', datafield: 'productname', width: 180, cellclassname: cellclass },
				{ text: 'Quantity', datafield: 'quantity', width: 80, cellsalign: 'right', cellclassname: cellclass },
				{ text: 'Unit Price', datafield: 'price', width: 90, cellsalign: 'right', cellclassname: cellclass, cellsformat: 'c2' },
				{ text: 'Total', datafield: 'total', cellsalign: 'right', width: 90, cellsformat: 'c2', cellclassname: cellclass },
				{
					text: 'Test', datafield: 'Test1', columntype: 'button', width: 90, cellclassname: cellclass,
					cellsrenderer: function () { return "Test 1"; },
					buttonclick: function (row) {
						test();
					}
				},
				{
					text: 'Test', datafield: 'Test2', columntype: 'button', width: 90, cellclassname: cellclass,
					cellsrenderer: function () { return "Test 2"; },
					buttonclick: function (row) {
						test();
					}
				}
			]
		});
});
function test() {
	alert('test'); $('#jqxgrid').jqxGrid('clearselection');
}