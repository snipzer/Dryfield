window.onload = function() {
    var fields = [new Field('field0'), new Field('field1'), new Field('field2')]
    var user = new User();
    var gameView = new GameView(fields, user);

    var gameController = new GameController(fields, user, gameView);

    user.build();
    fields.forEach(function (field)
    {
        field.build();
    });

    gameController.update();

    $.ajax({
        url: 'http://10.1.108.8:3000/scores',
        type: 'GET',
        dataType: 'json',
        success: function(json, status)
        {
            var str = '<h3>Scores :</h3><table border="2" cellpadding=5px" cellspacing="5px" id="scoretab"><th>Pseudo</th><th>Score</th>';

            for(var i = 0; i < json.list.length; i++)
            {
                str+="<tr><td>"+json.list[i].name+"</td><td>"+json.list[i].score+"</td></tr>";
            }

            str += "</table>";

            $("#score-container").html(str);
        },
        error: function(result, status, error)
        {
            var str = '<p style="color:red; font-weight: bold">Erreur lors du chargement des scores</p>';
            $("#score-container").html(str);
        }
    });
};
