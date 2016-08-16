console.log('app.js loaded!');

// initialize the application
var app = angular.module("hangmanApp", []);
app.controller('HangmanController', HangmanController);

HangmanController.$inject = ["$scope", "$http"];
function HangmanController($scope, $http) {
	var self = this;

	restartGame();


	this.gameStatus = "";

	this.winNum = 0;
	this.loseNum = 0;

	$scope.guessLetter = function () {
		var newGuess = self.guess.toLowerCase();
		self.game.guess(newGuess);
		self.guess = "";
		console.log(self.game.gameWon);
		if (self.game.gameWon === true) {
			self.gameStatus = "glyphicon-ok";
			self.winNum++;
			restartGame();
		}
		else if (self.game.gameWon === false) {
			self.gameStatus = "glyphicon-remove";
			self.loseNum++;
			restartGame();
		}
	};

	function restartGame() {
		$http
		  .get('http://randomword.setgetgo.com/get.php')
		  .then(function(response){
			  console.log(response.data);
			self.game = new HangmanGame(response.data);
		});
	}


}
