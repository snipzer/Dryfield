function ScoreView()
{
    EventEmitter.call(this);
    this.init();
}

ScoreView.prototype = Object.create(EventEmitter.prototype);
ScoreView.prototype.constructor = ScoreView;

ScoreView.prototype.init = function ()
{
    var showView = document.querySelector("#show-score");

    showView.onclick = (function ()
    {
        console.log("oncoming");
        this.emit("show-score");
    }).bind(this);
};