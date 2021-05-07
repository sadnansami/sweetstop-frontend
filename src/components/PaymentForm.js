import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Modal, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Basket from "./Basket";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51IQM8qG8NCnIbhPNKhtTOHjdQnjtN6e5E6rQPcbexF8MrwfQN82N92ODiInaQ4bAMpRsIL14v0f04FzSG9eHmSB200FDILL5i8");

const ProcessPayment = (props) => {
	const {
		items,
		itemsAdded,
		finalPrice,
		show,
		setShow,
		toggleModal,
		handleShow
	} = props;

	const stripe = useStripe();
	const elements = useElements();

	const [disabledForm, setDisabledForm] = useState(false);

	let name;
	let email;
	let telephone;
	let address;
	let postcode;

	const handleSubmit = (e) => {

		e.preventDefault();
		console.log(name, email, telephone, address, postcode, "hello")

		setDisabledForm(true)
		axios.post("https://azmmtest.herokuapp.com/paymentintent", {
			items: items,
			totalPrice: finalPrice,
			name: name,
			email:email,
			telephone: telephone,
			address: address,
			postcode: postcode
		}).then(res => {
			setDisabledForm(false)
			console.log(res.data)
			return res.data.client_secret
		}).then((data) => {
			stripe.confirmCardPayment(data, {
				payment_method: {
					card: elements.getElement(CardElement),
				}
			}).then(() => {
				console.log("Hellowwdd")
			})
		}).catch((error) => {
			setDisabledForm(false)
			console.log(error, "There was an error");
		});
	}

	return (
		<fieldset disabled={disabledForm}>
			<form onSubmit={handleSubmit}>
				<InputGroup className="my-3">
					<FormControl
						type="name"
						placeholder="John Smith"
						onChange={(e) => {name = e.target.value}}
						required
					></FormControl>
					</InputGroup>
					<InputGroup className="my-3">
						<FormControl
							type="email"
							placeholder="john@gmail.com"
							onChange={(e) => {email = e.target.value}}
							required
						></FormControl>
					</InputGroup>
					<InputGroup className="my-3">
						<FormControl
							type="tel"
							placeholder="074412345678"
							onChange={(e) => {telephone = e.target.value}}
							required
						></FormControl>
					</InputGroup>
					<InputGroup className="my-3">
						<FormControl
							type="name"
							placeholder="13, Ilford Lane"
							onChange={(e) => {address = e.target.value}}
							required
						></FormControl>
					</InputGroup>
					<InputGroup className="my-3">
						<FormControl
							type="name"
							placeholder="IG1 3AH"
							onChange={(e) => {postcode = e.target.value}}
							required
						></FormControl>
					</InputGroup>				
					<InputGroup className="my-3">
						<CardElement className="form-control" required></CardElement>
					</InputGroup>
					<InputGroup>
						<Button
							type="submit"
							variant="outline-danger w-100"
							disabled={(finalPrice === 0) ? true : disabledForm}
						>Pay</Button>
					</InputGroup>
				</form>
			</fieldset>
	);
};

const PaymentForm = (props) => {
	const {
		items,
		itemsAdded,
		finalPrice,
		show,
		setShow,
		toggleModal,
		handleShow
	} = props;

	return (
		<>
			<Modal
				size="lg"
				show={show}
				onHide={toggleModal}
				centered
			>
				<Container fluid>
					<Modal.Header className="justify-content-center">
						<h1>Basket</h1>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col lg={6}>
								<Basket
									mode="view"
									items={items}
									itemsAdded={itemsAdded}
									handleAmountChange={props.handleAmountChange}
									handleRemoveItem={props.handleRemoveItem}
								></Basket>
							</Col>
							<Col lg={6}>
								<Elements stripe={stripePromise}>
									<ProcessPayment
										items={items}
										itemsAdded={itemsAdded}
										finalPrice={finalPrice}
									></ProcessPayment>
								</Elements>
							</Col>
						</Row>
					</Modal.Body>
				</Container>
			</Modal>
		</>
	);
  
};

export default PaymentForm;