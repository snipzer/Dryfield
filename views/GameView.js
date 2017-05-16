function GameView()
{
    EventEmitter.call(this);
    this.init();
}

GameView.prototype = Object.create(EventEmitter.prototype);
GameView.prototype.constructor = GameView;

GameView.prototype.init = function ()
{
    document.querySelector("#field1-irriguer").onsubmit = (function (e)
    {
        e.preventDefault();

        this.emit("change-username", {
            username: document.getElementById('username').value
        });
    }).bind(this);

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