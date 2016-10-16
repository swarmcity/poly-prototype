import "./owned.sol";
import "./ARCToken.sol";

// in case of dispute a moderator can be assigned
// the moderator can vote to payout
// or refund the escrow

contract ARCEscrow  is owned {

	address public receiver;
 	ARCToken coincontract;
 	event EscrowJoined(address receiver);
 	event EscrowPayout(address receiver,uint amount);
// 	uint joinvalue;
// 	bool disputed;

	function ARCEscrow(ARCToken _contract){
		coincontract = _contract; //ARCToken(_ARCcoinaddress);
//		disputed = false;
		//coincontract.transferFrom(msg.sender,this,value);
	}


	// function assignModerator(address _moderator) onlyOwner{
	// 	moderator = _moderator;
	// }

	function join(address _receiver){
		if (receiver != 0x0) throw;
		receiver = _receiver;
		EscrowJoined(_receiver);
	}

	function payout() onlyOwner {
		uint balance = coincontract.balanceOf(this);
		if (receiver != 0x0){
			coincontract.transfer(receiver,balance);
			EscrowPayout(receiver,balance);
		}else{
			// if we don't have a receiver - just refund your tokens
			coincontract.transfer(msg.sender,coincontract.balanceOf(this));						
			EscrowPayout(msg.sender,balance);
		}
	}

	// function refund(){
	// 	if (joinvalue>0){
	// 		coincontract.transferFrom(this,receiver,coincontract.balanceOf(this)/2);
	// 		coincontract.transferFrom(this,receiver,coincontract.balanceOf(this)/2);
	// 	}
	// }

}
