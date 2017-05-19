function ScoreController(view)
{
    this.view = view;
    this.bindEvents();
}

ScoreController.prototype.bindEvents = function() {
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
            var str = '<p class="error">Erreur lors du chargement des scores</p>';
            $("#score-container").html(str);
        }
    });
};
