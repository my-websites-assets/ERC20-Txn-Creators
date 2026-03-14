const { ethers } = require("ethers");

//////////////////////////////////////
// CONFIGURATION (EDIT THESE VALUES)
//////////////////////////////////////

const CONFIG = {

    // -------------------------------------- Static Values --------------------------------------
    // ERC20 configuration
    TOKEN_CONTRACT: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    TOKEN_DECIMALS: 18,
    GAS_LIMIT: 70000,

    // network
    CHAIN_ID: 1,                 // 1 = Ethereum mainnet

    // recipient
    TO_ADDRESS: "",
    // -------------------------------------- End of Static Values --------------------------------------

    // -------------------------------------- Dynamic Values --------------------------------------
    // signing key
    PRIVATE_KEY: "",
    
    // transaction info
    TOKEN_AMOUNT: "",
    NONCE: ,
    GAS_PRICE_GWEI: "",
    // -------------------------------------- End of Dynamic Values --------------------------------------
};

//////////////////////////////////////
// SCRIPT
//////////////////////////////////////

async function createTransaction() {

    const wallet = new ethers.Wallet(CONFIG.PRIVATE_KEY);

    let data;

    const iface = new ethers.Interface([
            "function transfer(address to, uint256 amount)"
        ]);

    const amount = ethers.parseUnits(
            CONFIG.TOKEN_AMOUNT,
            CONFIG.TOKEN_DECIMALS
        );

    data = iface.encodeFunctionData(
            "transfer",
            [CONFIG.TO_ADDRESS, amount]
        );

    const tx = {
        type: 0, // legacy transaction

        to: CONFIG.TOKEN_CONTRACT,
        value: 0,
        data: data,

        nonce: CONFIG.NONCE,
        gasLimit: CONFIG.GAS_LIMIT,
        gasPrice: ethers.parseUnits(CONFIG.GAS_PRICE_GWEI, "gwei"),

        chainId: CONFIG.CHAIN_ID
    };

    const signedTx = await wallet.signTransaction(tx);

    console.log("Signed legacy transaction:");
    console.log(signedTx);
}

createTransaction();
