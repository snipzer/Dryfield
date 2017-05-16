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

    this.emit("update-water", {id: this.id, waterLevel: this.waterLevel});
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

    this.emit("update-maturation", {id: this.id, maturation: this.maturation});
};

Field.prototype.setHarvestabled = function (bool)
{
    this.harvestabled = bool;
};

Field.prototype.genHTML = function ()
{
    var bigBox = document.querySelector("#fields");
    var smallBox = document.createElement("div");
    var irrigateButton = document.createElement("button");
    var waterLevel = document.createElement("p");
    var maturation = document.createElement("p");
    var harvestButton  =document.createElement("button");

    irrigateButton.id = this.id+"irriguer";
    waterLevel.id = this.id+"water_level";
    maturation.id = this.id+"maturation";
    harvestButton.id = this.id+"recolter";

    smallBox.appendChild(irrigateButton);
    smallBox.appendChild(waterLevel);
    smallBox.appendChild(maturation);
    smallBox.appendChild(harvestButton);

    bigBox.appendChild(smallBox);

};