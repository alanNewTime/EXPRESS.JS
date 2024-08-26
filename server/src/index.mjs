import express from 'express'

const app = express(); //creato l'app express

const PORT = process.env.PORT || 3000 
// qui andiamo dentro un file "env" dove ci aspettiamo di trovare una variabile chiamata "PORT" con un valore,
// questo valore lo prendiamo me lo salviamo dentro una variabile "PORT" qui, e se il file env è vuoto, passiamo 3000 come valore al port

app.listen(PORT, () =>{
    console.log(`running on port ${PORT}`)
})