import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

class MogulDAOMarkleTree {
	constructor(propertyOwnerAddresses) {
		this.propertyOwnerAddresses = propertyOwnerAddresses;
		const leafNodes = this.propertyOwnerAddresses.map((addr) => keccak256(addr));
		this.propertyOwnersMarkleTree = new MerkleTree(leafNodes, keccak256, {
			sortPairs: true,
		});
	}

	getOwnersRootHash() {
		const rootHash = this.propertyOwnersMarkleTree.getHexRoot();
		return rootHash;
	}

	getOwnerProof(ownerAddress) {
		const proof = this.propertyOwnersMarkleTree.getHexProof(keccak256(ownerAddress));
		return proof;
	}
}

export default MogulDAOMarkleTree;
