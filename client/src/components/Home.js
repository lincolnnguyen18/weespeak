import React, { useEffect } from 'react'

export default function Home() {
	useEffect(() => {
		fetch('http://localhost:5000/profile/getRegistrationStatus')
		.then(response => response.json())
		.then(data => {
			console.log(data)
			// getUsername
		});
	}, []);
	
	return (
		<div>
			Home
		</div>
	)
}
