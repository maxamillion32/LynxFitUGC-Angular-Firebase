(function (angular) {
  'use strict';

  angular.module('lynxfit').directive('lfDataToggle', lfDataToggle);

  function lfDataToggle() {

    var directive = {
      restrict: 'EA',
      link:linkFunc,
      scope:{
        target:'@',
        classToggle:'@'
      }
    };

    return directive;

    function linkFunc(scope, element, attrs){

      element.bind('click', function(e){
        e.preventDefault();
        toggle(e);
      });

      function toggle(e){
        var $this = $(e.target), $class , $target, $classes, $targets;
        $class = scope.classToggle;
        $target = scope.target || attrs.href;
        if($class){
          $classes = $class.split(',');
        }
        if($target){
          $targets = $target.split(',');
        }
        if($classes && $classes.length){
          $.each($targets, function( index, value ) {
            if ( $classes[index].indexOf( '*' ) !== -1 ) {
              var patt = new RegExp( '\\s' +
                $classes[index].
                  replace( /\*/g, '[A-Za-z0-9-_]+' ).
                  split( ' ' ).
                  join( '\\s|\\s' ) +
                '\\s', 'g' );
              $($this).each( function ( i, it ) {
                var cn = ' ' + it.className + ' ';
                while ( patt.test( cn ) ) {
                  cn = cn.replace( patt, ' ' );
                }
                it.className = $.trim( cn );
              });
            }
            if($targets[index] !=='#'){
              $($targets[index]).toggleClass($classes[index]);
            }
          });
        }
        $this.toggleClass('active');
      }
    }
  }

})(angular);