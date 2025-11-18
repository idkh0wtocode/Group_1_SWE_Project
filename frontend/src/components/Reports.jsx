import { useState, useEffect } from "react"
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
		<div>
			<div>
				<h2>Your Reports</h2>
				{reports.map((report) => (
					<div key={report.report_id}>
						<h4>{report.id}</h4>
						<h4>{report.title}</h4>
						<p>{report.description}</p>
						<button onClick={() => deleteReport(report.report_id)}>
							Delete
						</button>
						<hr />
					</div>
				))}
			</div>

			<h2>Create a New report</h2>
			<form onSubmit={createReport}>
				<label htmlFor="name">Title:</label>
				<br />
				<input
					type="text"
					id="title"
					name="title"
					required
					onChange={(e) => setTitle(e.target.value)}
					value={title}
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
				<input type="submit" value="Submit"></input>
			</form>
		</div>
	)
}

export default Reports
