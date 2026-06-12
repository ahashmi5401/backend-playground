//custom middle ware for example 
//if i not use next the whole page of postman rsponse panel stuck in loading 


//if you dont use next()
//No next() → it doesn’t go to the next middleware or route
//No res.send() → it doesn’t respond to the client


export const addInfo = (req , res , next ) => {
        req.myData = "Hello from middleware";
        //Then it calls next() so Express continues to the next step
    next();

}