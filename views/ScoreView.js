function ScoreView()
{
    EventEmitter.call(this);
}

ScoreView.prototype = Object.create(EventEmitter.prototype);
ScoreView.prototype.constructor = ScoreView;
