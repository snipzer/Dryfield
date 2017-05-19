window.onload = function() {
    var fields = [new Field('field0'), new Field('field1'), new Field('field2')];
    var user = new User();
    var gameView = new GameView(fields, user);

    var gameController = new GameController(fields, user, gameView);

    user.build();
    fields.forEach(function (field) { field.build() });
};
