const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');

const fetchnews = catchAsync(async (req, res) => {
  const keyword = req.query.search;
  if(keyword == undefined){
    const resultNonKeyword = await taskService.fetchNewAPIResultNoKeyword();
    res.send(resultNonKeyword);
  }else{
    const resultKeyword = await taskService.fetchNewAPIResultKeyword(keyword);
    res.send(resultKeyword);
  }
});

const fetchweather = catchAsync(async (req, res) => {
  const city = req.query.city;
  if(city == undefined){
    const resultWeather = await taskService.fetchWeatherResult("Bengaluru");
    res.send(resultWeather);
  }else{
    const resultWeather = await taskService.fetchWeatherResult(city);
    res.send(resultWeather);
  }
});


module.exports = {
  fetchnews,
  fetchweather,
};
