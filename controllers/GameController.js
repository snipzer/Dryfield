function GameController() {
	this.field = field;
	this.user = user;
	this.view = view;

	this.init();
}

GameController.prototype.init = function() {
	this.view.on('irrigate', (function() {
		this.field.setWaterLevel(this.field.waterLevel +1);
		this.user.setWaterLevel(this.user.waterLevel -1);
	}).bind(this));

	this.view.on('harvest', (function() {
		// si harvestabled true alors 
		if(harvestabled) {
		// +1 en récolte (user)
		this.user.setScore(this.user.score +1);
		// user gagne 40$
		this.user.setMoney(this.user.money +40);
		// set à 0 le setMaturation
		this.field.setMaturation(0);
		// set à false harvestabled
		this.field.setHaverstabled(false);
		}
	}).bind(this));

	this.view.on('buy', (function(quantity) {
		// check si user à plus d'argent que la quantité qu'il demande
		if(this.user.money >= quantity) {
		// user.setMoney argent actuel - quantity
		this.user.setMoney(this.user.money - quantity);
		// user.setWaterlevel qté actuel + qty
		this.user.setWaterLevel(this.user.waterLevel + quantity)
		}
	}).bind(this));
}

GameController.prototype.update = function() {
	setInterval(function(){

	}, 1000)
	// toute les secondes les fields perdent -1L

	// toute les secondes maturation de +5%

}