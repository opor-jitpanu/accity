function submitTicket() {
	var normal_ticket = document.getElementById('normal_ticket').value;
	var year_ticket = document.getElementById('year_ticket').value;
	console.log(normal_ticket);
	console.log(year_ticket);

	window.location.href = 'submit_buy_ticket.html?t1='+normal_ticket+'&t2='+year_ticket+'&sum='+(parseInt(year_ticket * 999)+parseInt(normal_ticket*350));
}