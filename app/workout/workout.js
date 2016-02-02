(function (angular) {
  'use strict';

  angular.module('lynxfit').config(appRoute);

  function appRoute($stateProvider) {

    $stateProvider
      .state('dashboard.workout', {
        url: '/workout',
        template:'<section ui-view="" class="scrollable padder-lg"></section>',
        controller: workoutCtrlFunc
      })
      .state('dashboard.workout.list', {
        url: '/list',
        templateUrl: 'app/workout/list-workout/list-workout.html',
        controller: 'WorkoutListCtrl',
        controllerAs: 'vm',
        resolve:{
          subscription:getSubscription
        },
        authenticate: true
      })
      .state('dashboard.workout.create', {
        url: '/create',
        templateUrl: 'app/workout/create-workout/create-workout.html',
        controller: 'WorkoutCreateCtrl',
        controllerAs: 'vm',
        resolve:{
          categories: getCategories
        },
        authenticate: true
      })
      .state('dashboard.workout.update', {
        url: '/update/:id',
        templateUrl: 'app/workout/update-workout/update-workout.html',
        controller: 'WorkoutUpdateCtrl',
        controllerAs: 'vm',
        resolve:{
          workout: getWorkout,
          categories: getCategories
        },
        authenticate: true
      })
      .state('dashboard.workout.templates', {
        url: '/templates',
        templateUrl: 'app/workout/workout-templates/workout-templates.html',
        controller: 'WorkoutTemplatesCtrl',
        controllerAs: 'vm',
        resolve:{
          workouts:getWorkoutsTemplates
        },
        authenticate: true
      });
    /* Add New States Above */

    function workoutCtrlFunc($state) {
      if ($state.$current.name === 'dashboard.workout') {
        $state.go('dashboard.workout.list');
      }
    }

    function getWorkoutsTemplates(Workout){
      return Workout.getWorkoutTemplates().$loaded().then(function(workouts){
        return workouts;
      });
    }

    function getSubscription(Subscription, Auth){
      return Subscription.getSubscription(Auth.$getAuth().uid).$loaded().then(function(subscription){
        return subscription;
      });
    }

    function getWorkout(Subscription, Auth, $stateParams){
      return Subscription.getWorkout(Auth.$getAuth().uid, $stateParams.id).$loaded().then(function(workout){
        return workout;
      });
    }

    function getCategories(Categories){
      return Categories.getCategories().$loaded().then(function(category){
        return category;
      });
    }

  }

})(angular);