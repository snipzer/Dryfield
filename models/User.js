function User(){
    EventEmitter.call(this);
}

User.prototype = Object.create(EventEmitter.prototype);
User.prototype.constructor = User;

User.prototype.setScore = function (number)
{
    this.score = number;
    this.emit("update-score", {score: this.score});
};

User.prototype.setWaterLevel = function (number)
{
    if(number < 0)
        return;
    this.waterLevel = number;

    this.emit("update-global-water", {waterLevel: this.waterLevel});
};

User.prototype.setMoney = function (number)
{
    this.money = number;
    this.emit("update-money", {money: this.money});
};

User.prototype.build = function ()
{
    this.setWaterLevel(3);
    this.setScore(0);
    this.setMoney(50);
};