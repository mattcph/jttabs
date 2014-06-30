// Hacked in VIM by Matt Hardy <matt@webhaven.eu> Copyright 2014
// Personal or Commercial Use is at own risk
// Warranty or support is not included
(function($) {
  $.jttabs = function(el, options) {

    var base = this;

    base.Sel = $(el);
    
    $.jttabs.defaultOptions = {
        "selector": ".jttabs",
        "tabcontent":".jt-tabcontent-wrapper",
        "speed": 100,
        "Before": null, 
        "After": null,
        "defaultTab": "",
        "hashAlways": false
    };

    base.options = $.extend({},$.jttabs.defaultOptions, options);

    base.stabs = base.Sel.find(base.options.selector+" li");

    base.init = function() {
        
        var jttab = options.defaultTab.length?options.defaultTab:"";

        var khash = window.location.hash,
                    deftab = $(base.stabs[0]).data('content'),
        s=0;

        if(khash.length) {
            for(var i=0; i<base.stabs.length; i++) {
                if(khash.substr(1)==$(base.stabs[i]).data('content')) {
                    jttab = $(base.stabs[i]).data('content');
                    s++;
                    break;
                }
            }
        }

        if(jttab.length===0) {
            jttab = deftab;
        }
        $("#"+jttab).removeClass('jt-tabhide');
        base.loadtab(jttab);
        base.blocker(base.stabs);
        base.tabs(jttab);
    };

    base.tabs = function(el) {

        var curCont = base.Sel.find("li.active").data('content');

        base.stabs.removeClass("active").unbind().one('click', 
            function(){
                var c = $(this).data('content');
                window.location.hash=c;
                base.tabs(c);
            });

        base.Sel.find("[data-content='" + el + "']").addClass("active").unbind();

        base.loadtab(el,curCont);
    };

    base.blocker = function(el){
        for(var i=0; i<el.length; i++) {
            li =  $(el[i]);
            txt = $.trim($(li).text());
            li.html("<div class='noselect'></div><div class='text'>"+txt+"</div>");
            li.find(".noselect").css({
                height: li.outerHeight(),
                width: li.outerWidth()
            });
        }
    };

    base.loadtab = function(el,c) {

        for(var i=0; i<base.stabs.length; i++) {
            var cid = $(base.stabs[i]).data('content');
            document.getElementById(cid).style.display='none';
            $('#'+cid).stop(true,true);
        }

        var $el = $('#'+el);
        if($el.data('src')!=undefined &&
           $el.data('loaded').val!=1) {
            $el.data('loaded',{val: 1});
            if ( $.isFunction( options.Before ) ) {
                options.Before(el,$el.data('src'));
            }
            $el.fadeIn(base.options.speed,
                function(){
                    if ( $.isFunction( options.After) ) {
                        options.After.call( this );
                    }
            });
        } else {
            $el.fadeIn(base.options.speed,
                function(){
                    if ( $.isFunction( options.After) ) {
                        options.After.call( this );
                    }
            });
        }
    };

    this.init();

    };

    $.fn.jttabs = function(options) {
        return this.each(function() {
            (new $.jttabs(this, options));
        });
    };


})(jQuery);

