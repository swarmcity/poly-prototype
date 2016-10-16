module.exports = function(deployer) {

console.log('token address is at ',ARCToken.address);

		return deployer.deploy(localsInOut, ARCToken.address).then(function() {
//			console.log('localsInOut', localsInOut.address);
		});


	// deployer.deploy(REPToken).then(function() {
	// 	console.log('REPtokenaddress', REPToken.address);
	// });	
	//	deployer.link(ARCToken,localsInOut);

	// deployer.deploy([
	// 	[ARCToken, 0xe4d11ca64f35a909ccfd9076ac4f700133eb8cfb, 1680543, 1871858],
	// 	[localsInOut]
	// ]);
	// deployer.autolink();

	// deployer.link()
};