import express from 'express'
const app = express();
import dotenv from 'dotenv'
dotenv.config()
const username = process.env.USERNAME;
const token = process.env.TOKEN;
import fetch from "node-fetch";
const baseUrl = 'https://api.github.com/search/issues?q=repo:bitcoin/bitcoin+is:pr+';
var results = {}

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async function(req,res){
    await fetchResults()
    res.render("home", {results: results});

});

const labels = ["Tests", "P2P", "Mempool", "GUI", "Feature", "Mining", "Wallet"]
const state = ["open", "closed"]

async function fetchResults() {
    
    for(let i=0; i<labels.length; i++) {
        results[labels[i]+"_open"] = await fetchData(labels[i], state[0], username, token)
        results[labels[i]+"_closed"] = await fetchData(labels[i], state[1], username, token)
    }
    console.log(results)
    return results
}

async function fetchData(label, state, username, token) {
    var fetchedData = await fetch(`${baseUrl}state:${state}+label:${label}`, {
        headers: {
            'Authorization': 'Basic '  + (username + ":" + token)
        }
    })
    var formattedData = await fetchedData.json();
    var formattedData2 = await formattedData.total_count;
    return await formattedData2;
}


app.listen((process.env.PORT || 8080), () => console.log("server is listening"));