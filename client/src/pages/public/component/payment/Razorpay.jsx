import React from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
export default function Razorpay(){
	

	const initPayment = (data) => {
		const options = {
			key: "rzp_test_fQyzF2zWal8j1t",
			amount: data.amount,
			currency: data.currency,
			name:"Xpecto",
			description: "Test Transaction",
			// image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = `${process.env.REACT_APP_BACKENDURL}/api/payment/verify`;
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = `${process.env.REACT_APP_BACKENDURL}/api/payment/orders`;
			const { data } = await axios.post(orderUrl, { amount: 200});
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (<>
			
				<Button onClick={handlePayment} className="buy_btn" variant="outlined">
					buy now
				</Button>
    </>
	);
}
