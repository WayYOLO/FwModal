//bootstrap-modal.js And draggabilly.js Integration solution
 $(function(){
    var $draggable = $('.modal-dialog').draggabilly({
           handle: '.modal-header'
        });
    $draggable.on( 'dragMove', function( event, pointer, moveVector ) {
    if ($(this).offset().top===0||$(this).offset().top<0) {
        $(this).offset({top:0})
    }
    })
    $draggable.on( 'dragEnd', function( event, pointer ) { 
      if ($(this).offset().top===0||$(this).offset().top<0) {
        $(this).offset({top:0})
    }
   })
    $('.modal-header').css('cursor', 'move').hover(function() {
      $(this).parent().parent().parent().removeClass('fade');
    }, function() {
      $(this).parent().parent().parent().addClass('fade');
    });
   $("[data-dismiss='modal']").click(function(){
      $(this).parents('.modal').addClass('fade');
   });  
  })