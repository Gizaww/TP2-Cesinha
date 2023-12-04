const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())

const dotenv = require ('dotenv')


if(process.env.devouprod ==='dev'){
    dotenv.config({path: './config/.env.dev'})
}

if(process.env.devouprod ==='prod'){
    dotenv.config({path: './config/.env.prod'})
}



const modelodeUsuario = mongoose.model('contas', new mongoose.Schema({
    email: String,
    password: String
}))
mongoose.connect("mongodb://127.0.0.1:27017/newdeal")
.then(function(){

app.post('/get/', async (req,res)=>{
    const usuarioEncontrado = await modelodeUsuario.findOne({email: req.body.email, password: req.body.password})
    if(usuarioEncontrado ===null){
        return res.send("Essa conta não existe meu mano")
    }
    console.log(usuarioEncontrado);
    res.send(usuarioEncontrado)
})

app.post('/post',async (req,res) =>{
    const usuarioCriado = await modelodeUsuario.create({email: req.body.email, password: req.body.password})
    res.send(usuarioCriado)
})

app.post('/getmusic',async (req,res) =>{
    const museCriado = await modelodeUsuario.create({namemusic: req.body.namemusic, musicstyle: req.body.musicstyle})
    res.send(museCriado)
})

app.put('/put', async (req,res)=>{
    const usuarioAtualizado = await modelodeUsuario.findOneAndUpdate({email: req.body.email, password: req.body.password}, {email: req.body.newemail, password: req.body.newpassword})
    res.send(usuarioAtualizado)
})
  
app.put('/putmusic', async (req,res)=>{
    const museAtualizado = await modelodeUsuario.findOneAndUpdate({namemusic: req.body.music, musicstyle: req.body.musicstyle}, {namemusic: req.body.newnamemusic, musicstyle: req.body.newmusicstyle})
    res.send(museAtualizado)
})

app.delete('/delete', async (req,res)=>{
    const usuarioDeletado = await modelodeUsuario.deleteOne({email: req.body.email, password: req.body.password})
    res.send(usuarioDeletado)
})  

app.delete('/deletemusic', async (req,res)=>{
    const museDeletado = await modelodeUsuario.deleteOne({codemusic: req.body.music})
    res.send(museDeletado)
})  


app.use((req,res)=>{
    res.send('Não foi possível encontrar sua rota')
})

app.listen(3000, ()=>console.log(`O servidor ta rodando nessa porta aí meu fiel ${3000}`))

})

