function SoundEmitter() {
    EventEmitter.call(this);
    this.sounds = {}
}

SoundEmitter.prototype = Object.create(EventEmitter.prototype);
SoundEmitter.prototype.constructor = SoundEmitter;

SoundEmitter.prototype.addSound = function(eventName, sound)
{

    // On ajoute l'événement à l'objet
    this.sounds[eventName] = this.sounds[eventName] || [];

    // On lie la fonction au déclenchement de l'événement
    this.events[eventName].push(sound)
};


SoundEmitter.prototype.removeSound = function(eventName, sound)
{
    // On vérifie l'existence de l'événement
    if (!this.sounds[eventName]) return;

    // On boucle sur les fonctions liées à cet événement
    for (var i = 0; i < this.sounds[eventName].length; i++)
    {
        // Si on trouve la fonction demandée, on la supprime.
        // Elle ne sera plus executée lorsque l'objet émettra l'événement
        if (this.sounds[eventName][i] === sound)
        {
            this.sounds[eventName].splice(i, 1);
            break
        }
    }
};


SoundEmitter.prototype.emit = function(eventName, data)
{
    if (!this.events[eventName] && !this.sounds[eventName]) return;

    this.events[eventName].forEach(function(fn)
    {
        fn(data)


    });

};
