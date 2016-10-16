module.exports = function(callback) {
	var _ARCCoin = ARCToken.deployed();

// 	var accounts = [
// //		'0x5e443950acaa29b01d1493ab436e3556af1283bb',
// //		'0x650949f9e886f5056a83adce896a8c5536ad2b29',
// //		'0xaa249f0166c9529569c493704c2539c872cd5260',
// 		'0xe4d11ca64f35a909ccfd9076ac4f700133eb8cfb',
// 	];


		_ARCCoin.transfer('0x666879A15c473aaa72a333bd88eE14d7d98a5A4D', 3e18).then(function(a) {
			console.log('minted. TXhash=', a);
			_ARCCoin.balanceOf(account).then(function(a) {
				console.log('balance = ', a.toNumber());
			});
		});

	//});


	//				mint('0x5e443950acaa29b01d1493ab436e3556af1283bb', amount+1);
	//				mint(fixaddress('0x650949f9e886f5056a83adce896a8c5536ad2b29'), amount);
	//				mint('0xaa249f0166c9529569c493704c2539c872cd5260', amount+3);

};