// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AccessControl {
    using SafeMath for uint256;

    event Confirmation(address indexed sender, uint256 indexed transactionId);
    event Revocation(address indexed sender, uint256 indexed transactionId);  
    event Submission(uint256 indexed transactionId);
    event Execution(uint256 indexed transactionId);
    event ExecutionFailure(uint256 indexed transactionId);
    event Deposit(address indexed sender, uint256 value);
    event OwnerAddition(address indexed owner);
    event OwnerRemoval(address indexed owner);
    event QuorumUpdate(uint256 quorum);
    event AdminTransfer(address indexed newAdmin);

    address public admin;

    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 quorum;

    modifier notNull(address _address) {
        require(_address != address(0), "Specified destination doesn't exist");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Admin restricted function");
        _;
    }

    modifier ownerExistsMod(address owner) {
        require(isOwner[owner] == true, "This owner doesn't exist");
        _;
    }

    modifier notOwnerExistsMod(address owner) {
        require(isOwner[owner] == false, "This owner already exists");
        _;
    }

    constructor(address[] memory _owners) {
        admin = msg.sender;
        require(
            _owners.length >= 3,
            "Atleast 3 Owner required"
        );
        for (uint256 i = 0; i < _owners.length; i++) {
            isOwner[_owners[i]] = true;
        }
        owners = _owners;
        uint256 num = SafeMath.mul(owners.length, 60);
        quorum = SafeMath.div(num, 100);
    }

    function addOwner(address owner)
        public
        onlyAdmin
        notNull(owner)
        notOwnerExistsMod(owner)
    {
        isOwner[owner] = true;
        owners.push(owner);

        emit OwnerAddition(owner);

        updateQuorum(owners);
    }

    function removeOwner(address owner)
        public
        onlyAdmin
        notNull(owner)
        ownerExistsMod(owner)
    {
        isOwner[owner] = false;

        for (uint256 i = 0; i < owners.length - 1; i++)
            if (owners[i] == owner) {
                owners[i] = owners[owners.length - 1];
                break;
            }
        owners.pop();

        updateQuorum(owners);
    }

    function transferOwner(address _from, address _to)
        public
        onlyAdmin
        notNull(_from)
        notNull(_to)
        ownerExistsMod(_from)
        notOwnerExistsMod(_to)
    {
        for (uint256 i = 0; i < owners.length; i++)
            if (owners[i] == _from) {
                owners[i] = _to;
                break;
            }

        isOwner[_from] = false;
        isOwner[_to] = true;

        emit OwnerRemoval(_from);
        emit OwnerAddition(_to);
    }

    function renounceAdmin(address newAdmin) public onlyAdmin {
        admin = newAdmin;

        emit AdminTransfer(newAdmin);
    }

    function updateQuorum(address[] memory _owners) internal {
        uint256 num = SafeMath.mul(_owners.length, 60);
        quorum = SafeMath.div(num, 100);

        emit QuorumUpdate(quorum);
    }
}