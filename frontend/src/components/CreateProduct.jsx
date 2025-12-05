import React from "react"
import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import api from "../api"

const CreateProduct = ({ onProductCreated }) => {
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
					// Clear form fields after submission
					setName("")
					setDescription("")
					setPrice("")
					setQuantity("")
					setCategory("")
					setSeller("")
					// Call the callback to refresh products
					if (onProductCreated) {
						onProductCreated()
					}
				} else {
					alert("Failed to create product.")
				}
			})
			.catch((err) => alert(err.response.data)) // Show specific backend error
	}

	return (
		<Form onSubmit={createProduct}>
			<Form.Group className="mb-3" controlId="productName">
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter product name"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="productDescription">
				<Form.Label>Description</Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					placeholder="Enter product description"
					required
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="productPrice">
				<Form.Label>Price</Form.Label>
				<Form.Control
					type="number"
					step="0.01"
					placeholder="0.00"
					required
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="productQuantity">
				<Form.Label>Quantity</Form.Label>
				<Form.Control
					type="number"
					placeholder="0"
					required
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="productCategory">
				<Form.Label>Category</Form.Label>
				<Form.Select
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
				</Form.Select>
			</Form.Group>

			<Button variant="primary" type="submit" className="w-100">
				Create Product
			</Button>
		</Form>
	)
}

export default CreateProduct
