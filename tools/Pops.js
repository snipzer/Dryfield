 jQuery(function($) {

     //Lorsque vous cliquez sur un lien de la classe poplight
     $('a.poplight').on('click', function() {
         var popID = $(this).data('rel'); //Trouver la pop-up correspondante
         var popWidth = $(this).data('width'); //Trouver la largeur

         //Faire apparaitre la pop-up et ajouter le bouton de fermeture
         $('#' + popID).fadeIn().css({
             'width': popWidth
         }).prepend('<a href="#" class="close"><i class="fa fa-times-circle-o" aria-hidden="true"></i></a>');

         //Récupération du margin, qui permettra de centrer la fenêtre - on ajuste de 80px en conformité avec le CSS
         var popMargTop = ($('#' + popID).height() + 80) / 2;
         var popMargLeft = ($('#' + popID).width() + 80) / 2;

         //Apply Margin to Popup
         $('#' + popID).css({
             'margin-top': -popMargTop,
             'margin-left': -popMargLeft
         });

         //Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues d'anciennes versions de IE
         $('body').append('<div id="fade"></div>');
         $('#fade').css({
             'filter': 'alpha(opacity=80)'
         }).fadeIn();

         return false;
     });


     //Close Popups and Fade Layer
     $('body').on('click', 'a.close, #fade', function() { //Au clic sur le body...
         $('#fade , .popup_block').fadeOut(function() {
             $('#fade, a.close').remove();
         }); //...ils disparaissent ensemble

         return false;
     });

 });

 $(function() {
     $('header a').on('click', function(e) {
         e.preventDefault();
         var hash = this.hash;
         $('html, body').animate({
             scrollTop: $(this.hash).offset().top
         }, 1000, function() {
             window.location.hash = hash;
         });
     });
 });

 function timer(n) {
     $(".progress-bar").css("width", n + "%");
     $("#pourcentage").text(n + "%");
     if (n < 100) {
         setTimeout(function() {
             timer(n + 10);
         }, 200);
     }
 }
 $(function() {
     $("#animer").click(function() {
         timer(0);
     });
 });