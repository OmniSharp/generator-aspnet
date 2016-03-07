$(function () {
    // create sidebar and attach to menu open
    $('.ui.sidebar')
        .sidebar('attach events', '.toc.item');

    //Hack to make MVC ValidationSummary tag helper play nicely with Semantic UI
    $('.ui.error ul').addClass('list');

    if ($('.ui.error ul li:first').css('display') === 'none') {
        $('.ui.error').hide();
    } else {
        $('.ui.error').show();
    }

    $('.ui.checkbox').checkbox();
});