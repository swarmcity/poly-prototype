module.exports = function(callback) {

		var _localsInOut = localsInOut.deployed();

		console.log('_localsInOut: ', _localsInOut.address);

		var event = _localsInOut.allEvents().watch({}, '');
		//var event = localstore.Error();

		// event.watch(function (error, result) {
		//      if (error) {
		//        console.log("Error: " + error);
		//      } else {
		//        console.log("Event: " + result.event);
		//    }
		// });


		REPToken.new('NeedARideRFD', 'TEST', 'QmTRqUFRRYNLB3UYbt9JzHMs9xwUgu6kJ2ELQFdg7sdcx4').then(function(_REPinstance) {
			console.log(_REPinstance.address);
			console.log('REPinstance.address', _REPinstance.address);
		}).catch(function(error) {
			console.error(error);
		});
}



		// var coinevent = localsCointoken.deployed().allEvents().watch({}, '');
		// //var coinevent = localstore.Error();

		// coinevent.watch(function (error, result) {
		//      if (error) {
		//        console.log("Error: " + error);
		//      } else {
		//        console.log("Event: " + result.event);
		//    }
		// });

		// localstore.createAssociation(50, 10).then(function(test){
		// 	console.log('association created...');
		// });
		//}



		// 		var _localsInOut = localsInOut.at('0x4e34eaeaa81af741e9a5fd3c49ce4c36508c98b7');
		// 		console.log('localsinout 1 at', _localsInOut.address);

		// //		REPToken.new('needarideANT ATX BRU', 'ALI').then(function(_REPinstance) {
		// 		REPToken.new('needarideANT', 'TEST').then(function(_REPinstance) {
		// 			console.log(_REPinstance.address);
		// 			console.log('REPinstance.address', _REPinstance.address);
		// 			//assert.equal(instance.address, 10000, "10000 wasn't in the first account");

		// 		// 	// function newOffer(
		// 		// 	//    address _repcoinaddress,   // repcoin token address
		// 		// 	//    uint _amount,
		// 		// 	//    string _descriptionipfs,
		// 		// 	//    uint _validityStart,
		// 		// 	//    uint _duration
		// 		// 	//  )

		// 		// 	console.log('localsInOut address', localsInOut.address);

		// 			_localsInOut.newOffer(_REPinstance.address, 10, 'need a ride from BIA to Meir now', Math.floor(Date.now() / 1000), 1234).then(function(_Offerinstance) {


		// 				console.log('new offer created at',_Offerinstance);


		// 				//_Offerinstance.


		// 			}).catch(function(e){
		// 				console.log(e);
		// 			});



		// 		}).catch(function(e) {
		// 			// There was an error! Handle it. 
		// 			console.log(e);
		// 		});