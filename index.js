require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const Fitness = require("./emailmodel");
const app = express()

//middlewares
app.use(express.json())

app.use((req , res , next) => { 
    console.log(req.path, req.method , req.body)     
    next()
})


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT || 3000, () => { console.log("Server is running at " + process.env.PORT )})
 })
  .catch(error => console.log(error))


  
  app.post("/addme", async (req, res) => {
   
    const newEmail = new Fitness({  email: req.body.email  });

      try {
         await newEmail.save();
        res.status(200).json({"msg" : "Email saved."});
      } catch(error) {
        res.status(400).json({"error" : "Email not saved."});
      }
  })