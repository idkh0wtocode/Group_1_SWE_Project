// import { useState, useEffect } from "react"
// import api from "../api"

// function Home() {
// 	const [products, setProducts] = useState([])
// 	const [categories, setCategories] = useState([])

// 	const [name, setName] = useState("")
// 	const [description, setDescription] = useState("")
// 	const [price, setPrice] = useState(0)
// 	const [quantity, setQuantity] = useState(0)
// 	const [category, setCategory] = useState("")

// 	useEffect(() => {
// 		getProducts()
// 		getCategories()
// 	}, [])

// 	const getProducts = () => {
// 		api.get("api/products/") // gets information from this url
// 			.then((res) => res.data) // gets data
// 			.then((data) => {
// 				setProducts(data)
// 				console.log(data) // logs it to the console (fn + F12)
// 			}) // assigns setProducts to the data
// 			.catch((err) => alert(err))
// 	}

// 	const getCategories = () => {
// 		api.get("/api/categories/")
// 			.then((res) => setCategories(res.data))
// 			.catch((err) => alert(err))
// 	}

// 	const deleteProduct = (id) => {
// 		api.delete(`/api/products/${id}/`)
// 			.then((res) => {
// 				if (res.status === 204) {
// 					alert("Product Deleted!")
// 					getProducts()
// 				} else {
// 					alert("Failed to delete product.")
// 				}
// 			})
// 			.catch((error) => alert(error))
// 	}

// 	const createProduct = (e) => {
// 		e.preventDefault()
// 		const productData = {
// 			name,
// 			description,
// 			price: parseFloat(price), // Convert price string to a float
// 			quantity: parseInt(quantity, 10), // Convert quantity string to an integer
// 			category: parseInt(category, 10), // Convert category ID string to an integer
// 		}

// 		api.post("/api/products/", productData)
// 			.then((res) => {
// 				if (res.status === 201) {
// 					alert("Product Created!")
// 					// Refresh products only after successful creation
// 					getProducts()
// 				} else {
// 					alert("Failed to create product.")
// 				}
// 				// Clear form fields after submission
// 				setName("")
// 				setDescription("")
// 				setPrice("")
// 				setQuantity("")
// 				setCategory("")
// 			})
// 			.catch((err) => alert(err.response.data)) // Show specific backend error
// 	}

// 	return (
// 		<div>
// 			<h2>Create a New Product</h2>
// 			<form onSubmit={createProduct}>
// 				<label htmlFor="name">Name:</label>
// 				<br />
// 				<input
// 					type="text"
// 					id="name"
// 					name="name"
// 					required
// 					onChange={(e) => setName(e.target.value)}
// 					value={name}
// 				/>
// 				<br />
// 				<label htmlFor="description">Description:</label>
// 				<br />
// 				<textarea
// 					id="description"
// 					name="description"
// 					required
// 					value={description}
// 					onChange={(e) => setDescription(e.target.value)}
// 				></textarea>
// 				<br />
// 				<label htmlFor="price">Price:</label>
// 				<br />
// 				<input
// 					type="number"
// 					id="price"
// 					name="price"
// 					required
// 					value={price}
// 					onChange={(e) => setPrice(e.target.value)}
// 				/>
// 				<br />
// 				<label htmlFor="quantity">Quantity:</label>
// 				<br />
// 				<input
// 					type="number"
// 					id="quantity"
// 					name="quantity"
// 					required
// 					value={quantity}
// 					onChange={(e) => setQuantity(e.target.value)}
// 				/>
// 				<br />

// 				<label htmlFor="category">Category:</label>
// 				<br />
// 				<select
// 					id="category"
// 					name="category"
// 					required
// 					value={category}
// 					onChange={(e) => setCategory(e.target.value)}
// 				>
// 					<option value="" disabled>
// 						Select a category
// 					</option>
// 					{categories.map((cat) => (
// 						<option key={cat.id} value={cat.id}>
// 							{cat.category_name}
// 						</option>
// 					))}
// 				</select>
// 				<br />
// 				<br />
// 				<input type="submit" value="Submit"></input>
// 			</form>

// 			<div>
// 				<h2>Your Products</h2>
// 				{products.map((product) => (
// 					<div key={product.id}>
// 						<h4>{product.name}</h4>
// 						<p>{product.description}</p>
// 						<p>Price: ${product.price}</p>
// 						<p>Quantity: {product.quantity}</p>
// 						<button onClick={() => deleteProduct(product.id)}>
// 							Delete
// 						</button>
// 						<hr />
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	)
// }

// export default Home
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React from "react"
import { useEffect, useState } from "react"
import ProductList from "../components/ProductList"
import api from "../api"

const Home = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		// Fetch products from Django backend
		const fetchProducts = async () => {
			const productsRes = await api.get("/api/products/custom/all/")
			setProducts(productsRes.data)
		}

		// fetch("http://127.0.0.1:8000/api/products/custom/all/", {
		// 	method: "GET",
		// 	credentials: "omit",
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		console.log("Fetched products:", data)
		// 		setProducts(data)
		// 	})
		fetchProducts()
	}, [])

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Marketplace</h1>
			<ProductList products={products} />
		</div>
	)
}

export default Home
