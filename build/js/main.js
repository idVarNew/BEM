( function( $, window, document ) {

    var $window = $( window ),
        timer;

    $( function() {
        activateSliders();
        activateLightBox()
        toggleButton();
        addSmoothScrolling();
        highlightActiveMenuLink();
        removeOutline();


    } );

    //---------------------------------------------------------
    //  Sliders
    //---------------------------------------------------------

    var activateSliders = function() {
        // Main slider
        var $mainSlider = $( ".c-slider" ),
            $reviewsSlider = $( ".c-reviews__slider" );

        $mainSlider.slick( {
            dots: true,
            arrows: false,
            centerMode: true,
            centerPadding: "0px",
            speed: 1500,
            //    autoplay: true
        } );

        // Review slider
        $reviewsSlider.slick( {
            dots: true,
            arrows: false,
            vertical: true,
            autoplay: false
        } );
    }
    //---------------------------------------------------------
    // Activate LightBox
    //---------------------------------------------------------

    var activateLightBox = function() {
        var lightbox = $( ".c-gallery__link" ).simpleLightbox();
    }

    //---------------------------------------------------------
    //  Navigation Button
    //---------------------------------------------------------
    var toggleButton = function() {
        var $navButton = $( "#navbar-button" ),
            $navLine = $( ".c-nav__line" ),
            $navbarList = $( "#navbar-list" );

        $navButton.on( "click", onClick );

        function onClick() {
            $navLine.toggleClass( "is-open" );
            $navbarList.slideToggle( "fast" );
        }
    }

    //---------------------------------------------------------
    // Smooth Scrolling
    //---------------------------------------------------------
    var addSmoothScrolling = function() {
        var $navLink = $( ".c-nav__link" ),
            $body = $( "html, body" ),
            $header = $( ".l-main-header" );

        $navLink.on( "click", onClick )

        function onClick( e ) {
            e.preventDefault();
            var $this = $( this ),
                href = $this.attr( "href" );

            if ( $window.innerWidth() > 950 ) {
                var menuHeight = $header.outerHeight();
            } else {
                var menuHeight = 0;
            }

            function changeHash() {
                location.hash = href;
            }
            $body.animate( {
                scrollTop: $( href ).offset().top + "px"
            }, 1200, changeHash );

            $body.animate( {
                scrollTop: $( href ).offset().top - menuHeight + "px"
            }, 1400 );


        }
    }
    //---------------------------------------------------------
    // Highlight Active Menu Link
    //---------------------------------------------------------

    var highlightActiveMenuLink = function() {

        var menu = $( ".l-main-header" ),
            topMenuHeight = menu.outerHeight() + 40,
            menuLink = menu.find( ".c-nav__link" ),
            scrollItems = menuLink.map( getItem );

        function getItem() {
            var item = $( $( this ).attr( "href" ) );
            if ( item.length ) {
                return item;
            }
        }

        $window.scroll( onScroll )

        function onScroll() {
            var fromTop = $( this ).scrollTop() + topMenuHeight,
                currentElement = scrollItems.map( getElement );

            function getElement() {
                if ( $( this ).offset().top < fromTop ) {
                    return this;
                }
            }

            currentElement = currentElement[ currentElement.length - 1 ];
            var id = currentElement && currentElement.length ? currentElement[ 0 ].id : "";

            menuLink
                .removeClass( "c-nav__link_is-active" )
                .filter( "[href='#" + id + "']" )
                .addClass( "c-nav__link_is-active" );
        }
    }

    //---------------------------------------------------------
    // Remove Outline
    //---------------------------------------------------------
    var removeOutline = function() {
        var d = document,
            styleElement = d.createElement( "STYLE" ),
            domEvents = "addEventListener" in d,
            addEventListener = function( type, callback ) {
                if ( domEvents ) {
                    d.addEventListener( type, callback );
                } else {
                    d.attachEvent( "on" + type, callback );
                }
            },
            set_css = function( css_text ) {
                !!styleElement.styleSheet ? styleElement.styleSheet.cssText = css_text : styleElement.innerHTML = css_text;
            };

        d.getElementsByTagName( "HEAD" )[ 0 ].appendChild( styleElement );
        addEventListener( "mousedown", onMouseDown );
        addEventListener( "keydown", onKeyDown );

        function onMouseDown() {
            set_css( ":focus{outline:0}::-moz-focus-inner{border:0;}" );
        }

        function onKeyDown() {
            set_css( "" );
        }
    }
    //---------------------------------------------------------
    // Remove Hover
    //---------------------------------------------------------
    var removeHover = function() {
        var $hover = $( ".hover" );
        $hover.mouseleave( onMouseLeave );

        function onMouseLeave() {
            $( this ).removeClass( "hover" );
        }
    }

}( window.jQuery, window, document ) )
