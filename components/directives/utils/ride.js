(function (angular) {
    'use strict';

    angular.module('lynxfit').directive('lfDataRide', lfDataRide);

    function lfDataRide() {

        var directive = {
            restrict: 'EA',
            link: linkFunc,
            scope: {
                target: '@'
            }
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            element.bind('click', function (e) {
                e.preventDefault();
                scroll();
                animate();
            });
            function scroll() {
                $('html, body').stop().animate({
                    'scrollTop': $(scope.target).offset().top
                }, 1000);
            }

            function animate() {
                var $target = $(scope.target + ' [data-ride="animated"]');
                if(!$target.hasClass("animated")) {
                    $target.appear();
                    $target.addClass('appear');

                    $target.on('appear', function () {
                        var $el = $(this),
                            $ani = ($el.data('animation') || 'fadeIn'),
                            $delay;
                        if (!$el.hasClass('animated')) {
                            $delay = $el.data('delay') || 0;
                            setTimeout(function () {
                                $el.removeClass('appear').addClass($ani + " animated");
                            }, $delay);
                        }
                    });
                }
            }
        }
    }
})(angular);


