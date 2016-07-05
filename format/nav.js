// JavaScript Document
$(document).ready(function(){
    /* 主导航 */
    $(".nav_bar .nav > ul >li").mouseenter(function(){
        $(this).addClass("cur");
    });
    $(".nav_bar .nav > ul > li").mouseleave(function(){
        $(this).removeClass("cur");
    });
});