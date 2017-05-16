function Field(id){
    EventEmitter.call(this);
    this.id = id;
    this.consomation = 1.0;
    this.waterLevel = 3;
    this.maturation = 0;
    this.harvestabled = false;
}

Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;

Field.prototype.setWaterLevel = function (number)
{
    if(number < 0 || this.harvestabled)
        return;
    this.waterLevel = number;

    this.emit("update-water", {waterLevel: this.waterLevel});
};

Field.prototype.setConsomation = function (number)
{
    if((number >= 3 && number <= 1) || this.harvestabled)
        return;
    this.consomation = number;
};

Field.prototype.setMaturation = function (number)
{
    if(this.harvestabled)
        return;

    this.maturation = number;

    this.emit("update-maturation", {maturation: this.maturation});
};

Field.prototype.setHarvestabled = function (bool)
{
    this.harvestabled = bool;
};