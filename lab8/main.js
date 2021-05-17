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
	//--------------------------------------
	 $("#gsearch").keyup(function() {
       var keyword = $('#gsearch').val();
	   //console.log(keyword);
	   
	   searchCustomer2(keyword);
  
   });
   //--------------------------------------
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

	var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext('2d');

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
		postalcode: postalcode,
		img: canvas.toDataURL("image/jpeg")
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
			output += "<td><span class='cursor customer' contenteditable='true' data-field='img' data-id='"+cursor.value.id+"'>"+"<img width='100' height='100' src='"+cursor.value.img+"'>"+"</span></td>";
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

/*function editCustomer(id){
	var transaction = db.transaction(["customers"],"readwrite");
	var store = transaction.objectStore("customers");
	
	/*var request = store.delete(id);
	
	request.onsuccess = function(){
		console.log('customer '+id+' Deleted');
		$('.customer_'+id).remove();
	};
	
	request.onerror = function(e){
		alert("Sorry, the customer was not removed");
		console.log('Error', e.target.error.name);
	};
	console.log(id);
}*/

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
function searchCustomer2(){
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

   var fname = ['Anna', 'Alicja', 'Piotr','Aleksander', 'John','Adam','Dawid', 'Tomasz','Antonina','Maria'];
   const fnamenr = Math.floor(Math.random() * (fname.length-1)) + 1;
   
    var sname = ['Dziuda', 'Lipa', 'Kot','Wendo', 'Pedzel','Kon','Srebro', 'Brendo','Tuleja','Henrykowicz'];
   const snamenr = Math.floor(Math.random() * (sname.length-1)) + 1;
   
   /*let fname = '';
   for(let i = 0; i < 8; i++){
      const random = Math.floor(Math.random() * 27);
      fname += String.fromCharCode(97 + random);
   };*/
   /*let sname = '';
   for(let i = 0; i < 8; i++){
      const random = Math.floor(Math.random() * 27);
      sname += String.fromCharCode(97 + random);
   };*/
   let email = '';
   var letters = 'abcdefghijklmnopqrstuvwxyz';
   for(let i = 0; i < 8; i++){
      email += letters[Math.floor(Math.random() * letters.length)];
   };
   for(let i = 0; i < 2; i++){
      const random = Math.floor(Math.random() * 9) + 1;
      email += random;
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
   var chars = 'abcdefghijklmnopqrstuvwxyz';
   for(let i = 0; i < 3; i++){
	  idnr += chars[Math.floor(Math.random() * chars.length)];
   };
   
   idnr = idnr.toUpperCase();
   idnr += ' ';
   
   for(let i = 0; i < 6; i++){
      const random = Math.floor(Math.random() * 9) + 1;
      idnr += random;
   };
   
   let nipnr = '';
   for(let i = 0; i < 4; i++){
	   
	   if(i==0 || i==3){
		    for(let i = 0; i < 3; i++){
			  const random = Math.floor(Math.random() * 9) + 1;
			  nipnr += random;
		   };
	   }
	   else{
		    for(let i = 0; i < 2; i++){
			  const random = Math.floor(Math.random() * 9) + 1;
			  nipnr += random;
		   };
	   }
	    
		if (i==3){
			break;
		}
      nipnr += '-';
   };
   
   let housenr = '';
   const counter = Math.floor(Math.random() * 4) + 1;
   for(let i = 0; i < counter; i++){
	const random = Math.floor(Math.random() * 9) + 1;
	housenr += random;
	};
   
	
   let postalcode = '';
   for(let i = 0; i < 2; i++){
	const random = Math.floor(Math.random() * 9) + 1;
	postalcode += random;
	};
   postalcode += '-';
   for(let i = 0; i < 3; i++){
	const random = Math.floor(Math.random() * 9) + 1;
	postalcode += random;
	};
	
	
   var city = ['Lodz', 'Warszawa', 'Oslo','Chelm', 'Gdynia','Sopot','Londyn', 'Koszalin','Amsterdam','Bombaj'];
   
   const citynr = Math.floor(Math.random() * (city.length-1)) + 1;
   
   var street = ['Karolewska', 'Gdanska', 'Szkolna','Miastowa', 'Pokorna','Mileszewska','Rozana', 'Klonowa','Zielona','Czerwona'];
   
   const streetnr = Math.floor(Math.random() * (street.length-1)) + 1;
   $("#name").val(fname[fnamenr]);
   $("#sname").val(sname[snamenr]);
   $("#email").val(email);
   $("#phone").val(phone);
   $("#idnr").val(idnr);
   $("#nipnr").val(nipnr);
   $("#city").val(city[citynr]);
   $("#street").val(street[streetnr]);
   $("#housenr").val(housenr);
   $("#postalcode").val(postalcode);
}
///------------------------------------
function json(){
	
	var worker;
	
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
	
	var text = '{"name": "'+name+'", "sname": "'+sname+'", "email": "'+email+'", "phone": "'+phone+'", "idnr": "'+idnr+'", "nipnr": "'
	+nipnr+'", "city": "'+city+'", "street": "'+street+'", "housenr": "'+housenr+'", "postalcode": "'+postalcode+'"}';
	var obj = JSON.parse(text);
	
	if (typeof(w) == "undefined") {
		  worker  = new Worker("b.js");
		}
	
	worker.addEventListener('message', function(e) {
		$('#name').val(e.data["name"]);
		$('#sname').val(e.data["sname"]);
		$('#email').val(e.data["email"]);
		$('#phone').val(e.data["phone"]);
		$('#idnr').val(e.data["idnr"]);
		$('#nipnr').val(e.data["nipnr"]);
		$('#city').val(e.data["city"]);
		$('#street').val(e.data["street"]);
		$('#housenr').val(e.data["housenr"]);
		$('#postalcode').val(e.data["postalcode"]);
	}, false);
	worker.postMessage(obj);

}
///-------------------------------
function colors(){
	
	var worker;
	
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
	var jpg = $('#jpg').val();


	
	var text = '{"name": "'+name+'", "sname": "'+sname+'", "email": "'+email+'", "phone": "'+phone+'", "idnr": "'+idnr+'", "nipnr": "'
	+nipnr+'", "city": "'+city+'", "street": "'+street+'", "housenr": "'+housenr+'", "postalcode": "'+postalcode+'", "jpg": "'+jpg+'"}';
	var obj = JSON.parse(text);

	if (typeof(w) == "undefined") {
		  worker  = new Worker("c.js");
		}
	
	var R,G,B;
	var newColor


	worker.addEventListener('message', function(e) {
		R =e.data["r"];
		G= e.data["g"];
		B = e.data["b"];
		console.log(R);
		console.log(G);
		console.log(B);
		newColor= 'rgb(' + R+ ',' + G + ',' + B + ')';
		console.log(newColor);
		
		$("#image").css("background-image", "url(" + jpg + ")");

		$("#filter").css("background-color", newColor);
		$('#filter').css('opacity', '0.5');

		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext('2d');
	
		var base_image = new Image();
		base_image.src = jpg;
		base_image.crossOrigin = "Anonymous";
		base_image.onload = function () {
			context.width = 100;
			context.height = 100;
			
			context.rect(0, 0, 100, 100);
			context.stroke();
			context.fillStyle = 'rgba('+R+', '+G+', '+B+', 1)';
			context.fillRect(0, 0, 100, 100);
			context.globalAlpha=0.4;
			context.drawImage(base_image, 0, 0, 100, 100);

			canvas.toDataURL("image/jpeg");
			console.log(canvas.toDataURL("image/jpeg"));
		}
	
	}, false);
	worker.postMessage(obj);
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
	
	/*var lastVal = $(this).val();
	console.log(lastVal);
	
	if(field == 'phone'){
		var reg = '/[0-9]{3}-[0-9]{3}-[0-9]{3}/';
	
		if (newText.match(reg)){
			console.log("gitara");
		}
		else{
			console.log("lipa");
		}
	}*/
	

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
		else if(field == 'sname'){
			data.sname = newText;
		}else if(field == 'phone'){
			data.phone = newText;
		}
		else if(field == 'idnr'){
			data.idnr = newText;
		}else if(field == 'nipnr'){
			data.nipnr = newText;
		}
		else if(field == 'city'){
			data.city = newText;
		}else if(field == 'street'){
			data.street = newText;
		}else if(field == 'housenr'){
			data.housenr = newText;
		}else if(field == 'postalcode'){
			data.postalcode = newText;
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



