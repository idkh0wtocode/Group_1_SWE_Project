import React from "react"
import { Form, InputGroup, Button } from "react-bootstrap"

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
	const handleSubmit = (e) => {
		e.preventDefault()
		if (onSearchSubmit) {
			onSearchSubmit()
		}
	}

	return (
		<Form onSubmit={handleSubmit} className="mb-4">
			<InputGroup size="lg">
				<Form.Control
					type="text"
					placeholder="Search products by name, description, or seller..."
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					aria-label="Search products"
				/>
				<Button variant="primary" type="submit">
					Search
				</Button>
			</InputGroup>
		</Form>
	)
}

export default SearchBar
