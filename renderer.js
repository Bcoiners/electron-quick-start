// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var bcoin = require('bcoin');

var node = bcoin.fullnode({
  network: 'simnet',
  nodes: ['10.7.64.53', 'redsquad.dev.purse.io'],
  db: 'memory'
});

async function main() {
  await node.open();

  await node.connect();

  node.on('connect', function(entry, block) {
    console.log('%s (%d) added to chain.', entry.rhash(), entry.height);
    console.log(entry);
    console.log(block);
  });

  node.on('tx', function(tx) {
    console.log('%s added to mempool.', tx.txid());
  });

  node.startSync();
}

main();
