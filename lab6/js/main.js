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

function searchCustomer(){
	var output = '';
	$('#customers').html(output);
	var keyword = $('#gsearch').val();
	var transaction = db.transaction(["customers"],"readwrite");
	var store = transaction.objectStore("customers");
	var keyword2 = keyword.toLowerCase();
	var request = store.openCursor();
	request.onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
			console.log(cursor.value.id)
			if(cursor.value.name.toLowerCase().includes(keyword2) || cursor.value.sname.toLowerCase().includes(keyword2) || cursor.value.email.toLowerCase().includes(keyword2) || cursor.value.phone.toLowerCase().includes(keyword2) || cursor.value.idnr.toLowerCase().includes(keyword2) || cursor.value.nipnr.toLowerCase().includes(keyword2) || cursor.value.city.toLowerCase().includes(keyword2) ||
			cursor.value.street.toLowerCase().includes(keyword2) || cursor.value.housenr.toLowerCase().includes(keyword2) || cursor.value.postalcode.toLowerCase().includes(keyword2)){
				console.log("yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeS")
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

			}
			cursor.continue();          
		}
		$('#customers').html(output);
	};
}
///------------------------------
function generateRandom(){

   let fname = '';
   for(let i = 0; i < 8; i++){
      const random = Math.floor(Math.random() * 27);
      fname += String.fromCharCode(97 + random);
   };
   let sname = '';
   for(let i = 0; i < 8; i++){
      const random = Math.floor(Math.random() * 27);
      sname += String.fromCharCode(97 + random);
   };
   let email = '';
   for(let i = 0; i < 8; i++){
      const random = Math.floor(Math.random() * 27);
      email += String.fromCharCode(97 + random);
   };
   email = email + '@domain.com';
   
   let phone = '';
    for(let i = 0; i < 3; i++){
 
	   for(let i = 0; i < 3; i++){
		const random = Math.floor(Math.random() * 9) + 1;
		phone += random;
		};
		if (i==2){
			break;
		}
		phone += '-';
   };
   
   let idnr = '';
   for(let i = 0; i < 3; i++){
      const random = Math.floor(Math.random() * 27);
      idnr += String.fromCharCode(97 + random);
   };
   
   idnr = idnr.toUpperCase();
   idnr += ' ';
   
   for(let i = 0; i < 6; i++){
      const random = Math.floor(Math.random() * 9) + 1;
      idnr += random;
   };
   
   
   $("#name").val(fname);
   $("#sname").val(sname);
   $("#email").val(email);
   $("#phone").val(phone);
   $("#idnr").val(idnr);
   $("#nipnr").val(nipnr);
   $("#city").val(city);
   $("#street").val(street);
   $("#housenr").val(housenr);
   $("#postalcode").val(postalcode);
}
///-------------------------------
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



