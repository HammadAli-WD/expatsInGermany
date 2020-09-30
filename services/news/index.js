const router = require("express").Router();
const fetch = require("node-fetch")

router.get('/hackerNews', async (req, res, next) => {
    
    try {
      const response = await fetch(`https://${process.env.HACKER_NEWS_URL}/v0/topstories.json`);
      if (response.ok === false) {
        throw new Error("Response Error:" + response.text);
      }
      const json = await response.json();
      const promises = json
        .slice(0, 10)
        .map(id =>
          fetch(`https://${process.env.HACKER_NEWS_URL}/v0/item/${id}.json`).then(
            response => response.json()
          )
        );
      const result = await Promise.all(promises);
      res.send(result);
    } catch (err) {
      console.error(err);
    }
   })

router.get('/headlines', (req, res, next) => {
    try {
        fetch(`https://${process.env.RAPID_API_HOST}/news/trendingtopics?textFormat=Raw&safeSearch=Off`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": process.env.RAPID_API_HOST,
                "x-rapidapi-key": process.env.RAPID_API_KEY,
                "x-bingapis-sdk": "true"
            }})
        .then(response =>response.json())
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err);
        });
       } catch (error) {
           
       }
   })

   

module.exports = router