const SHA256 = require('crypto-js/sha256')
class Block {
    constructor( data,index) {
        this.index = index;
        this.timestamp=new Date();
        this.data = data;
        this.previousHash = "0";
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();

    }

    mineBlock(difficulty) {

    }
}
// cette classe represente celle de la blockchain
class Blockchain{
    constructor() {
        this.chain = [this.createGenesis()];
        
    }

    createGenesis() {
        return new Block(  "Genesis block", 1)
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
} 

    const blockchain =new Blockchain();
    blockchain.addBlock(new Block("test2",2));
    for (let i = 3; i <= 5; i++) {
        blockchain.addBlock(new Block("test"+i,i));
        
    }
    console.log(blockchain);      
