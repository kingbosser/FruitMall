angular.module('adminApp',[]).controller('adminController',['$scope','$http',function($scope,$http){
	//获取用户信息
	// $http.get('/user/profile').then(function(data){
	// 	$scope.user = data;
	// 	$scope.error = "";
	// }).catch(function(data){
	// 	$scope.user = {};
	// 	$scope.error = data;
	// });
	//获取产品信息
	$http.get('/product/profile').then(function(data){
		$scope.products = data.data;
		$scope.product = [];
	}).catch(function(data){
		$scope.products = [];
	});

	//获取订单信息
	// $http.get('/order/profile').then(function(data){
	// 	$scope.orders = data;
	// }).catch(function(data){
	// 	$scope.orders = [];
	// });
	$scope.admincontent = '/static/admin-pro.html'
	//点击图片呈现对应的试图，也就是向详情页传递产品的id
	$scope.setProduct = function(productId){
		$scope.product = this.product;
	}
	$scope.setContent = function(filename){
    	$scope.admincontent = '/static/'+filename;
    }
    //从数据库删除产品
    $scope.deleteFromDatabase = function(productId){
    	for(var i = 0;i < $scope.products.length;i++){
			if($scope.products[i]._id == productId){
				$scope.products.splice(i,1);
				break;
			}
		}
		$http.post('/admin/remove',{proid:productId}).then(function(data){

		}).catch(function(data){
			console.log(data);
		})
    }
	

}]);