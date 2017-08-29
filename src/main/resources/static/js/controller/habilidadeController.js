// Criacao de controllers
appPokemon.controller("habilidadeController", function($scope, $http) {

	$scope.habilidades = [];
	$scope.selected = [];

	$scope.exist = function(habilidade) {

		return $scope.selected.indexOf(habilidade) > -1;
	}
	$scope.toggleSelection = function(habilidade) {

		var idx = $scope.selected.indexOf(habilidade);

		if (idx > -1) {

			$scope.selected.splice(idx, 1);
		} else {

			$scope.selected.push(habilidade);
		}

	};
	listarHabilidades = function() {
		$http({
			method : 'GET',
			url : 'http://pokeapi.co/api/v2/move/'
		}).then(function(response) {
			$scope.habilidades = response.data;
		}, function(response) {
			console.log(response.data);
			console.log(response.status);
		});

	};
	$scope.salvarHabilidade = function() {
		$http({
			method : 'POST',
			url : 'http://localhost:8080/habilidades',
			data : $scope.selected
		}).then(function(response) {
			console.log(response.data);
			alert('Habilidades integradas com sucesso');
			$scope.selected = [];

		}, function(response) {
			alert('Retorno: ' + response.status + '. Erro na requisição.');

			console.log(response.data);
			console.log(response.status);
		});

	};

	listarHabilidades();
});