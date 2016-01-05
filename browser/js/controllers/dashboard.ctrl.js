app.controller('dashboard', function($scope){
    $scope.showAddBox = false;
    $scope.quoteOfTheDay = {quote: "May your vice be nice", author: "Magic Hat #9 bottle cap"};
    $scope.toggleAdd = function(){
        $scope.showAddBox = !$scope.showAddBox;
    };
});