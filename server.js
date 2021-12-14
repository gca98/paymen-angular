function requireHTTPS(req,res,next){
    
    if(!req.secure && req.get('x-forwarded-proto') !== 'https'){
        return res.redirect('https://' + req.get('host')+req.url)
    }
    next();
}

const express = require('express')
const app = express()

app.use(requireHTTPS);
app.use(express.static('./dist/payment'))

app.get('/*',(req,res)=>
res.sendFile('index.html',{root: 'dist/payment'})
);

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`app is ready at http://localhost:${port}`)
})