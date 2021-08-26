const httpStatus = require('http-status');
const { Auth } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a AuthData
 * @param {Object} AuthBody
 * @returns {Promise<Auth>}
 */
const createAuthData = async (authBody) => {
  if (await Auth.isEmailTaken(authBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const auth = await Auth.create(authBody);
  return auth;
};

/**
 * Query for authusers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAuthData = async (filter, options) => {
  const authdata = await Auth.paginate(filter, options);
  return authdata;
};

/**
 * Get Auth by id
 * @param {ObjectId} id
 * @returns {Promise<Auth>}
 */
const getAuthById = async (id) => {
  return Auth.findOne({ _id: id });
};

/**
 * Get Auth by email
 * @param {string} email
 * @returns {Promise<Auth>}
 */
const getAuthByEmail = async (email) => {
  return Auth.findOne({ email });
};
/**
 * Update Auth by id
 * @param {ObjectId} AuthId
 * @param {Object} updateBody
 * @returns {Promise<Auth>}
 */
const updateAuthById = async (authId, updateBody) => {
  const auth = await getAuthById(authId);
  if (!auth) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Auth not found');
  }
  if (updateBody.email && (await Auth.isEmailTaken(updateBody.email, authId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(auth, updateBody);
  await auth.save();
  return auth;
};

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Auth>}
 */
 const loginAuthWithEmailAndPassword = async (email, password) => {
  const user = await getAuthByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};



module.exports = {
  createAuthData,
  queryAuthData,
  getAuthById,
  getAuthByEmail,
  updateAuthById,
  loginAuthWithEmailAndPassword,
};
