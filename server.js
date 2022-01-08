import express from 'express'
import dotenv from 'dotenv'
import fetch from "node-fetch";

const app = express();
dotenv.config()

app.use(express.static("public"));
app.set("view engine", "ejs");

const token = process.env.TOKEN;
const baseUrl = 'https://api.github.com/search/issues?q=repo:bitcoin/bitcoin+is:pr+';
var results = {}

app.get("/", async function(req,res){
    await fetchResults()
    res.render("home", {results: results});

});

const labels = ["Tests", "P2P", "Mempool", "GUI", "Feature", "Mining", "Wallet"]
const state = ["open", "closed"]

async function fetchResults() {
    
    for(let i=0; i<labels.length; i++) {
        results[labels[i]+"_open"] = await fetchData(labels[i], state[0])
        results[labels[i]+"_closed"] = await fetchData(labels[i], state[1])
    }
    console.log(results)
    return results
}

async function fetchData(label, state) {
    var fetchedData = await fetch(`${baseUrl}state:${state}+label:${label}`, {
        headers: {
            'Authorization': 'token '  + token
        }
    })
    var formattedData = await fetchedData.json();
    var formattedData2 = await formattedData.total_count;

    return await formattedData2;
}

app.listen((process.env.PORT || 8080), () => console.log("server is listening"));