import express from 'express'

const app = express(); //creato l'app express

const PORT = process.env.PORT || 3000 
// qui andiamo dentro un file "env" dove ci aspettiamo di trovare una variabile chiamata "PORT" con un valore,
// questo valore lo prendiamo me lo salviamo dentro una variabile "PORT" qui, e se il file env è vuoto, passiamo 3000 come valore al port


//ROTTA dove faccio una chiamata di tipo get "request" contiene i miei dati mentre "response" mi da la possibilità di pushare dei dati
app.get("/", (request,response) =>{
    response.send("response manda dati") //quindi se attivo il server e vado su "localhost:3000" vedrò scritto il testo tra parentesi
    //response.send({msg: "messagio json"})
    //response.status(201).send({msg: "messagio json"})
})

//ALTRA ROTTA che creo dove se vai su "localhost:3000/api/users" vedrai un array degli oggetti che ho messo sotto
app.get('/api/users', (request, response)=>{
    response.send([
        {id: 1, username:'andy', displayname:'Andy'},
        {id: 2, username:'alan', displayname:'Alan'},
        {id: 2, username:'debora', displayname:'Debora'}
    ])
})

app.listen(PORT, () =>{
    console.log(`running on port ${PORT}`)
})