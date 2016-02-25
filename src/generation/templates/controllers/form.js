{% import 'common.jinja' as common %}
(function () {
    'use strict';

    angular.module('app')

        .controller('{{name | title}}formController', {{name | title}}formController);

    {{name | title}}formController.$inject = ['EventBus','{{name | title}}Factory', '$filter', '$stateParams'];

    function {{name | title}}formController(EventBus, {{name | title}}Factory, $filter, $stateParams) {

        var ctrl = this;
        ctrl.update = false;
        ctrl.oldObject = {};
        ctrl.currentObject = {};

        if ($stateParams.id != 'new') {
            {{name | title}}Factory.getById($stateParams.id).then(function(success) {
                ctrl.currentObject = success;
                angular.copy(ctrl.currentObject, ctrl.oldObject);
                ctrl.update = true;
            });
        }

        ctrl.save = function () {
            if (ctrl.update) {
                {{name | title}}Factory.update(ctrl.currentObject);
                angular.copy(ctrl.currentObject, ctrl.oldObject);
            } else {
                {{name | title}}Factory.save(ctrl.currentObject);
                angular.copy(ctrl.currentObject, ctrl.oldObject);
            }
        }

        ctrl.resetUpdate = function () {
            angular.copy(ctrl.oldObject, ctrl.currentObject);
        }

        ctrl.cancel = function () {
            EventBus.emitEvent('GoToTableUser');
        }

        ctrl.remove = function () {
            {{name | title}}Factory.remove(ctrl.currentObject.id);
            EventBus.emitEvent('GoToTableUser');
        }
    {%for x in formInputs %}
        {{x}}
   {% endfor %}
}}
)();
