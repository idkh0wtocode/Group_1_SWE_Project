import React from "react"
import { useEffect, useState } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import ProductList from "../components/ProductList"
import CreateProduct from "../components/CreateProduct"
import api from "../api"

const Account = () => {
	const [products, setProducts] = useState([])
	const [seller, setSeller] = useState("")

	// get current seller user name -> finde user name -> get id
	// get id from current user

	useEffect(() => {
		fetchSellerData()
	}, [])

	const fetchSellerData = async () => {
		try {
			// fetch current seller
			const sellerRes = await api.get("/api/users/custom/current/")
			setSeller(sellerRes.data)
			console.log("Fetched seller data:", sellerRes.data)
			// fetch products using the seller ID from sellerData
			const productsRes = await api.get(
				`/api/users/custom/${sellerRes.data.id}/products/`
			)

			setProducts(productsRes.data)
			console.log("Fetched products data:", productsRes.data)
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	}

	return (
		<Container className="py-4">
			<Row>
				<Col md={8}>
					<h1 className="mb-4">My Products</h1>
					{products.length === 0 ? (
						<Card className="mb-3">
							<Card.Body>
								<Card.Text className="text-muted">
									You haven't created any products yet. Use
									the form on the right to create your first
									product.
								</Card.Text>
							</Card.Body>
						</Card>
					) : (
						<ProductList
							products={products}
							showActions={true}
							onProductDeleted={fetchSellerData}
						/>
					)}
				</Col>

				<Col md={4}>
					<Card className="sticky-top" style={{ top: "20px" }}>
						<Card.Body>
							<Card.Title className="mb-3">
								Create New Product
							</Card.Title>
							<CreateProduct onProductCreated={fetchSellerData} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default Account
