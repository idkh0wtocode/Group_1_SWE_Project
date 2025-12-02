import { useState, useEffect } from "react"
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap"
import api from "../api"

function Reports() {
	const [reports, setReports] = useState([])

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	useEffect(() => {
		getReports()
	}, [])

	const getReports = () => {
		api.get("api/reports/") // gets information from this url
			.then((res) => res.data) // gets data
			.then((data) => {
				setReports(data)
				console.log(data) // logs it to the console (fn + F12)
			}) // assigns setProducts to the data
			.catch((err) => alert(err))
	}

	const deleteReport = (id) => {
		api.delete(`/api/reports/${id}/`)
			.then((res) => {
				if (res.status === 204) {
					alert("Report Deleted!")
					getReports()
				} else {
					alert("Failed to delete report.")
				}
			})
			.catch((error) => alert(error))
	}

	const createReport = (e) => {
		e.preventDefault()
		const reportData = {
			title,
			description,
		}

		api.post("/api/reports/", reportData)
			.then((res) => {
				if (res.status === 201) {
					alert("Report Created!")
					// Refresh Report only after successful creation
					getReports()
				} else {
					alert("Failed to create Report.")
				}
				// Clear form fields after submission
				setTitle("")
				setDescription("")
			})
			.catch((err) => alert(err.response.data)) // Show specific backend error
	}

	return (
		<Container className="py-4">
			<Row>
				<Col md={8}>
					<h2 className="mb-4">Your Reports</h2>
					{reports.length === 0 ? (
						<Card className="mb-3">
							<Card.Body>
								<Card.Text className="text-muted">
									No reports yet. Create your first report
									below.
								</Card.Text>
							</Card.Body>
						</Card>
					) : (
						reports.map((report) => (
							<Card key={report.report_id} className="mb-3">
								<Card.Body>
									<Card.Title>{report.title}</Card.Title>
									<Card.Text>{report.description}</Card.Text>
									<Button
										variant="danger"
										size="sm"
										onClick={() =>
											deleteReport(report.report_id)
										}
									>
										Delete
									</Button>
								</Card.Body>
							</Card>
						))
					)}
				</Col>

				<Col md={4}>
					<Card className="sticky-top" style={{ top: "20px" }}>
						<Card.Body>
							<Card.Title className="mb-3">
								Create a New Report
							</Card.Title>
							<Form onSubmit={createReport}>
								<Form.Group
									className="mb-3"
									controlId="reportTitle"
								>
									<Form.Label>Title</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter report title"
										required
										value={title}
										onChange={(e) =>
											setTitle(e.target.value)
										}
									/>
								</Form.Group>

								<Form.Group
									className="mb-3"
									controlId="reportDescription"
								>
									<Form.Label>Description</Form.Label>
									<Form.Control
										as="textarea"
										rows={4}
										placeholder="Describe the issue or concern"
										required
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
									/>
								</Form.Group>

								<Button
									variant="primary"
									type="submit"
									className="w-100"
								>
									Submit Report
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default Reports
