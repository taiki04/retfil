$(function() {
    var state = false;
    var scrollpos;

    $('#js-drawer--button').click(function() {
        $(this).toggleClass('is-open');
        $('.drawer-list').toggleClass('is-open');

        if(state == false) {
            scrollpos = $(window).scrollTop();
            $('body').addClass('is-fixed').css({'top': -scrollpos});
            state = true;
        } else {
            $('body').removeClass('is-fixed').css({'top': 0});
            $(window).scrollTop(0 , scrollpos);
            state = false;
        }
    });

    $('a[href^="#"]').click(function() {
        let header = $(".header").innerHeight();
        let speed = 400;
        let href = $(this).attr('href');
        let target = $('#' == href ? 'html' : href);
        let position = target.offset().top - header;
        $('html, body').animate(
            {
                scrollTop: position
            },
            speed
        );
        return false;
    }); 
});