const pg = require('pg')
const express = require('express')
const client = new pg.Client('postgres://localhost/storestarter')
const app = express()


//"homepage"
app.get('/', (req, res, next) => {
        res.send("Store")
})


//pulling for ALL products
app.get('/api/products', async (req,res,next) => {

    try {
        const SQL = `
            SELECT * FROM products
        `
        const response = await client.query(SQL)
        console.log(response)
        res.send(response.rows)

    } catch (error) {
        next(error)
    }
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