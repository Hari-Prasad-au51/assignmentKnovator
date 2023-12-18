const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./Routes/authRoutes');
const PostData = require("./Routes/UserDataRoutes.js")
const app = express();


app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/konvator?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.5", {
  })
  .then(() => {
    console.log('connected to DB')
  })
  .catch((err) => {
    console.log(err.message)
  })

  require('./passport.js')(passport)
  app.use('/api/v1', authRoutes);
  app.use("/api/v1", PostData);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
