// export default function ProductList() {
// 	const [products, setProducts] = useState([])
// 	const [loading, setLoading] = useState(true)
// 	const [error, setError] = useState(null)

// 	useEffect(() => {
// 		const fetchProducts = async () => {
// 			try {
// 				const accessToken = localStorage.getItem("ACCESS_TOKEN")
// 				if (!accessToken) {
// 					setError("Not authorized")
// 					setLoading(false)
// 					return
// 				}

// 				const res = await fetch("http://127.0.0.1:8000/api/products/", {
// 					headers: {
// 						Authorization: `Bearer ${accessToken}`,
// 					},
// 				})

// 				if (!res.ok) {
// 					throw new Error(`Failed to fetch products: ${res.status}`)
// 				}

// 				const data = await res.json()
// 				setProducts(data)
// 			} catch (err) {
// 				console.error(err)
// 				setError("Failed to load products")
// 			} finally {
// 				setLoading(false)
// 			}
// 		}

// 		fetchProducts()
// 	}, [])

// 	if (loading) return <p>Loading products...</p>
// 	if (error) return <p>{error}</p>

// 	return (
// 		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// 			{Array.isArray(products) && products.length > 0 ? (
// 				products.map((product) => (
// 					<ProductCard key={product.id} product={product} />
// 				))
// 			) : (
// 				<p>No products found.</p>
// 			)}
// 		</div>
// 	)
// }

//////////////////////
import { useState, useEffect } from "react"
import api from "../api"
import ProductCard from "./ProductCard"
import AddToCartButton from "./AddToCartButton"
// import Button from "react-bootstrap/Button"
// import Card from "react-bootstrap/Card"
import { Card, Button, Row, Col } from "react-bootstrap"

function ProductList({
	products: products_i = [],
	showActions = false,
	onProductDeleted,
}) {
	const [products, setProducts] = useState(products_i)
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
	useEffect(() => {
		setProducts(products_i)
	}, [products_i])

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
			.then((res) => setCategories(res.data))
			.catch((err) => alert(err))
	}

	const deleteProduct = (id) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			api.delete(`/api/products/${id}/`)
				.then((res) => {
					if (res.status === 204) {
						alert("Product Deleted!")
						// Remove product from local state
						setProducts(products.filter((p) => p.id !== id))
						// Call callback if provided
						if (onProductDeleted) {
							onProductDeleted()
						}
					} else {
						alert("Failed to delete product.")
					}
				})
				.catch((error) => {
					console.error("Delete error:", error)
					alert(
						error.response?.data?.detail ||
							"Failed to delete product."
					)
				})
		}
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
			{/* <h2>Create a New Product</h2>
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
			</form> */}
			<hr />

			{/* <div>
				<h2>Your Products</h2>
				{products.map((product) => (
					<div key={product.id}>
						<h4>{product.name}</h4>
						<p>{product.description}</p>
						<p>Price: ${product.price}</p>
						<p>Quantity: {product.quantity}</p>
						<button onClick={() => deleteProduct(product.id)}>
							Delete
						</button>
						<hr />
					</div>
				))}
			</div> */}

			<Row className="g-3">
				{" "}
				{/* g-3 adds spacing (gutters) */}
				{products.map((product) => (
					<Col key={product.id} xs={12} sm={6} md={4} lg={3}>
						<Card>
							<Card.Img variant="top" src="holder.js/100px180" />
							<Card.Body>
								<Card.Title>{product.name}</Card.Title>
								<Card.Text>{product.description}</Card.Text>
								<p className="mb-1">
									<strong>Price:</strong> ${product.price}
								</p>
								<p className="mb-1">
									<strong>Quantity:</strong>{" "}
									{product.quantity}
								</p>
								<p className="mb-3">
									<strong>Seller:</strong>{" "}
									{product.seller?.username}
								</p>

								{!showActions ? (
									<div className="d-flex gap-2">
										<AddToCartButton
											productId={product.id}
											productName={product.name}
										/>
										<Button 
											variant="primary" 
											size="sm"
											onClick={async () => {
												const getUserId = await api.get("/api/users/custom/current/");
												const userId = getUserId.data.username;
												const sellerId = product.seller.username;
												window.location.href = `http://localhost:5000/?sender=${encodeURIComponent(userId)}&receiver=${encodeURIComponent(sellerId)}`;
											}}
										>
											Message
										</Button>
									</div>
								) : (
									<div className="mt-3">
										<Button
											variant="danger"
											size="sm"
											onClick={() =>
												deleteProduct(product.id)
											}
										>
											Delete
										</Button>
									</div>
								)}
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	)
}

export default ProductList
