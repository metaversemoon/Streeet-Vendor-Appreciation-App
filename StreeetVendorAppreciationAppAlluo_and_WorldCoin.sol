// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ByteHasher } from './helpers/ByteHasher.sol';
import { IWorldID } from './interfaces/IWorldID.sol';

contract StreeetVendorAppreciationApp is ERC721URIStorage {
  Counters.Counter public allNFTS;
  mapping(uint => vendorClass) public allVendors;
  uint public _allVendors = 0;
  mapping(uint => vendorClass) public allVendors;
  mapping(uint => reviewClass) public allReviews;
  using ByteHasher for bytes;
  using Counters for Counters.Counter;
  error InvalidNullifier();
  uint256 internal immutable groupId = 1;
  mapping(uint256 => bool) internal nullifierHashes;
   event vendorCreated (
    uint id,
    string cid,
    uint targetAmmount,
    address organizer
  );

event reviewCreated (
    uint id,
    string cid,
    address organizer
  );

  // creates a flow
  function createFlow(address receiver, int96 flowRate, uint256 toWrap) external {
        _transfer(msg.sender, address(this), toWrap);
        _approve(address(this), superToken, toWrap);
        IAlluoSuperToken(superToken).upgradeTo(msg.sender, toWrap, "");
        cfaV1Lib.createFlowByOperator( msg.sender, receiver, ISuperfluidToken(superToken), flowRate);
        ISuperfluidResolver(superfluidResolver).addToChecker(msg.sender, receiver);
        emit CreateFlow(msg.sender, receiver, flowRate);
    }

    // cancels a flow
    function stopFlowWhenCritical(address sender, address receiver) external onlyRole(DEFAULT_ADMIN_ROLE) {
        cfaV1Lib.deleteFlowByOperator(sender, receiver, ISuperfluidToken(superToken));
        emit DeletedFlow(sender, receiver);
    }

    //  for only admin
     function forceWrap(address sender) external onlyRole(DEFAULT_ADMIN_ROLE) {
          uint256 balance = balanceOf(address(sender));
          _transfer(sender, address(this), balance);
          _approve(address(this), superToken, balance);
          IAlluoSuperToken(superToken).upgradeTo(sender, balance, "");
      }
  struct vendorClass {
    uint id;
    string cid;
    uint targetAmmount;
    uint totalDonations;
    address organizer;
  }



constructor() ERC721("StreeetVendorAppreciationApp", "SVAA") {}
  function createVendor(string calldata _cid, uint _targetAmmount, address input, uint256 root, uint256 nullifierHash, uint256[8] calldata proof) public {
    // first, we make sure this person hasn't done this before
    if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
    then, we verify they're registered with WorldID, and the input they've provided is correct
    worldId.verifyProof(
      root,
      groupId,
      abi.encodePacked(input).hashToField(),
      nullifierHash,
      abi.encodePacked(address(this)).hashToField(),
      proof
  );
  finally, we record they've done this, so they can't do it again (proof of uniqueness)
  nullifierHashes[nullifierHash] = true;


  allVendors[_allVendors] = vendorClass(_allVendors, _cid, _targetAmmount, 0, msg.sender);
    emit GroupCreated(_allVendors, _cid, _targetAmmount, msg.sender);
    _allVendors++;
  }

  function donateStableCoin(uint _donationId, uint _donationAmmount) public {
    vendorClass storage _currentGroup = allVendors[_donationId];
    _currentGroup.totalDonations += _donationAmmount;
  }

  function getAllVendors() public view returns (vendorClass[] memory) {
      vendorClass[] memory vendorList = new vendorClass[](_allVendors);

      for (uint i = 0; i < _allVendors; i++) {
          vendorClass storage currentItem = allVendors[i];
          vendorList[i] = currentItem;
      }
      return vendorList;
  }

   function updateVendor() public view returns (vendorClass[] memory) {
      vendorClass[] memory vendorList = new vendorClass[](_allVendors);

      for (uint i = 0; i < _allVendors; i++) {
          vendorClass storage currentItem = allVendors[i];
          vendorList[i] = currentItem;
      }
      return vendorList;
  }

   function addReviev() public view returns (vendorClass[] memory) {
      vendorClass[] memory vendorList = new vendorClass[](_allVendors);
       allVendors[_allVendors] = vendorClass(_allVendors, _cid, _targetAmmount, 0, msg.sender);
    emit vendorCreated(_allVendors, _cid, _targetAmmount, msg.sender);
    _allVendors++;
      return class;
  }

}


