module.exports = function(callback) {

	function makeid(len) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < len; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
	var _ipfshash = makeid(32);

	var _ARCCoin = ARCToken.deployed();
	var _localsInOut = localsInOut.deployed();
	var account = '0x' + ARCToken.class_defaults.from;

	console.log('ARCcoin at', _ARCCoin.address);
	console.log('localsInOut at', _localsInOut.address);
	console.log('account at', account);


	_ARCCoin.mintToken(account, 200 * 1e18).then(function() {
		_ARCCoin.balanceOf(account).then(function(balance) {
			console.log('balance of', account, 'is', balance.toNumber());
			console.log('<-- creating new POD');
			REPToken.new('NeedARideRFD', 'TEST', 'QmTRqUFRRYNLB3UYbt9JzHMs9xwUgu6kJ2ELQFdg7sdcx4').then(function(_REPinstance) {
				console.log('--> POD deployed');
				console.log('REPinstance.address', _REPinstance.address);

				console.log('<-- whitelisting localsInOut REPToken');
				_REPinstance.addToWhitelist(_localsInOut.address).then(function() {
					console.log('--> localsInOut whitelisted');

					doNewOffer(_REPinstance.address);
				}).catch(function(error) {
					console.error(error);
				});
			});
		});
	});


	function doNewOffer(repAddress) {


		// function showallowance() {
		// 	console.log('-----current balances and allowances----');
		// 	var allowance = _ARCCoin.allowance(repAddress, _localsInOut.address).then(function(a) {
		// 		console.log('allowance of ', _localsInOut.address, 'is', a.toNumber());

		// 	});
		// 	var balance = _ARCCoin.balanceOf('0xe4d11ca64f35a909ccfd9076ac4f700133eb8cfb').then(function(a) {
		// 		console.log('balance of ', '0xe4d11ca64f35a909ccfd9076ac4f700133eb8cfb', 'is', a.toNumber());
		// 		//process.exit();
		// 	});
		// }



		console.log('<-- make approval');
		_ARCCoin.approve(_localsInOut.address, 18 * 1e18).then(function() {
			console.log('-->approve done');
			//			showallowance();

			console.log('<-- make newOffer')
			_ARCCoin.balanceOf(account).then(function(balance) {
				console.log('balance of', account, '(before newoffer) is', balance.toNumber());
				// 	process.exit();
				// 	claimoffer(_ipfshash);
				var transaction = _localsInOut.newOffer(repAddress, 10 * 1e18, _ipfshash).then(function(a) {
					console.log('--> new offer created', a);


					// _ARCCoin.allowance(account, _localsInOut.address).then(function(a) {
					// 	console.log('allowance of', account, _localsInOut.address, 'is', a.toNumber());


					// _ARCCoin.balanceOf(account).then(function(balance) {
					// 	console.log('balance of', account, 'is', balance.toNumber());
					// 		process.exit();
					claimoffer(_ipfshash);
					// }, function(error) {
					// 	console.error('error: ', error); // 'uh oh: something bad happened’
					// });
					// });

				}, function(error) {
					console.error('error: ', error); // 'uh oh: something bad happened’
				});
			}, function(error) {
				console.error('error: ', error); // 'uh oh: something bad happened’
			}).catch(function(e) {
				console.log(e);
			});

			// _localsInOut.watch(function(error, result) {
			// 	// This will catch all Transfer events, regardless of how they originated.
			// 	if (error == null) {
			// 		console.log(result.args);
			// 	}
			// });


		});
	}

	function claimoffer(ipfshash) {

		console.log('<-- giving driver allowance ');
		_ARCCoin.approve(_localsInOut.address, 18 * 1e18).then(function() {
			console.log('--> driver allowance given');

			console.log('<-- lookup ipfshash ID ');
			_localsInOut.ipfstoid.call(ipfshash).then(function(a) {

				var offerid = a.toNumber();

				console.log('<-- ipfshash ID=', a.toNumber());


				console.log('<-- claiming offer', ipfshash);
				_localsInOut.claim(a.toNumber()).then(function(a) {


					console.log(a);
					console.log('--> offer claimed', ipfshash);

					console.log('<-- confirming offer', ipfshash);
					_localsInOut.confirm(offerid).then(function(a) {
						console.log(a);
						console.log('--> offer confirmed... well done !');
					});


				})
			});
		});

	}

	// function claimoffer(ipfshash) {
	// 	_localsInOut.claim(ipfshash).then(function(a) {
	// 		console.log(a);
	// 	})
	// }


};