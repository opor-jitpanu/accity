function  submitOnClick() {

	var usersRef = firebase.database().ref('User');
	usersRef.orderByChild('firstname').equalTo('Jitpanu').on("value", function(snapshot) {
    snapshot.forEach(function(data) {
        console.log(data.key);
        console.log(data.val().tel);
    });
});

}