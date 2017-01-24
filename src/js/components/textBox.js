'use strict';

angular.module('textBox', [/*'textBox'*/])
.service('myService', myService)
.component('textBox', {
   bindings: {
          lang: '@',
          box: '@'
        },
    template:'<span ng-init="$ctrl.setTxt()">{{$ctrl.value}}</span>'+
        '<div ng-if="$ctrl.showEdit">'+
        '<span ng-click="$ctrl.setForm()" class="icoEdit"> </span>'+
        '<div class="modalView" ng-Show="$ctrl.showModal">'+
            '<div>{{$ctrl.base}}</div>'+
            '<span class="fLeft" ng-click="$ctrl.baseEsp()"> Español </span> | <span class="fRight" ng-click="$ctrl.baseEn()"> English </span>'+
            '<div class="LangActual">{{$ctrl.lang}}<div><input value="{{$ctrl.nueva}}"/></div></div>'+
            '<button ng-click="$ctrl.showModal=!$ctrl.showModal" class="fRight"> close </button>'+
            '<button ng-click="$ctrl.saveN()" class="fRight"> save </button>'+
        '</div>',
    controller: function(myService){
        var vm = this;
        vm.txtService = myService.getService();
        vm.showEdit = false;
        vm.showModal = false;
        vm.value = '';
        vm.base = '';
        vm.nueva = '';
        vm.baseTr = [];
        vm.nuevaTr = [];
        var completa = [];

        //seteo la pagina
        vm.setTxt = function(){
            vm.txtService.forEach(function(elem){
                if(elem.id === vm.box){//
                    completa = elem;
                    };
                });
            vm.value = completa[vm.lang];
            if(vm.value == ''){
                vm.showEdit = true;
                vm.value = vm.txtService[1][vm.lang];
                }
            }

        //seteo formulario traducion
        vm.setForm = function (){
            vm.showModal = !vm.showModal;
            for(var i in completa) {
                if(completa[i] === vm.box){
                    }else if(completa[i] !== ''){
                    vm.baseTr.push(completa[i]);
                    }else{
                    vm.nuevaTr.push(completa[i]);
                    };
                vm.base = vm.baseTr[0];
                vm.nueva = vm.nuevaTr[vm.lang];
                }
            }

        vm.baseEsp = function(){
            vm.base = completa.es;
            }
        vm.baseEn = function(){
            vm.base = completa.en;
            }
        vm.saveN = function(){
            console.log(vm.nueva);
            }
        
        }
    }
)