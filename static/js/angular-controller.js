angular.module('myApp',[]).controller('myController',['$scope','$http',function($scope,$http){
	//获取用户信息
	$http.get('/user/profile').then(function(data){
		$scope.user = data;
		$scope.error = "";
	}).catch(function(data){
		$scope.user = {};
		$scope.error = data;
	});
	//获取产品信息
	$http.get('/product/profile').then(function(data){
		$scope.products = data;
		$scope.product = data[0];
	}).catch(function(data){
		$scope.products = [];
	});

	//获取订单信息
	$http.get('/order/profile').then(function(data){
		$scope.orders = data;
	}).catch(function(data){
		$scope.orders = [];
	});

	//点击图片呈现对应的试图，也就是向详情页传递产品的id
	$scope.setProduct = function(productId){
		$scope.product = this.product;
	}

	//添加至购物车
	$scope.addToCart = function(productId){
		var found = false;
		for(var i = 0; i< $scope.users.cart.length;i++){
			var item = $scope.users.cart[i];
			if(item.product[0]._id === productId){
				item.quantity += 1;
				found = true;
			}
		}
		if(!found){
			$scope.users.cart.push({
				quantity: 1,
				product: [this.product]
			});
		}
		$http.post('/user/cart',{updatedCart: $scope.users.cart}).then(function(data){

		}).catch(function(data){
			console.log(data);
		})
	}

	//购物车价格总计
	$scope.cartTotal = function(){
		var total = 0;
		for(var i = 0;i < $scope.users.cart.length;i++){
			var item = $scope.users.cart[i];
			total += item.quantity * item.product[0].shopPrice; 
		}
		return total;
	}

	//从购物车删除物品
	exports.deleteFromCart = function(productId){
		for(var i = 0;i < $scope.users.cart.length;i++){
			var item = $scope.users.cart[i];
			if(item.product[0]._id == productId){
				$scope.users.cart.splice(i,1);
				break;
			}
		}
		$http.post('/user/cart',{updatedCart: $scope.users.cart}).then(function(data){

		}).catch(function(data){
			console.log(data);
		});
	}


	//清空购物车
	exports.emptyCart = function(){
		$scope.users.cart = [];
	}
	$http.post('/user/cart',{updatedCart: $scope.users.cart}).then(function(data){

	}).catch(function(data){
		console.log(data);
	});


}]);