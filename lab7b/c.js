this.addEventListener('message', function(e) {

    var newName = letters(e.data["name"]);
	var newSname = letters(e.data["sname"]);
	var newEmail = letters(e.data["email"]);
	var newPhone = letters(e.data["phone"]);
	var newId = letters(e.data["idnr"]);
	var newNip = letters(e.data["nipnr"]);
	var newCity = letters(e.data["city"]);
	var newStreet = letters(e.data["street"]);
	var newHousenr = letters(e.data["housenr"]);
	var newPostal = letters(e.data["postalcode"]);
    

   /* var text2 = '{"name": "'+newName+'", "sname": "'+newSname+'", "email": "'+newEmail+'", "phone": "'+newPhone+'", "idnr": "'+newId+'", "nipnr": "'
	+newNip+'", "city": "'+newCity+'", "street": "'+newStreet+'", "housenr": "'+newHousenr+'", "postalcode": "'+newPostal+'"}';
	var obj2 = JSON.parse(text2);
	console.log(obj2);
    this.postMessage(obj2);*/
    
}, false);

function letters(value){
	var count = 0;
	
	for (var i = 0; i < value.length; i++) {
		var ch = value.charAt(i);
		if (ch == ch.toUpperCase()) {
			invert += ch.toLowerCase() 
		}else{
			invert += ch.toUpperCase(); 
		}
	}
	console.log(count);
	return count;
}