function GameView()
{
    EventEmitter.call(this);
    this.init();
}

GameView.prototype = Object.create(EventEmitter.prototype);
GameView.prototype.constructor = GameView;

GameView.prototype.init = function ()
{
    var irrigateButtons = document.querySelectorAll(".irriguer");
    var harvestButtons = document.querySelectorAll(".recolter");
    var startButton = document.querySelector("#start");

    startButton.onclick = (function ()
    {
        this.emit("start");
    }).bind(this);

    irrigateButtons.forEach((function (button)
    {
        button.onclick = (function (e)
        {
            e.preventDefault();

            this.emit("irrigate", {
                field: button.id
            });
        }).bind(this);
    }).bind(this));

    harvestButtons.forEach((function (button)
    {
        button.onclick = (function (e)
        {
            e.preventDefault();

            this.emit("harvest", { field: button.id });
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
        document.querySelector('#'+data.id+"water_level").innerText = data.waterLevel;
    });

    this.on("update-maturation", function (data)
    {
        document.querySelector("#"+data.id+"maturation").innerText = data.maturation;
    });
};