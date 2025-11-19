import React from "react"
import { Card, Button } from "react-bootstrap"

const ProductCard = () => {
	return (
		<Card style={{ width: "18rem", marginBottom: "1rem" }}>
			<Card.Body>
				<Card.Title>{product.name}</Card.Title>
				<Card.Text>{product.description}</Card.Text>
				<p>Price: ${product.price}</p>
				<p>Quantity: {product.quantity}</p>
				<Button
					variant="danger"
					onClick={() => deleteProduct(product.id)}
				>
					Delete
				</Button>
			</Card.Body>
		</Card>
	)
}

export default ProductCard
