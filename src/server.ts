import express from "express";

const server = express()

server.get('/',(request, response)=>{
  return response.json({
    message: "Hello World",
    status: "Project setup ok"
  })
})
