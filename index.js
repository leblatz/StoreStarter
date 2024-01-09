const pg = require('pg')
const express = require('express')
const client = new pg.Client('postgres://localhost/storestarter')
const app = express()
const cors = require('cors')

app.use(cors())


//"homepage"
app.get('/', (req, res, next) => {
        res.send("Store")
})


//pulling for ALL products
app.get('/api/products', async (req,res,next) => {

    try {
        const SQL = `
            SELECT * FROM products;
        `
        const response = await client.query(SQL)
        //console.log(response.rows)
        res.send(response.rows)
        //will only show after browser refresh


    } catch (error) {
        next(error)
    }
})


//DELETING A PRODUCT
app.delete('/api/products/:id', async(req,res,next) =>{
        try {
            const SQL= `
            DELETE FROM products WHERE id=$1
            `
            const response = await client.query(SQL, [req.params.id])
            //console.log(response)
            res.sendStatus(204)
        

        } catch (error) {
            next(error)
            
        }
})









//pulling for ONE product 
app.get('/api/products/:id', async (req,res,next) => {
    try {
        //console.log(req.params.id)
        //will only show params (established by the :) upon refresh
        
        const SQL = `
            SELECT * FROM products WHERE id = $1
        `

        const response = await client.query(SQL, [req.params.id])
        if(!response.rows.length){
            next()
        }else{
            
        res.send(response.rows[0])
    }
        
    } catch (error) {
        next(error)
        
    }
})

//ERROR HANDLER
app.use((error, req, res, next) => {
    res.send(error)
    res.status(500)
})


//unlinked url catchall
app.use('*', (req,res,next) =>{
    res.send("Sorry! No such route exists.")
})


const start = async () => {
    await client.connect()
    console.log("connection successful")

    const SQL = `
        DROP TABLE IF EXISTS products;
        CREATE TABLE products( 
            id SERIAL PRIMARY KEY,
            name VARCHAR(50)
        );
            INSERT INTO products(name) VALUES ('Eyeshadow Palette');
            INSERT INTO products(name) VALUES ('Makeup Brush');
            INSERT INTO products(name) VALUES ('Makeup Brush Set');
            INSERT INTO products(name) VALUES ('Perfume');
            INSERT INTO products(name) VALUES ('Cologne');
            INSERT INTO products(name) VALUES ('Blush');
            INSERT INTO products(name) VALUES ('Lipstick');
            INSERT INTO products(name) VALUES ('Foundation');
            INSERT INTO products(name) VALUES ('Powder');
            INSERT INTO products(name) VALUES ('Concealer');
            INSERT INTO products(name) VALUES ('Eyeliner');
            INSERT INTO products(name) VALUES ('Mascara');
    `

    await client.query(SQL)
    console.log("table created and seeded")

    const port = process.env.PORT || 3000


    app.listen(port, () =>{
        console.log(`server listening on port ${port}`)
    })

} 
start ()