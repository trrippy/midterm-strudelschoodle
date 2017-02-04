

$(function() {

    var $active = $('.container .steps-list .active');
    $active.next().removeClass('disabled');
    nextTab($active);

});
