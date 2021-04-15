const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger("dev"));
app.use(express.static("public")); 

app.use(require("./routes/html-routes.js"));
app.use(require("./routes/api-routes.js"));
// const htmlRoutes = require("./routes/html-routes");
// const apiRoutes = require("./routes/api-routes");


//connecting to mongodb atlas
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
});
   
//module.exports = db;
