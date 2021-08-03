import "dotenv/config"
import express from "express";

const server = express()

server.use(express.json())

server.get('/',(request, response)=>{
  return response.json({
    message: "Hello World",
    status: "Project setup ok"
  })
})

server.listen(process.env.EXPRESS_PORT, ()=> {
  console.info(`Server is running on port ${process.env.EXPRESS_PORT}`)
})
