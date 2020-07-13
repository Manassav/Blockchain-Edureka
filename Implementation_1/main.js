const SHA256 = require('crypto-js/sha256');
class Block
{
    constructor(index,timestamp,data,previoushash ='')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() 
    {
        return SHA256(this.index+this.timestamp+this.previoushash+JSON.stringify(this.data)+this.nonce).toString();
     
    }
    mineBlock(difficulty)
    {
        //seting difficulty with preceding zero's
        //appending number of zero's to array decided by difficulty
        while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join("0"))
        {
            this.nonce++;
            this.hash = this.calculateHash();

        }
        console.log("Block Mined!!!"+this.hash);

    }
}
class Blockchain
{
    constructor()
    {
        this.chain = [this.createGenesisBlock()];
        //setting dificulty by 2 preceeding zero's
        this.difficulty = 2;

    }

    createGenesisBlock()
    {
        return new Block(0,"22/01/2020","Genesis block macoin","0");
    }
    getLatestBlock()
    {
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock)
    {
        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        //newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isValidChain()
    {
        for(var i = 1;i<this.chain.length;i++ )
        {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash())
            {
                return false;
            }
            if(currentBlock.previoushash !== previousBlock.hash)
            {
                return false;
            }
        }
        return true;
    }

}

var newCoin = new Blockchain();
console.log("Mining Block 1...");
newCoin.addBlock(new Block(1,"22/02/2020",{amount : 5}));
console.log("Mining Block 2...");
newCoin.addBlock(new Block(2,"23/02/2020",{amount : 15}));
console.log("Mining Block 3...");
newCoin.addBlock(new Block(3,"24/05/2020",{amount : 25}));
//console.log(JSON.stringify(newCoin,null,5));
console.log('is Valid chain ?'+newCoin.isValidChain());
//console.log("After Tempering in block 2");
//newCoin.chain[2].data = {amount : 100};
//console.log('is Valid chain ?'+newCoin.isValidChain());
