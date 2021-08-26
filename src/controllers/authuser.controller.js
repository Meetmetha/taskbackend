const httpStatus = require('../../node_modules/http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, otpServices } = require('../services');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  if(req.headers.devicehash != undefined && (req.headers.devicetype != undefined)){
    const devicehash = req.headers.devicehash;
    const devicetype = req.headers.devicetype;
    const AuthData = await authService.createAuthData(req.body);
    const authtoken = await tokenService.generateUserToken(AuthData.id);
    await tokenService.addDeviceHandler(AuthData.id, authtoken, '1.1.1.1', devicehash, devicetype);
    res.status(httpStatus.CREATED).send({ AuthData, authtoken });
  }else{
    res.status(httpStatus.BAD_REQUEST).send({"message":"DeviceHash & DeviceType Not-supported"});
  }
});

const login = catchAsync(async (req, res) => {
  if(req.headers.devicehash != undefined && (req.headers.devicetype != undefined)){
    const { email, password } = req.body;
    const devicehash = req.headers.devicehash;
    const devicetype = req.headers.devicetype;
    const AuthData = await authService.loginAuthWithEmailAndPassword(email, password);
    const authtoken = await tokenService.generateUserToken(AuthData.id);
    await tokenService.addDeviceHandler(AuthData.id, authtoken, '1.1.1.1', devicehash, devicetype);
    res.send({ AuthData, authtoken });
  }else{
    res.status(httpStatus.BAD_REQUEST).send({"message":"DeviceHash & DeviceType Not-supported"});
  }
});

const logout = catchAsync(async (req, res) => {
  await tokenService.logoutdevice(req.body.authtoken);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
};
