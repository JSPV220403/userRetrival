const express= require("express")
const userroutes= require("./versions/v1/routes")
const app= express()

app.use('/uploads', express.static('uploads'));
app.use("/users", userroutes)


app.listen(8080, ()=> console.log("server is started and running on 8080"))