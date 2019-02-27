function  submitOnClick() {
	var count = 0;

	var Table = document.getElementById("myTable");
	Table.innerHTML = "";

	var firstname = document.getElementById('inputFirstname').value;
	var lastname = document.getElementById('inputLastname').value;
	var email = document.getElementById('inputEmail').value;

	if (document.getElementById('radio1').checked) {
		gender = document.getElementById('radio1').value;
	}else if (document.getElementById('radio2').checked){
		gender = document.getElementById('radio2').value;
	}
	else if (document.getElementById('radio3').checked){
		gender = document.getElementById('radio3').value;
	}

	var tel = document.getElementById('inputTel').value;
	

	if (tel == '') {
		if (gender=='') {
			if (firstname != '' && lastname == '' && email == '') {  
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					writeTable(user);
				});
			}else if (firstname == '' && lastname != '' && email == '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('lastname')
				.equalTo(lastname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					writeTable(user);
				});
			}else if (firstname == '' && lastname == '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('email')
				.equalTo(email)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					writeTable(user);
				});
			}else if (firstname != '' && lastname != '' && email == '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.lastname == lastname) {
						writeTable(user);
					}
				});
			}else if (firstname != '' && lastname == '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.email == email) {
						writeTable(user);
					}
				});
			}else if (firstname == '' && lastname != '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('lastname')
				.equalTo(lastname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.email == email) {
						writeTable(user);
					}
				});
			}else if (firstname != '' && lastname != '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.lastname == lastname) {
						if (user.email == email) {
							writeTable(user);
						}
					}
				});
			}
		}else if (gender == 'male') {
			if (firstname != '' && lastname == '' && email == '') {  
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.sex == 'male') {
						writeTable(user);
					}
				});
			}else if (firstname == '' && lastname != '' && email == '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('lastname')
				.equalTo(lastname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.sex == 'male') {
						writeTable(user);
					}
				});
			}else if (firstname == '' && lastname == '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('email')
				.equalTo(email)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.sex == 'male') {
						writeTable(user);
					}
				});
			}else if (firstname != '' && lastname != '' && email == '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.lastname == lastname) {
						if (user.sex == 'male') {
							writeTable(user);
						}
					}
				});
			}else if (firstname != '' && lastname == '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.email == email) {
						if (user.sex == 'male') {
							writeTable(user);
						}
					}
				});
			}else if (firstname == '' && lastname != '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('lastname')
				.equalTo(lastname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.email == email) {
						if (user.sex == 'male') {
							writeTable(user);
						}
					}
				});
			}else if (firstname != '' && lastname != '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.lastname == lastname) {
						if (user.email == email) {
							if (user.sex == 'male') {
								writeTable(user);
							}
						}
					}
				});
			}
		}else if (gender == 'female') {
			if (firstname != '' && lastname == '' && email == '') {  
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.sex == 'female') {
						writeTable(user);
					}
				});
			}else if (firstname == '' && lastname != '' && email == '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('lastname')
				.equalTo(lastname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.sex == 'female') {
						writeTable(user);
					}
				});
			}else if (firstname == '' && lastname == '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('email')
				.equalTo(email)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.sex == 'female') {
						writeTable(user);
					}
				});
			}else if (firstname != '' && lastname != '' && email == '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.lastname == lastname) {
						if (user.sex == 'female') {
							writeTable(user);
						}
					}
				});
			}else if (firstname != '' && lastname == '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.email == email) {
						if (user.sex == 'female') {
							writeTable(user);
						}
					}
				});
			}else if (firstname == '' && lastname != '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('lastname')
				.equalTo(lastname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.email == email) {
						if (user.sex == 'female') {
							writeTable(user);
						}
					}
				});
			}else if (firstname != '' && lastname != '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.lastname == lastname) {
						if (user.email == email) {
							if (user.sex == 'female') {
								writeTable(user);
							}
						}
					}
				});
			}
		}
	}if (tel != '') {
		if (gender=='') {
			if (firstname != '' && lastname == '' && email == '' ) {  
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.tel == tel) {
						writeTable(user);
					}
				});
			}else if (firstname == '' && lastname != '' && email == '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('lastname')
				.equalTo(lastname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.tel == tel) {
						writeTable(user);
					}
				});
			}else if (firstname == '' && lastname == '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('email')
				.equalTo(email)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.tel == tel) {
						writeTable(user);
					}
				});
			}else if (firstname != '' && lastname != '' && email == '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.lastname == lastname) {
						if (user.tel == tel) {
							writeTable(user);
						}
					}
				});
			}else if (firstname != '' && lastname == '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.email == email) {
						if (user.tel == tel) {
							writeTable(user);
						}
					}
				});
			}else if (firstname == '' && lastname != '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('lastname')
				.equalTo(lastname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.email == email) {
						if (user.tel == tel) {
							writeTable(user);
						}
					}
				});
			}else if (firstname != '' && lastname != '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.lastname == lastname) {
						if (user.email == email) {
							if (user.tel == tel) {
								writeTable(user);
							}
						}
					}
				});
			}
		}else if (gender == 'male') {
			if (firstname != '' && lastname == '' && email == '') {  
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.sex == 'male') {
						if (user.tel == tel) {
							writeTable(user);
						}
					}
				});
			}else if (firstname == '' && lastname != '' && email == '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('lastname')
				.equalTo(lastname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.sex == 'male') {
						if (user.tel == tel) {
							writeTable(user);
						}
					}
				});
			}else if (firstname == '' && lastname == '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('email')
				.equalTo(email)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.sex == 'male') {
						if (user.tel == tel) {
							writeTable(user);
						}
					}
				});
			}else if (firstname != '' && lastname != '' && email == '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.lastname == lastname) {
						if (user.sex == 'male') {
							if (user.tel == tel) {
								writeTable(user);
							}
						}
					}
				});
			}else if (firstname != '' && lastname == '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.email == email) {
						if (user.sex == 'male') {
							if (user.tel == tel) {
								writeTable(user);
							}
						}
					}
				});
			}else if (firstname == '' && lastname != '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('lastname')
				.equalTo(lastname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.email == email) {
						if (user.sex == 'male') {
							if (user.tel == tel) {
								writeTable(user);
							}
						}
					}
				});
			}else if (firstname != '' && lastname != '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.lastname == lastname) {
						if (user.email == email) {
							if (user.sex == 'male') {
								if (user.tel == tel) {
									writeTable(user);
								}
							}
						}
					}
				});
			}
		}else if (gender == 'female') {
			if (firstname != '' && lastname == '' && email == '') {  
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.sex == 'female') {
						if (user.tel == tel) {
							writeTable(user);
						}
					}
				});
			}else if (firstname == '' && lastname != '' && email == '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('lastname')
				.equalTo(lastname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.sex == 'female') {
						if (user.tel == tel) {
							writeTable(user);
						}
					}
				});
			}else if (firstname == '' && lastname == '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('email')
				.equalTo(email)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.sex == 'female') {
						if (user.tel == tel) {
							writeTable(user);
						}
					}
				});
			}else if (firstname != '' && lastname != '' && email == '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.lastname == lastname) {
						if (user.sex == 'female') {
							if (user.tel == tel) {
								writeTable(user);
							}
						}
					}
				});
			}else if (firstname != '' && lastname == '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.email == email) {
						if (user.sex == 'female') {
							if (user.tel == tel) {
								writeTable(user);
							}
						}
					}
				});
			}else if (firstname == '' && lastname != '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('lastname')
				.equalTo(lastname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.email == email) {
						if (user.sex == 'female') {
							if (user.tel == tel) {
								writeTable(user);
							}
						}
					}
				});
			}else if (firstname != '' && lastname != '' && email != '') {
				var ref = firebase.database().ref('User');
				ref
				.orderByChild('firstname')
				.equalTo(firstname)
				.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					if (user.lastname == lastname) {
						if (user.email == email) {
							if (user.sex == 'female') {
								if (user.tel == tel) {
									writeTable(user);
								}
							}
						}
					}
				});
			}
		}
	}




	if(gender == 'male' && firstname == '' && lastname == '' && email == '' && tel == ''){
		var ref = firebase.database().ref('User');
		ref
		.orderByChild('sex')
		.equalTo('male')
		.on('child_added', function(snapshot) { 
			var user = snapshot.val();
			writeTable(user);

		});
	}else if(gender == 'female' && firstname == '' && lastname == '' && email == '' && tel == ''){
		var ref = firebase.database().ref('User');
		ref
		.orderByChild('sex')
		.equalTo('female')
		.on('child_added', function(snapshot) { 
			var user = snapshot.val();
			writeTable(user);

		});
	}


	
	if (gender == '' && firstname == '' && lastname == '' && email == '' && tel != '') {
		var ref = firebase.database().ref('User');
		ref
		.orderByChild('tel')
		.equalTo(tel)
		.on('child_added', function(snapshot) { 
			var user = snapshot.val();
			writeTable(user);

		});
	}




	if (gender == "male" && tel != "" && firstname == '' && lastname == '' && email == '') {
		console.log('test');
		var ref = firebase.database().ref('User');
		ref
		.orderByChild('tel')
		.equalTo(tel)
		.on('child_added', function(snapshot) { 
			var user = snapshot.val();
			if (user.sex == 'male') {
				writeTable(user);
			}
		});
	}else if (gender == "female" && tel != "" && firstname == '' && lastname == '' && email == '') {
		console.log('test');
		var ref = firebase.database().ref('User');
		ref
		.orderByChild('tel')
		.equalTo(tel)
		.on('child_added', function(snapshot) { 
			var user = snapshot.val();
			if (user.sex == 'female') {
				writeTable(user);
			}
		});
	}








	function writeTable(user){

		count += 1;

		var table = document.getElementById("myTable");
		var row = table.insertRow(0);

		var cell_firstname = row.insertCell(0);
		cell_firstname.innerHTML = '<a href="staff_showdata.html?email='+user.email+'" >'+user.firstname +"  "+ user.lastname+'</a>';

		var cell_email = row.insertCell(1);
		cell_email.innerHTML = user.email;

		var cell_gender = row.insertCell(2);
		cell_gender.innerHTML = user.sex;

		var cell_birth = row.insertCell(3);
		cell_birth.innerHTML = user.birth;

		document.getElementById("text_count").innerHTML = "Your Result : " + count + " people.";
	}

}


function last(){
	var table = document.getElementById("myTable");
	var header = table.createTHead();
	var row = header.insertRow(0);
	var cell = row.insertCell(0);
	cell.innerHTML = "<center><b>Name</b></center>";
	var cell = row.insertCell(1);
	cell.innerHTML = "<center><b>Email</b></center>";
	var cell = row.insertCell(2);
	cell.innerHTML = "<center><b>Gender</b></center>";
	var cell = row.insertCell(3);
	cell.innerHTML = "<center><b>Birth</b></center>";
	

}










