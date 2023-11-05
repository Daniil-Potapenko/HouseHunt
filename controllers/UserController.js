import UserModel from '../models/User.js';
import 'dotenv/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registration = async (req, res) => {
  try {
    const hash = bcrypt.hash(req.body.password, Number(process.env.BCRYPT_SALT_ROUNDS));
    const user = new UserModel({
      'fullName': req.body.fullName,
      'email': req.body.email,
      'passwordHash': await hash,
    });

    user.save().then(async () => {
      res.status(200).json({
        'success': 'true',
      });
    }).catch((e) => {
      res.status(500).json({
        'success': 'false',
        'message': 'registration error, pls try later',
      });
      console.log(e);
    });
  } catch (e) {
    res.status(500).json({
      'success': 'false',
      'message': 'registration error, pls try later',
    });
    console.log(e);
  }
};


export const login = async (req, res) => {
/**
 * Generate "exp" timestamp for jwt
 * @param {number} liveTimeInHours - Time in hours which token will be valid from current date.
 * @return {number} tokenLiveTime -  Timestamp.
 */
  function getTokenTimeToLive(liveTimeInHours) {
    const curentTimestamp = Date.now()/1000;
    const tokenLiveTime = Math.round(curentTimestamp + liveTimeInHours*(60*60));
    return tokenLiveTime;
  }

  try {
    const user = await UserModel.findOne({'email': req.body.email});

    if (!user) {
      res.status(400).json({'message': 'Auth error, incorrect data'});
    }

    const passwordIsCorrect = await bcrypt.compare(req.body.password, user.passwordHash);

    if (passwordIsCorrect) {
      const refreshToken = jwt.sign({
        'uid': `${user._id}`,
        'exp': getTokenTimeToLive(3),
      }, process.env.JWT_PRIVATE_KEY);

      res.status(200).json({
        'success': 'true',
        'refreshToken': `${refreshToken}`,
      });
    } else {
      res.status(400).json({'message': 'Auth error, incorrect data'});
    }
  } catch (e) {
    res.status(500).json({
      'success': 'false',
      'message': 'Server error, pls try later',
    });
    console.log(e);
  }
};


export const checkAuth = async (req, res, next) => {
/**
 * Try to find and return token from request (query/cookies/headers)
 * @param {any} req - Users request.
 * @return {any} - Return null or token(if exist).
 */
  function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  }

  try {
    const refreshToken = getToken(req);
    const decoded = jwt.verify(refreshToken, process.env.JWT_PRIVATE_KEY);
    const user = await UserModel.findOne({'_id': `${decoded.uid}`});

    if (refreshToken && decoded && user) {
      next();
    }
  } catch (e) {
    res.status(401).json({
      'success': 'false',
      'message': 'Access Denied',
    });
    console.log(e);
  }
};

