import express from 'express'

const app = express(); //creato l'app express

app.use(express.json()) //prima impostazione del middleware

const PORT = process.env.PORT || 3000 
// qui andiamo dentro un file "env" dove ci aspettiamo di trovare una variabile chiamata "PORT" con un valore,
// questo valore lo prendiamo me lo salviamo dentro una variabile "PORT" qui, e se il file env è vuoto, passiamo 3000 come valore al port

//equivalente del mio database,qui salvo i miei users
const mockUsers = [
    {id: 1, username:'andy', displayname:'Andy'},
    {id: 2, username:'alan', displayname:'Alan'},
    {id: 3, username:'debora', displayname:'Debora'}
]

//ROTTA dove faccio una chiamata di tipo get "request" contiene i miei dati mentre "response" mi da la possibilità di pushare dei dati
app.get("/", (request,response) =>{
    response.send("response manda dati") //quindi se attivo il server e vado su "localhost:3000" vedrò scritto il testo tra parentesi
    //response.send({msg: "messagio json"})
    //response.status(201).send({msg: "messagio json"})
})

//ALTRA ROTTA che creo dove se vai su "localhost:3000/api/users" vedrai un array degli oggetti che ho messo sotto
app.get('/api/users', (request, response)=>{
    console.log(request.query)
    const{query: {filter,value }} = request

  if(!filter && !value) return response.send(mockUsers)

    if(filter && value) return response.send(mockUsers.filter((user)=>user[filter].includes(value)))

    response.send(mockUsers)
})


//CRUD (POST REQUEST)
app.post('/api/users', (request, response)=>{
    console.log(request.body)
    //we add a new user to our array of user. NOTE we dont have a REAL database yet so this is a quick method
    const{body} = request
    const newUser = {id: mockUsers[mockUsers.length -1].id + 1, ...body }
    mockUsers.push(newUser)
    response.status(201).send(newUser) 
})


//creo una rotta in cui uso i parametri, in particola l'id
app.get('/api/users/:id', (request,response) => {
  //console.log(request.params) //  se scrivo "localholst:3000//api/users/:1" nel link e carico la pagina dove c'e il mio link mi compare "{ id: '1' }" nel terminale 
  const parsedId = parseInt(request.params.id)
  console.log(parsedId)// se scrivo "localholst:3000//api/users/:1" nel link e carico la pagina dove c'e il mio link mi compare "1" nel terminale

  if(isNaN(parsedId)) return response.status(400).send({ msg: 'Bad request. Invalid ID'}) // se nell'id metto qualcosa che non sia un numero

  //il pezzo sotto mi returna lo user che corrisponde all'id selezionato se cerco o sul browser o su postman
  const findUser = mockUsers.find((user)=> user.id === parsedId)
  if(!findUser) return response.sendStatus(404)
    return response.send(findUser)

})

//CRUD (PUT REQUEST)
app.put('/api/users/:id', (request, response)=>{
   
    const{body, params:{id},} = request
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) return response.sendStatus(400) //se l'id non è un numero diamo errore 400

    const findUserIndex = mockUsers.findIndex( (user) => user.id === parsedId)

    if(findUserIndex === -1) return response.sendStatus(400) 

    mockUsers[findUserIndex] = {id:parsedId, ...body}
    return response.sendStatus(200)
})


app.listen(PORT, () =>{
    console.log(`running on port ${PORT}`)
})