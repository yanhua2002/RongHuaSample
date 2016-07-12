// JavaScript Document
$(document).ready(function () {
    $.fn.scrollPic = function (setting) {
        setting = $.extend(
            {
                events: "mouseover",
                time: 5000
            }, setting);
        if (this < 1) { return false; }
        var obj = this.find("ul:first");
        var obj_li = obj.find("li");
        var size = obj.find("li").size();
        var li, btns, ind;

        if (size > 1 && size < 6) {
            btns = $(".btns");
            if (btns.find('li') || btns)
            {
                for (var i = 1; i <= size; i++)
                {
                    li = "<li class='btn_" + i + "'></li>";
                    btns.append(li);
                }
            }
            btns.find("li:first").addClass("select").siblings("li").removeClass("select");
            btns.find("li").bind(setting.events, function () {
                clearInterval(slide_run);
                ind = btns.find("li").index(this);
                $(this).addClass("select").siblings("li").removeClass("select");
                obj_li.eq(ind).stop(true).fadeIn().siblings().fadeOut();
            });

            obj_li.bind("mouseover", function () {
                clearInterval(slide_run);
            });
            btns.find("li").bind("mouseover", function () {
                scrollAuto();
            });
            obj_li.bind("mouseout", function () {
                scrollAuto();
            });
            var scrollAuto = function () {
                slide_run = setInterval(function () {
                    var slide_now = btns.find("li").index(btns.find("li").filter(".select"));
                    startScroll(slide_now, slide_now + 1);
                }, setting.time);
            };
            var startScroll = function (now, num) {
                if (num >= size) { num = 0; }
                btns.find("li").eq(num).addClass("select").siblings("li").removeClass("select");
                obj_li.eq(num).stop(true).fadeIn().siblings().fadeOut();
            };

            scrollAuto();
        }
    };

    $(".focus").scrollPic();
    $(".focus_lists li:first").show().siblings().hide();

});