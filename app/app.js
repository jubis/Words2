var wordsApp = angular.module("wordsApp", [
	"ngRoute",
	"wordsController",
	"manageController"
]);

wordsApp.config(["$routeProvider", function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "app/views/home.html"
	})
	.when("/ask", {
		templateUrl: "app/views/askword.html",
		controller: "AskWord"
	})
	.when("/add", {
		templateUrl: "app/views/managewords.html",
		controller: "ManageWords"
	})
	.otherwise({
		redirectTo: "/"
	});
}]);

