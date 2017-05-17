function Field(id){
    EventEmitter.call(this);
    this.id = id;
    this.consomation = 1.0;
    this.harvestabled = false;
    this.genHTML();
}

Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;

Field.prototype.build = function ()
{
    this.setWaterLevel(3);
    this.setMaturation(0);
};

Field.prototype.setWaterLevel = function (number)
{
    if(number < 0 || this.harvestabled)
        return;
    this.waterLevel = number;

    this.emit("update-water", {id: this.id, waterLevel: this.waterLevel});
};

Field.prototype.setConsomation = function (number)
{
    if((number > 2 && number <= 1) || this.harvestabled)
        return;
    this.consomation = number;
};

Field.prototype.setMaturation = function (number)
{
    if(this.harvestabled)
        return;

    this.maturation = number;

    if(this.maturation === 100)
        this.harvestabled = true;

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
    var harvestButton = document.createElement("button");

    bigBox.id = "fields";
    bigBox.className = "container-fluid";

    smallBox.id = this.id;


    irrigateButton.id = this.id+"-irriguer";
    irrigateButton.className = "irriguer";
    irrigateButton.innerText = "irriguer";
    waterLevel.id = this.id+"-water_level";
    waterLevel.innerText = "OL";
    maturation.id = this.id+"-maturation";
    maturation.innerText = 0;
    harvestButton.id = this.id+"-recolter";
    harvestButton.className = "recolter";
    harvestButton.innerText = "recolter";

    smallBox.appendChild(irrigateButton);
    smallBox.appendChild(waterLevel);
    smallBox.appendChild(maturation);
    smallBox.appendChild(harvestButton);

    bigBox.appendChild(smallBox);

};