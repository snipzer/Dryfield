function GameController(field0, field1, field2, user, view) {
    this.fields = [field0, field1, field2];
    this.user = user;
    this.view = view;

    this.init();
}

GameController.prototype.init = function () {
    this.view.on('irrigate', (function (data) {
    	var indexField = data.field.match(/\d/)[0];
        this.fields[indexField].setWaterLevel(this.fields[indexField].waterLevel + 1);
        this.user.setWaterLevel(this.user.waterLevel - 1);
    }).bind(this));

    this.view.on('harvest', (function (data) {
    	console.log('harvest');

    	var indexField = data.field.match(/\d/)[0];
        // si harvestabled true alors
        if (harvestabled) {
            // +1 en récolte (user)
            this.user.setScore(this.user.score + 1);
            // user gagne 40$
            this.user.setMoney(this.user.money + 40);
            // set à 0 le setMaturation
            this.fields[indexField].setMaturation(0);
            // set à false harvestabled
            this.fields[indexField].setHarvestabled(false);
        }
    }).bind(this));

    this.view.on('buy', (function (quantity) {
    	console.log('buy');

        // check si user à plus d'argent que la quantité qu'il demande
        if (this.user.money >= quantity) {
            // user.setMoney argent actuel - quantity
            this.user.setMoney(this.user.money - quantity);
            // user.setWaterlevel qté actuel + qty
            this.user.setWaterLevel(this.user.waterLevel + quantity)
        }
    }).bind(this));
};

GameController.prototype.update = function () {
    this.view.on('start', setInterval(function () {
        	this.fields.forEach(function(field) {
        		if(field.waterLevel > 0){
        			// toute les secondes les fields perdent -1L
                    field.setWaterLevel(field.waterLevel - 1);
                    // toute les secondes maturation de +5%
                    field.setMaturation(field.maturation +5);
                }
        	})
        }, 1000).bind(this)).bind(this);


};

