

$(function() {

  $('.next').click('.first', function() {
    if ($('#title').val().length === 0) {
      alert("Enter a title");
      return;
    }
    if ($('#organizer').val().length === 0) {
      alert("Enter an organizer");
      return;
    }
    if ($('#email').val().length === 0) {
      alert("Enter an email");
      return;
    }

    var $active = $('.container .steps-list .active');
    $active.next().removeClass('disabled');
    nextTab($active);
  });
});
