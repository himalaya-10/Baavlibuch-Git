var express= require('express')
const cors= require('cors')
const mongoconnect=require("./db")
mongoconnect()

const app=express()
app.use(cors())
const port = process.env.PORT || 8000


app.use(express.json())
app.use("/api",require("./routes/user.js"))
app.use("/api",require("./routes/connectlog.js"))
app.use('/',express.static('upload'))
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})