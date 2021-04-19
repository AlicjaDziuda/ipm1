$(document).ready(function(){
	var request = indexedDB.open('customermanager',1);
	
	request.onupgradeneeded = function(e){
		var db = e.target.result;
		
		if(!db.objectStoreNames.contains('customers')){
			var os = db.createObjectStore('customers',{keyPath: "id", autoIncrement:true});
			
			os.createIndex('name','name',{unique:false});
		}
	};
	

	request.onsuccess = function(e){
		console.log('Success: Opened Database...');
		db = e.target.result;
	
		showCustomers();
	};
	

	request.onerror = function(e){
		console.log('Error: Could Not Open Database...');
	};
});


function addCustomer(){
	var name = $('#name').val();
	var sname = $('#sname').val();
	var email = $('#email').val();
	var phone = $('#phone').val();
	var idnr = $('#idnr').val();
	var nipnr = $('#nipnr').val();
	var city = $('#city').val();
	var street = $('#street').val();
	var housenr = $('#housenr').val();
	var postalcode = $('#postalcode').val();
	
	var transaction = db.transaction(["customers"],"readwrite");
	var store = transaction.objectStore("customers");
	
	var customer = {
		name: name,
		sname: sname,
		email: email,
		phone: phone,
		idnr: idnr,
		nipnr: nipnr,
		city: city,
		street: street,
		housenr: housenr,
		postalcode: postalcode
	};
	console.log(customer);
	var request = store.add(customer);

	request.onsuccess = function(e){
		window.location.href="index.html";
	};
	

	request.onerror = function(e){
		alert("Sorry, the customer was not added");
		console.log('Error', e.target.error.name);
	};
}

function showCustomers(e){
	var transaction = db.transaction(["customers"],"readonly");
	
	var store = transaction.objectStore("customers");
	var index = store.index('name');
	
	var output = '';
	index.openCursor().onsuccess = function(e){
		var cursor = e.target.result;
		if(cursor){
			output += "<tr id='customer_"+cursor.value.id+"'>";
			output += "<td>"+cursor.value.id+"</td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='name' data-id='"+cursor.value.id+"'>"+cursor.value.name+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='sname' data-id='"+cursor.value.id+"'>"+cursor.value.sname+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='email' data-id='"+cursor.value.id+"'>"+cursor.value.email+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='phone' data-id='"+cursor.value.id+"'>"+cursor.value.phone+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='idnr' data-id='"+cursor.value.id+"'>"+cursor.value.idnr+"</span></td>";
			
			output += "<td><span class='cursor customer' contenteditable='true' data-field='nipnr' data-id='"+cursor.value.id+"'>"+cursor.value.nipnr+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='city' data-id='"+cursor.value.id+"'>"+cursor.value.city+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='street' data-id='"+cursor.value.id+"'>"+cursor.value.street+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='housenr' data-id='"+cursor.value.id+"'>"+cursor.value.housenr+"</span></td>";
			
			
			
			output += "<td><span class='cursor customer' contenteditable='true' data-field='postalcode' data-id='"+cursor.value.id+"'>"+cursor.value.postalcode+"</span></td>";
			output += "<td><a onclick='removeCustomer("+cursor.value.id+")' href=''>Delete</a></td>";
			output += "</tr>";
			cursor.continue();
		}
		$('#customers').html(output);
	};
}


function removeCustomer(id){
	var transaction = db.transaction(["customers"],"readwrite");
	var store = transaction.objectStore("customers");
	
	var request = store.delete(id);
	
	request.onsuccess = function(){
		console.log('customer '+id+' Deleted');
		$('.customer_'+id).remove();
	};
	
	request.onerror = function(e){
		alert("Sorry, the customer was not removed");
		console.log('Error', e.target.error.name);
	};
}

function search(){
	var keyword = $('#gsearch').val();
	console.log(keyword);

	/*var transaction = db.transaction(["customers"],"readwrite");
	var store = transaction.objectStore("customers");

	var request = store.openCursor();
	request.onsuccess = function(event) {
		console.log("sukces");
		var cursor = event.target.result;
		if (cursor) {
			console.log(cursor.value.name.toLowerCase());
			if(cursor.value.name.toLowerCase().includes(filter)){
				console.log("yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeS")
			}		*/		
			/*if (cursor.value.column.indexOf(keyword) !== -1) {                
				console.log("We found a row with value: " + JSON.stringify(cursor.value));
			} */ 

			/*cursor.continue();          
		}
	};*/
	
	
	//window.location.href="index.html";

	
}

function clearCustomers(){
	indexedDB.deleteDatabase('customermanager');
	window.location.href="index.html";
}


$('#customers').on('blur','.customer',function(){

	var newText = $(this).html();

	var field = $(this).data('field');

	var id = $(this).data('id');
	

	var transaction = db.transaction(["customers"],"readwrite");

	var store = transaction.objectStore("customers");
	
	var request = store.get(id);
	
	request.onsuccess = function(){
		var data = request.result;
		if(field == 'name'){
			data.name = newText;
		} else if(field == 'email'){
			data.email = newText;
		}
		

		var requestUpdate = store.put(data);
		
		requestUpdate.onsuccess = function(){
			console.log('Customer field updated...');
		};
		
		requestUpdate.onerror = function(){
			console.log('Error: Customer field NOT updated...');
		};
	};
});



