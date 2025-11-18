import React from "react"
import { useEffect, useState } from "react"
import api from "../api"

const CreateProduct = () => {
	const [products, setProducts] = useState()
	const [categories, setCategories] = useState([])

	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState(0)
	const [quantity, setQuantity] = useState(0)
	const [category, setCategory] = useState("")
	const [seller, setSeller] = useState("")

	useEffect(() => {
		getCategories()
	}, [])

	// const getProducts = () => {
	// 	api.get("api/products/") // gets information from this url
	// 		.then((res) => res.data) // gets data
	// 		.then((data) => {
	// 			setProducts(data)
	// 			console.log(data) // logs it to the console (fn + F12)
	// 		}) // assigns setProducts to the data
	// 		.catch((err) => alert(err))
	// }
	const getCategories = () => {
		api.get("/api/categories/")
			.then((res) => res.data)
			.then((data) => {
				setCategories(data)
				console.log(data)
			})
			.catch((err) => alert(err))
	}

	// const getCategories = () => {
	// 	api.get("/api/categories/")
	// 		.then((res) => setCategories(res.data))
	// 		.catch((err) => alert(err))
	// }

	const deleteProduct = (id) => {
		api.delete(`/api/products/${id}/`)
			.then((res) => {
				if (res.status === 204) {
					alert("Product Deleted!")
					getProducts()
				} else {
					alert("Failed to delete product.")
				}
			})
			.catch((error) => alert(error))
	}

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

	return (
		<div>
			<h2>Create a New Product</h2>
			<form onSubmit={createProduct}>
				<label htmlFor="name">Name:</label>
				<br />
				<input
					type="text"
					id="name"
					name="name"
					required
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<br />
				<label htmlFor="description">Description:</label>
				<br />
				<textarea
					id="description"
					name="description"
					required
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				<br />
				<label htmlFor="price">Price:</label>
				<br />
				<input
					type="number"
					id="price"
					name="price"
					required
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<br />
				<label htmlFor="quantity">Quantity:</label>
				<br />
				<input
					type="number"
					id="quantity"
					name="quantity"
					required
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
				<br />

				<label htmlFor="category">Category:</label>
				<br />
				<select
					id="category"
					name="category"
					required
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value="" disabled>
						Select a category
					</option>
					{categories.map((cat) => (
						<option key={cat.id} value={cat.id}>
							{cat.category_name}
						</option>
					))}
				</select>
				<br />
				<br />
				<input type="submit" value="Submit"></input>
			</form>
		</div>
	)
}

export default CreateProduct
