import React from "react"
import api from "../api"

const Cart = () => {
    // recieve cart infromation
    // add to the datbase.
    // get the price
    // dynamically 
    const createProduct = (e) => {
		e.preventDefault()
		const productData = {
			name,
			description,
			price: parseFloat(price), // Convert price string to a float
			quantity: parseInt(quantity, 10), // Convert quantity string to an integer
			category: parseInt(category, 10), // Convert category ID string to an integer
		}

		api.post("/api/products/", productData)
			.then((res) => {
				if (res.status === 201) {
					alert("Product Created!")
					// Refresh products only after successful creation
					getProducts()
				} else {
					alert("Failed to create product.")
				}
				// Clear form fields after submission
				setName("")
				setDescription("")
				setPrice("")
				setQuantity("")
				setCategory("")
				setSeller("")
			})
			.catch((err) => alert(err.response.data)) // Show specific backend error
	}

	return <div>Cart</div>
}

export default Cart
