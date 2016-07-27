// JavaScript Document
$(document).ready(function(){
    /* 主导航 */
    $(".nav_bar .nav > ul >li").mouseenter(function(){
        $(this).addClass("cur");
    });
    $(".nav_bar .nav > ul > li").mouseleave(function(){
        $(this).removeClass("cur");
    });

    /* 页内导航 */
    jQuery('.subnav_box a').on('click',function (e){
        var curObj=jQuery(this);
        var curAttrValue=curObj.attr('href');
        if(curAttrValue.indexOf("#")>-1){
            var selTag=curAttrValue.substring(curAttrValue.indexOf("#"),curAttrValue.length);
            jQuery("a[href='"+selTag+"']").click();
        }
    });
});