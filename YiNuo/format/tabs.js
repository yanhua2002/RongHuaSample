jQuery(document).ready(function () {
    jQuery('.menu_bar .menulist a').on('click',function (e) {
        var currentObj=jQuery(this);
        var currentAttrValue=currentObj.attr('href');

        // Show/Hide Tabs
        jQuery('.main_wrap '+currentAttrValue).show().siblings().hide();

        // Change/remove current tab to active
        // jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
        currentObj.parent('li').siblings().children('a').removeClass('cur');
        currentObj.addClass('cur');

        e.preventDefault();
    });

    if (location.href.indexOf("#")>-1) {
        var url=location.href;
	    var paraString=url.substring(url.indexOf("#"),url.length);
        // jQuery('a[href=paraString]').click();
        var aE=jQuery('a[href=paraString]');
        aE.click();
    }
    
});