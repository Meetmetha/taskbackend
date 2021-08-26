const ApiError = require('../utils/ApiError');
const NewsAPI = require('newsapi');
const config = require('../config/config');
const axios = require('axios');
/*
    A) Using Axios
    apiUrl = "https://newsapi.org/v2/everything?q=" + keyword +"&apiKey=" + config.newsapikey;
    const result = await axios.get(apiUrl);
    return (result);

    B)Using Library https://newsapi.org/docs/client-libraries/node-js
    Used below

*/

const fetchNewAPIResultNoKeyword = async () => {
    const newsapi = new NewsAPI(config.newsapikey);
    const result = await newsapi.v2.topHeadlines({
        language: 'en',
      });
      return result;

};

const fetchNewAPIResultKeyword = async (keyword) => {
    const newsapi = new NewsAPI(config.newsapikey);
    const result = await newsapi.v2.everything({
        q: keyword,
        language: 'en',
      });
      return result;
};

const fetchWeatherResult = async (cityname) => {
    apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=" + config.weatherapi;
    const result = await axios.get(apiUrl);
    return result.data;
};


module.exports = {
    fetchNewAPIResultNoKeyword,
    fetchNewAPIResultKeyword,
    fetchWeatherResult,
};
