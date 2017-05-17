function GameView(fields, user)
{
    EventEmitter.call(this);
    this.fields = fields;
    this.user = user;
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

    this.fields.forEach(function (field)
    {
        field.on("update-water", function (data)
        {
            document.querySelector('#'+data.id+"-water_level").innerText = data.waterLevel;
        });

        field.on("update-maturation", function (data)
        {
            document.querySelector("#"+data.id+"-maturation").innerText = data.maturation;
        });
    });

    this.user.on("update-score", function (data)
    {
        document.querySelector('#recolte').innerText = data.score;
    });

    this.user.on("update-global-water", function (data)
    {
        document.querySelector("#water").innerText = data.waterLevel;
    });

    this.user.on("update-money", function (data)
    {
        document.querySelector('#money').innerText = data.money;
    });
};