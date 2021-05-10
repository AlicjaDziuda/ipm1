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
    var newjpg = letters(e.data["postalcode"]);

	var suma = newName + newSname + newEmail + newPhone + newId + newNip + newCity + newStreet + newHousenr + newPostal + newjpg;
	console.log(suma);

	//wyliczenie RGB 

	var R = suma % 255;
	var G = 255 - (suma % 255);
	var B = (0.5*R>125)?99:199;
	console.log("R" + R);
	console.log("G" + G);
	console.log("B" + B);
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
		if(ch.match(/a/) || ch.match(/A/)){
			count = count + 1;
			if(ch.match(/A/)){
				count = count + 30;
			}
		}
		else if(ch.match(/b/) || ch.match(/B/)){
			count = count + 2;
			if(ch.match(/B/)){
				count = count + 30;
			}
		}
		else if(ch.match(/c/) || ch.match(/C/)){
			count = count + 3;
			if(ch.match(/C/)){
				count = count + 30;
			}
		}
		else if(ch.match(/d/) || ch.match(/D/)){
			count = count + 4;
			if(ch.match(/D/)){
				count = count + 30;
			}
		}
		else if(ch.match(/e/) || ch.match(/E/)){
			count = count + 5;
			if(ch.match(/E/)){
				count = count + 30;
			}
		}
		else if(ch.match(/f/) || ch.match(/F/)){
			count = count + 6;
			if(ch.match(/F/)){
				count = count + 30;
			}
		}
		else if(ch.match(/g/) || ch.match(/G/)){
			count = count + 7;
			if(ch.match(/G/)){
				count = count + 30;
			}
		}
		else if(ch.match(/h/) || ch.match(/H/)){
			count = count + 8;
			if(ch.match(/H/)){
				count = count + 30;
			}
		}
		else if(ch.match(/i/) || ch.match(/I/)){
			count = count + 9;
			if(ch.match(/I/)){
				count = count + 30;
			}
		}
		else if(ch.match(/j/) || ch.match(/J/)){
			count = count + 10;
			if(ch.match(/J/)){
				count = count + 30;
			}
		}
		else if(ch.match(/k/) || ch.match(/K/)){
			count = count + 11;
			if(ch.match(/K/)){
				count = count + 30;
			}
		}
		else if(ch.match(/l/) || ch.match(/L/)){
			count = count + 12;
			if(ch.match(/L/)){
				count = count + 30;
			}
		}
		else if(ch.match(/m/) || ch.match(/M/)){
			count = count + 13;
			if(ch.match(/M/)){
				count = count + 30;
			}
		}
		else if(ch.match(/n/) || ch.match(/N/)){
			count = count + 14;
			if(ch.match(/N/)){
				count = count + 30;
			}
		}
		else if(ch.match(/o/) || ch.match(/O/)){
			count = count + 15;
			if(ch.match(/O/)){
				count = count + 30;
			}
		}
		else if(ch.match(/p/) || ch.match(/P/)){
			count = count + 16;
			if(ch.match(/P/)){
				count = count + 30;
			}
		}
		else if(ch.match(/q/) || ch.match(/Q/)){
			count = count + 17;
			if(ch.match(/Q/)){
				count = count + 30;
			}
		}
		else if(ch.match(/r/) || ch.match(/R/)){
			count = count + 18;
			if(ch.match(/R/)){
				count = count + 30;
			}
		}
		else if(ch.match(/s/) || ch.match(/S/)){
			count = count + 19;
			if(ch.match(/S/)){
				count = count + 30;
			}
		}
		else if(ch.match(/t/) || ch.match(/T/)){
			count = count + 20;
			if(ch.match(/T/)){
				count = count + 30;
			}
		}
		else if(ch.match(/u/) || ch.match(/U/)){
			count = count + 21;
			if(ch.match(/U/)){
				count = count + 30;
			}
		}
		else if(ch.match(/v/) || ch.match(/V/)){
			count = count + 22;
			if(ch.match(/V/)){
				count = count + 30;
			}
		}
		else if(ch.match(/w/) || ch.match(/W/)){
			count = count + 23;
			if(ch.match(/W/)){
				count = count + 30;
			}
		}
		else if(ch.match(/x/) || ch.match(/X/)){
			count = count + 24;
			if(ch.match(/X/)){
				count = count + 30;
			}
		}
		else if(ch.match(/y/) || ch.match(/Y/)){
			count = count + 25;
			if(ch.match(/Y/)){
				count = count + 30;
			}
		}
		else if(ch.match(/z/) || ch.match(/Z/)){
			count = count + 26;
			if(ch.match(/Z/)){
				count = count + 30;
			}
		}
		//console.log(count)
		
	}
	console.log(count);
	return count;
}