const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, handleError } = require("./middlewares/errorHandler");

const userRouter = require("./routes/userRoutes");
const tutCatRouter = require("./routes/tutCatRoutes");
const tutorialRouter = require("./routes/tutorialRoutes");
const {newsLetterRouter} = require("./routes/newsLetterRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const contactRouter = require("./routes/contactRoutes");
const videoRouter = require("./routes/videoRoutes");
const videoCatRouter = require("./routes/videoCatRoutes");
const docRouter = require("./routes/docRoutes");
const docCatRouter = require("./routes/docCatRoutes");
const blogRouter = require("./routes/blogRoutes");
const blogCatRouter = require("./routes/blogCatRoutes");
const courseCatRouter = require("./routes/courseCatRoutes");

const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const googleRouter = require("./routes/googleRoutes");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
//const passportSetup = require("./utils/passport");

dbConnect();

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "mysecret",
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 12 * 60 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.get("/", (req, res) => {
  res.send(`<a href="http://0.0.0.0:4000/google">login With Google</a>`);
});

app.use("/api/user", userRouter);
//app.use("/", googleRouter);
app.use("/api/tutorial/category", tutCatRouter);
app.use("/api/tutorial", tutorialRouter);
app.use("/api/newsletter", newsLetterRouter);
app.use("/api/review", reviewRouter);
app.use("/api/contact", contactRouter);
app.use("/api/video", videoRouter);
app.use("/api/video/category", videoCatRouter);
app.use("/api/doc", docRouter);
app.use("/api/doc/category", docCatRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blog/category", blogCatRouter);
app.use("/api/course/category", courseCatRouter);

app.use(notFound);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
