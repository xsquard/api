import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bip39 = require('bip39')
const solanaWeb3 = require('@solana/web3.js');
const { derivePath } = require('ed25519-hd-key')
const nacl = require('tweetnacl');
const HDWallet = require('ethereum-hdwallet')
const express = require('express');
const app = express();
const port = 3000;

app.get('/helloworld', (req, res) => {
const mnemonic = bip39.generateMnemonic()
const hdwallet= HDWallet.fromMnemonic(mnemonic)
const x = derivePath("m/44'/501'/0'/0'", bip39.mnemonicToSeedSync(mnemonic)).key;
const pk = nacl.sign.keyPair.fromSeed(x).secretKey;
const acc = new solanaWeb3.Account(pk);
const bsc = `0x${hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`;
const sol = acc.publicKey.toBase58();
const string = `{
	"mnemonic": "${mnemonic}",
	"bsc": "${bsc}", 
	"sol": "${sol}"
}`;
res.send(JSON.parse(string))  
  
  
});

app.listen(port, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});
