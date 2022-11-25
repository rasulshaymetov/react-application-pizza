import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
const FullPizza = () => {
  const { id } = useParams()
  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('https://6375ff1eb5f0e1eb85ff4f3c.mockapi.io/Pizzas/' + id)
        setData(data)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (

    <div className='container'>
      <img src={data.imageUrl} />
      <h2>{data.title}</h2>
      <h4>{data.price}</h4>
    </div>
  )
}

export default FullPizza