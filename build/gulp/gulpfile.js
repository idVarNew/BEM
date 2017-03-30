var gulp = require( "gulp" );

//PLUGINS
var autoprefixer = require( "gulp-autoprefixer" ),
    concat = require( "gulp-concat" ),
    rename = require( "gulp-rename" ),
    uglify = require( "gulp-uglify" ),
    concatCss = require( "gulp-concat-css" ),
    cssmin = require( "gulp-cssmin" );


// autoprefixer
gulp.task( "ap", ap );
// concat rename uglify
gulp.task( "cru", cru );
// all css
gulp.task( "css", css );
// watch all
gulp.task( "watch", watch );

function ap() {
    return gulp.src( "../css/styles.css" )
        .pipe( autoprefixer() )
        .pipe( gulp.dest( "../../assets/css" ) )
}

function cru() {
    var js1 = "../js/slick.js",
        js2 = "../js/main.js",
        js3 = "../js/lightbox.js",
        jsDest = "../../assets/js";

    return gulp.src( [ js1, js2, js3 ] )
        .pipe( concat( "scripts.js" ) )
        .pipe( gulp.dest( jsDest ) )
        .pipe( rename( "scripts.min.js" ) )
        .pipe( uglify() )
        .pipe( gulp.dest( jsDest ) );
}

function css() {
    var css1 = "../css/styles.css",
        css2 = "../css/partials/**/.css",
        css3 = "../css/lightbox/**/*.css",
        jsDest = "../../assets/css";

    return gulp.src( [ css1, css2, css3 ] )
        .pipe( concatCss( "styles.css" ) )
        .pipe( autoprefixer() )
        .pipe( cssmin() )
        .pipe( rename( {
            suffix: ".min"
        } ) )
        .pipe( gulp.dest( jsDest ) );
}

function watch() {
    gulp.watch( "../js/main.js", [ "cru", ] );
    gulp.watch( "../css/styles.css", [ "css", ] );
}
