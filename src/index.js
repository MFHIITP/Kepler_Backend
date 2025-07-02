import express from "express";
import cors from "cors";
import apiroute from "./routers/query.route.js";
import userrouter from "./routers/users.routes.js";
import talkrouter from "./routers/talk.route.js";
import libraryrouter from './routers/library.route.js';
import dotenv from "dotenv";
import loginaction from "./controllers/login.controller.js";
import connect from "./utils/connection.utils.js";
import { collection } from "./models/collection.model.js";
import devrouter from "./routers/teams/devteam.route.js"
import contentrouter from './routers/teams/contentteam.route.js'
import executiverouter from './routers/teams/executiveteam.route.js'
import prrouter from './routers/teams/prteam.route.js'
import numberrouter from './routers/number.route.js'
import treasuryrouter from './routers/teams/treasury.route.js'
import corerouter from './routers/teams/coreteam.route.js'
import removetoken from "./controllers/logout.controller.js";
import liveuser from "./controllers/extras/LiveUser.controller.js";
import historyuser from "./controllers/extras/Historyuser.controller.js"
import updatelogouthistory from "./utils/nodecron.js";
import webSocketControl from "./utils/Websocket.utils.js";
import cookieParser from 'cookie-parser';
import loginrouter from './routers/login.route.js';
import passport from 'passport'
import paymentRouter from './routers/paymentRoutes.js'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import {rateLimit} from 'express-rate-limit'
import logger from "./utils/winston_logger.js";
import checkAccessToken from "./auths/checkAccessTokens.js";
import refreshAuthRouter from "./routers/authRefresh.route.js"
import razorpayRouter from "./routers/razorpay.route.js"
import Razorpay from "razorpay";

dotenv.config();
const app = express();

app.set('trust proxy', 1);

app.use(cors({ 
  origin: ['https://kepler-22b.vercel.app', 'http://localhost:3001', 'https://8ppzcvlk-3001.inc1.devtunnels.ms'], 
  credentials: true 
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
    max: 1000,
    message: {
      status: 429,
      error: "Rate limit exceeded",
      retryAfter: "Try again in a few minutes.",
    },
    handler: (req, res) => {
      res.status(429).json({
        error:
          "Rate Limit Exceeded from this client. Please try after some time",
      });
    },
    legacyHeaders: false,
}))
app.use(cookieParser());
app.use(express.json());
app.set("view-engine", "html"); 

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
export const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;
const frontendUrl = process.env.FRONTEND_URL
const port = process.env.PORT || 8000;
const hostname = "0.0.0.0";
export const otpStore = [];
connect();
updatelogouthistory();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || `https://8ppzcvlk-8000.inc1.devtunnels.ms/auth/google/callback`
  },
  (accessToken, refreshToken, profile, done) => { 
    console.log(profile)
    const userInfo = {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value,
    };
    return done(null, { accessToken, userInfo });
  }
));

export const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_SECRET
})

app.use(passport.initialize());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const token = req.user.accessToken;
    const userInfo = req.user.userInfo
    res.redirect(`${frontendUrl}/authlogin/${req.user.userInfo.email}`)
  }
);
app.use("/authRefreshToken", refreshAuthRouter);

app.use("/login", loginrouter);
app.use("/users", userrouter); 
app.use("/api", apiroute);
app.post("/logout", removetoken)

// Protected Routes
app.use(checkAccessToken)
app.get("/liveusers", liveuser)
app.get("/historyusers", historyuser);
app.use("/talks", talkrouter);
app.use('/library', libraryrouter);
app.use('/devteam', devrouter)
app.use('/contentteam', contentrouter);
app.use('/executiveteam', executiverouter);
app.use('/prteam', prrouter);
app.use('/treasuryteam', treasuryrouter);
app.use('/coreteam', corerouter);
app.use('/number', numberrouter)
app.use('/payment', paymentRouter)
app.use('/razorpay', razorpayRouter);

app.post("/removeprofile", async (req, res) => {
  const mail = await collection.deleteOne({ email: req.body.email });
  res.status(200).send("Deleted");
});

export const httpserver = app.listen(port, hostname, () => {
  logger.info(`Server Started Successfully at http://${hostname}/${port}`)
  console.log(`http://${hostname}:${port}`);
});

webSocketControl();
