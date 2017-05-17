function GameController(fields, user, view)
{
    this.fields = fields;
    this.user = user;
    this.view = view;
    this.start = this.startGame.bind(this);

    this.init();
}

GameController.prototype.init = function ()
{
    this.view.on('irrigate', (function (data)
    {
        var indexField = data.field.match(/\d/)[0];

        if(this.user.waterLevel > 0)
            this.fields[indexField].setWaterLevel(this.fields[indexField].waterLevel + 1);


        if(!this.fields[indexField].harvestabled)
            this.user.setWaterLevel(this.user.waterLevel - 1);

    }).bind(this));

    this.view.on('harvest', (function (data)
    {
        console.log('harvest');

        var indexField = data.field.match(/\d/)[0];
        // si harvestabled true alors
        if (this.fields[indexField].harvestabled)
        {
            // +1 en récolte (user)
            this.user.setScore(this.user.score + 1);
            // user gagne 40$
            this.user.setMoney(this.user.money + 40);
            // set à false harvestabled
            this.fields[indexField].setHarvestabled(false);
            // set à 0 le setMaturation
            this.fields[indexField].setMaturation(0);

            this.fields[indexField].setConsomation(this.fields[indexField].consomation + 0.1);
        }
    }).bind(this));

    this.view.on('buy', (function (data)
    {
        // check si user à plus d'argent que la quantité qu'il demande
        if (this.user.money >= data.quantity)
        {
            // user.setMoney argent actuel - quantity
            this.user.setMoney(this.user.money - data.quantity);
            // user.setWaterlevel qté actuel + qty
            this.user.setWaterLevel(this.user.waterLevel + parseInt(data.quantity))
        }
        else
        {
            alert("Achat impossible ! Vous n'avez pas assez d'argents");
        }
    }).bind(this));

    this.view.on("stop", this.pauseGame.bind(this));
};

GameController.prototype.update = function ()
{
    this.view.on('start', this.start);
};

GameController.prototype.startGame = function() {
	this.interval = setInterval((function ()
    {
        this.fields.forEach(function (field)
        {
            if (field.waterLevel > 0)
            {
                // toute les secondes les fields perdent -1L
                field.setWaterLevel(field.waterLevel - field.consomation);
                // toute les secondes maturation de +5%
                field.setMaturation(field.maturation + 5);
            }
        }, this);

        if(this.fields[0].waterLevel === 0 && this.fields[1].waterLevel === 0 && this.fields[2].waterLevel === 0)
        {
            alert("Game over");
            this.pauseGame();
            this.view.off("start", this.start)
        }

    }).bind(this), 1000);
};

GameController.prototype.pauseGame = function() {
	if (!this.interval) return;

	clearInterval(this.interval);
};

