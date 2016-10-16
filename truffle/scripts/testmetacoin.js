module.exports = function(callback) {

	var meta = ARCToken.deployed();
	var transfers = meta.Transfer({
		fromBlock: "latest"
	});
	transfers.watch(function(error, result) {
		// This will catch all Transfer events, regardless of how they originated.
		if (error == null) {
			console.log(result.args);
		}
	});
};