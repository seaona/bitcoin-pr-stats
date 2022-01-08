
window.onload = async function () {

    // Wallet
   fetchWallet()

    // Mining
    fetchMining()

    // Feature
    fetchFeature()

    // GUI
    fetchGui()

    // Mempool
    fetchMempool()

    // P2P
    fetchP2p()

    // Tests
    fetchTests()

}

async function fetchDataLabel(label, state) {
    let baseUrl = 'https://api.github.com/search/issues?q=repo:bitcoin/bitcoin+is:pr+';
    let username = process.env.USERNAME;
    let token = process.env.TOKEN;

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + token));

    var fetchedData = await fetch(`${baseUrl}state:${state}+label:${label}`, {method:'GET',headers: headers})
    var formattedData = await fetchedData.json();
    var formattedData2 = await formattedData.total_count;
    console.log(formattedData2)
    return await formattedData2;
} 

async function fetchTests() {
    var m = document.getElementById('tests-open');
    m.innerText = await fetchDataLabel("Tests", "open");
    var n = document.getElementById('tests-closed');
    n.innerText = await fetchDataLabel("Tests", "closed");
}

async function fetchP2p() {
    var k = document.getElementById('p2p-open');
    k.innerText = await fetchDataLabel("P2P", "open");
    var l = document.getElementById('p2p-closed');
    l.innerText = await fetchDataLabel("P2P", "closed");
}

async function fetchMempool() {
    var i = document.getElementById('mempool-open');
    i.innerText = await fetchDataLabel("Mempool", "open");
    var j = document.getElementById('mempool-closed');
    j.innerText = await fetchDataLabel("Mempool", "closed");
}

async function fetchGui() {
    var g = document.getElementById('gui-open');
    g.innerText = await fetchDataLabel("GUI", "open");
    var h = document.getElementById('gui-closed');
    h.innerText = await fetchDataLabel("GUI", "closed");
}

async function fetchFeature() {
    var e = document.getElementById('feature-open');
    e.innerText = await fetchDataLabel("Feature", "open");
    var f = document.getElementById('feature-closed');
    f.innerText = await fetchDataLabel("Feature", "closed");
}

async function fetchMining() {
    var c = document.getElementById('mining-open');
    c.innerText = await fetchDataLabel("Mining", "open");
    var d = document.getElementById('mining-closed');
    d.innerText = await fetchDataLabel("Mining", "closed");
}

async function fetchWallet() {
    var a = document.getElementById('wallet-open');
    a.innerText = await fetchDataLabel("Wallet", "open");
    var b = document.getElementById('wallet-closed');
    b.innerText = await fetchDataLabel("Wallet", "closed");
}