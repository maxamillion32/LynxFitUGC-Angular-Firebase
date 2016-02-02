(function (angular) {
  'use strict';
  angular.module('lynxfit').factory('SubscriptionModel', SubscriptionModel);

  function SubscriptionModel(Subscription, Auth) {
    var attributes = {
      name: '',
      description: '',
      category: 'HIIT',
      difficultyLevel: 'Beginner',
      programType: 'activity',
      spekableDescription: '',
      coverImage240: '',
      currentDay: 1,
      totalDays: 1,
      rounds: []
    };
    var roundAttributes = {
      roundRepeats: 1,
      restDuration: 1,
      restType: '5secs'
    };
    var stepAttributes = {
      name: '',
      description: '',
      type: 'activity',
      time: 0
    };
    var subscriptionModel = {
      attributes: angular.copy(attributes),
      roundAttributes: roundAttributes,
      stepAttributes: stepAttributes,
      createWorkout: createWorkout,
      updateWorkout: updateWorkout,
      setAttributes: setAttributes
    };
    return subscriptionModel;

    function createWorkout() {
      return Subscription.createWorkout(Auth.$getAuth().uid, subscriptionModel.attributes);
    }

    function updateWorkout() {
      return Subscription.updateWorkout(subscriptionModel.attributes);
    }

    function setAttributes(attributes) {
      subscriptionModel.attributes = attributes;
    }
  }
})(angular);
