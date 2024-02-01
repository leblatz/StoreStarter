import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

      const [products, setProducts] = useState([])

      useEffect(() => {
        const fetchProducts = async () =>{
          const {data} = await axios.get('http://localhost:3000/api/products/')
          //console.log(data)
          setProducts(data)
        }

        fetchProducts()
    
      }, [])
      
      const deleteProduct = async(oneProduct) =>{
        //console.log(product)
        try {
          const response = await axios.delete(`http://localhost:3000/api/products/${oneProduct.id}`)
          console.log(response)
          const newProducts = products.filter((product) => {
              return product.id !== oneProduct.id
          })
          setProducts(newProducts)

         } catch (error) {
          console.log((error))
        }
      }

  return (
   <div>

    <h1> My Store - {products.length}</h1>

    {
      products.map((product)=>{
        return(
          <div key={product.id}>
              {product.name}
              <button onClick={() => (deleteProduct(product))}>x</button>

          </div>
        )

      })

    }

   </div>
  )
}

export default App
