"use strict";
// http://jsfiddle.net/ftfish/KyEr3/
// http://ngmodules.org/modules/ng-flow

//Directive for adding section on click
tripnoutApp.directive("addsection", function($compile){
	return function(scope, element, attrs) {

		element.bind("click", function(){

			if(!scope.count){scope.count = 0;}

			scope.thisType = attrs.datatype;

			switch(attrs.datatype) {

				case "text":
					// add a text field
					angular.element(document.getElementById('content'))
					.append(
		                $compile("<div class='section' ng-init='tripdata.content["+scope.count+"].datatype = textType'><md-input-container><textarea ng-model='tripdata.content["+scope.count+"].content' columns='2' placeholder='Begin writing...' required></textarea></md-input-container></div>")(scope)
		            );
				break;

				case "image":
					// upload an image with flow.js
					angular.element(document.getElementById('content'))
					.append(
		                $compile(
	                        "<div class='section' ng-init='tripdata.content["+scope.count+"].datatype = imageType'><div flow-init flow-files-submitted='$flow.upload()'><div ng-class='dropClass' flow-drop ng-if='!$flow.files[0]' flow-drag-enter='dropClass = \"drop drag-over\"' flow-drag-leave='dropClass=\"drop\"'><span class='uploadBtn' flow-btn>Upload File</span> <strong>OR</strong> Drag And Drop your file here</div><div ng-if='$flow.files[0]'><img flow-img='$flow.files[0]' /><span style='display:none' ng-init='tripdata.content["+scope.count+"].content = $flow.files[0].name'></span></div></div>")(scope)
		            );
				break;

				case "video":
					// embed a Youtube video
					angular.element(document.getElementById('content'))
					.append(
		                $compile(
	                        "<div class='section' ng-init='tripdata.content["+scope.count+"].datatype = videoType'><md-input-container><input type='text' ng-model='tripdata.content["+scope.count+"].content' placeholder='Enter a Youtube Video URL' required></md-input-container></div>")(scope)
		            );
				break;

			}
		
			scope.count++;

		});
	}

});
