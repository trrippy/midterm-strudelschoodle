$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

  $('.pag .back').css('display','none');
  $('.pag .next').on('click', function(event) {
    event.preventDefault();
    $('.pag .back').css('display','inline-block');
    const current = $('.create-form .form-block.show');
    current.next().removeClass('hide').addClass('show');
    current.addClass('hide').removeClass("show").fadeIn("slow");
  });

  $('.pag .back').on('click', function(event) {
    event.preventDefault();
    const current = $('.create-form .form-block.show');
    current.prev().removeClass('hide').addClass('show');
    current.addClass('hide').removeClass("show").fadeIn("slow");
  });

  flatpickr(".flatpickr", {
    inline: true,
    mode: "multiple",
    static: true
  });


});
