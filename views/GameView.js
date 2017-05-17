function GameView()
{
    EventEmitter.call(this);
    this.init();
}

GameView.prototype = Object.create(EventEmitter.prototype);
GameView.prototype.constructor = GameView;

GameView.prototype.init = function ()
{
    var irrigateButton = document.querySelectorAll(".irriger");
    var harvestButton = document.querySelectorAll(".recolter");

    irrigateButton.forEach((function (button)
    {
        button.onclick = (function (e)
        {
            e.preventDefault();

            this.emit("irrigate", {
                field: irrigateButton.id
            });
        }).bind(this);
    }).bind(this));

    harvestButton.forEach((function (button)
    {
        button.onclick = (function (e)
        {
            e.preventDefault();

            this.emit("harvest", { field: harvestButton.id });
        }).bind(this);
    }).bind(this));

    this.on("update-score", function (data)
    {
        document.querySelector('#recolte').innerText = data.score;
    });

    this.on("update-global-water", function (data)
    {
        document.querySelector("#water").innerText = data.waterLevel;
    });

    this.on("update-money", function (data)
    {
        document.querySelector('#money').innerText = data.money;
    });

    this.on("update-water", function (data)
    {
        document.querySelector('#'+data.id+"water_level").innerText = data.score;
    });

    this.on("update-maturation", function (data)
    {
        document.querySelector("#"+data.id+"maturation").innerText = data.maturation;
    });
};