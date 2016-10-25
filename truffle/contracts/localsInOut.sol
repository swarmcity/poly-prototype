import "./owned.sol";
import "./ARCToken.sol";
import "./ARCEscrow.sol";

contract localsInOut is owned {

  event OfferAdded(uint offerID, address creator, string ipfsdescr, uint escrowID, address repaddress,uint timestamp);
  event OfferClaimed(uint offerID, address creator, string ipfsdescr, address claimer, address escrowaddress, address repaddress,uint timestamp);
  event OfferReleased(uint offerID, address creator, string ipfsdescr,uint timestamp);
  event OfferConflict(uint offerID, address creator, string ipfsdescr, address claimer, address escrowaddress, address repaddress,uint timestamp);

  event EscrowCreated(uint escrowID, address ec.creator, uint ec.amount, uint ec.status);

  Offer[] public offers;
  Escrow[] public escrows;

  mapping(string=>uint) ipfstonumber;
  uint public numOffers;

  address public REPcontract; // the address of the REP contract.
  address public ARCTokencontractAddress;

  struct Offer {
    address creator;
    uint amount;            // amount of localcoin
    string descriptionipfs; //
    uint status;
    REPToken tagcontract;
    address escrowaddress;
  }

  struct Escrow {
    address creator;
    address claimer;
    uint amount;
    uint offerid;
    uint status;
  }

  struct Confirmation {
      bool inSupport;
      address voter;
  }

  function localsInOut(address _ARCTokencontract){
    ARCTokencontractAddress = _ARCTokencontract;
  }

  /* Function to create a new proposal */
  function newOffer(
    address _repcoinaddress,   // repcoin token address
    uint _amount,
    string _descriptionipfs
  ){
      uint offerID = offers.length++;
      Offer o = offers[offerID];
      ipfstonumber[_descriptionipfs] = offerID;
      o.creator = msg.sender;
      o.tagcontract = REPToken(_repcoinaddress);
      o.descriptionipfs = _descriptionipfs;
      o.status = 0;
      numOffers = offerID+1;

      // load the ARC contract
      ARCToken ARCTokencontract = ARCToken(ARCTokencontractAddress);

      // create the escrow
      //o.escrowaddress = address(new ARCEscrow(ARCTokencontract));
      // put my funds in the escrow

      // KF // Create a new escrow object and set status to 1
      uint escrowID = escrows.length++;
      Escrow ec = escrows[escrowID];
      ec.creator = msg.sender;
      ec.amount = _amount;
      ec.status = 1;

      EscrowCreated(escrowID, ec.creator, ec.amount, ec.status);

      ARCTokencontract.transferFrom(msg.sender,this);

      OfferAdded(offerID, o.creator, o.descriptionipfs, escrowID, o.tagcontract, now);

  }


  function ipfstoid(string ipfshash) returns (uint offerid){
    return ipfstonumber[ipfshash];
  }

  function claim(uint offerid)
  {
      Offer o = offers[offerid];
      ARCEscrow escrow = ARCEscrow(o.escrowaddress);

      // load the ARC contract
      ARCToken ARCTokencontract = ARCToken(ARCTokencontractAddress);
      // put my funds in the escrow
      ARCTokencontract.transferFrom(msg.sender,o.escrowaddress,ARCTokencontract.balanceOf(o.escrowaddress));


      // join the escrow with an equal amount of tokens
      escrow.join(msg.sender);

      OfferClaimed(offerid, o.creator, o.descriptionipfs, msg.sender, o.escrowaddress, o.tagcontract, now);

  }

  function confirm(uint offerid) {
    Offer o = offers[offerid];

    // only the creator can confirm the transaction
    //if (o.creator != msg.sender) throw;

    // the escrow may not have already been released
    //ARCToken ARCTokencontract = ARCToken(ARCTokencontractAddress);
    //if (ARCTokencontract.balanceOf(o.escrowaddress) == 0) throw;

    // All good - payout the escrow
    ARCEscrow escrow = ARCEscrow(o.escrowaddress);
    escrow.payout();

    OfferReleased(offerid, o.creator, o.descriptionipfs, now);

    //event OfferReleased(uint offerID, address creator, string ipfsdescr, address claimer, address escrowaddress, address repaddress);

    // give new KARMA to both parties.
    //o.tagcontract.mintToken(escrow.receiver(),5);
    //o.tagcontract.mintToken(msg.sender,5);

  }

}
