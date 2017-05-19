function ScoreView()
{
    SoundEmitter.call(this);
}

ScoreView.prototype = Object.create(SoundEmitter.prototype);
ScoreView.prototype.constructor = ScoreView;
