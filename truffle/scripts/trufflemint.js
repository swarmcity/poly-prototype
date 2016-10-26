module.exports = function(callback) {
	var _ARCCoin = ARCToken.deployed();

	var accounts = [
//		'0x04f9b2ded36018f7d16eba9934ce3bc86bcf9bd0',
//		'0x57d23115826ac1367023bca52e2d28f5b0bacb2b',
//		'0x3e3cd18d5ad62693f14be49909b89e252676533d',
		'0x9a05c3541593adf826cae95b924e24c2df9f7dc4',


		// '0x5e443950acaa29b01d1493ab436e3556af1283bb',
		// '0x650949f9e886f5056a83adce896a8c5536ad2b29',
		// '0xaa249f0166c9529569c493704c2539c872cd5260',
		// '0xe4d11ca64f35a909ccfd9076ac4f700133eb8cfb',

	];

console.log('ARC token contract is use is','https://testnet.etherscan.io/token/' + _ARCCoin.address);

	accounts.forEach(function(account) {
		console.log('minting tokens for account', account);
		console.log('https://testnet.etherscan.io/token/' + _ARCCoin.address + '?a='+account);
		var value = 1000; //Math.floor((Math.random()*100)+100);
		_ARCCoin.mintToken(account, value * 1e18).then(function(a) {
			console.log('minted.',value,'tokens. TXhash=', a);
			_ARCCoin.balanceOf(account).then(function(a) {
				console.log('balance = ', a.toNumber());
			});
		});

	});
};
