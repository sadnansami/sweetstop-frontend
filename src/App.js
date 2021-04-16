import React, { useState, useEffect, lazy, Suspense } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Button, Container, Navbar, Row, Col, Tooltip } from "react-bootstrap";
import Options from "./Options";
import Basket from "./Basket";
import Footer from "./Footer"
import axios from "axios";
import PaymentForm from "./PaymentForm"


const App = () => {
	const [items, setItems] = useState([]);
	const [itemsAdded, setItemsAdded] = useState({});
	const [finalPrice, setFinalPrice] = useState(0);
	const [show, setShow] = useState(false);
	const toggleModal = () => {
		setShow(!show)
	}

	useEffect(() => {
		axios.get("https://azmmtest.herokuapp.com")
			.then((res) => {
				//res = JSON.parse(JSON.stringify(res))
				setItems(res.data);
			}).catch((error) => {
				console.log(error); //Logs a string: Error: Request failed with status code 404
			});
	}, []);

	const handleFinalPrice = (totalPrice) => {
		setFinalPrice(totalPrice)
		console.log(finalPrice, "nunu")
	};

	const handleAddItem = (e, itemName) => {
		let newItemsAdded = {...itemsAdded};

		if(itemName in newItemsAdded) {
			if(newItemsAdded[itemName] < 10) { // Prevents Spam, maximum 10 items of same sort
				newItemsAdded[itemName] = ++newItemsAdded[itemName];
			}
		} else {
			newItemsAdded[itemName] = 1;
		}
		setItemsAdded(newItemsAdded)

		//if(newItemsAdded[itemName])

		console.log(newItemsAdded)

		
	}

	const handleAmountChange = (amountInput, itemKey) => {
		let newItemsAdded = {...itemsAdded};
		newItemsAdded[itemKey] = amountInput;
		console.log(newItemsAdded, "ioje")
		setItemsAdded(newItemsAdded)
	}

	const handleRemoveItem = (e, itemKey) => {
		let newItemsAdded = {...itemsAdded};
		delete newItemsAdded[itemKey];
		setItemsAdded(newItemsAdded);
	}

	return(
		<>
			<Navbar bg="light justify-content-between">
				<Container>
					<Navbar.Brand>
						<img
							className="logo"
							src="/assets/LogoInvert.gif"
							alt="SWEETSTOP Logo"
						></img>
					</Navbar.Brand>
					<a
						href="#"
						className="basketIcon"
						onClick={toggleModal}
					>
						<AiOutlineShopping></AiOutlineShopping>
					</a>
				</Container>
			</Navbar>
			<Container className="mainContainer">
				<h1 className="stylisticHeader text-center">Our Sweets!</h1>
				<Row>
					<Col sm={12} lg={7}>
						<Options items={items} handleAddItem={handleAddItem}></Options>
					</Col>
					<Col sm={12} lg={5}>
						<Basket
							mode="edit"
							items={items}
							itemsAdded={itemsAdded}
							handleAmountChange={handleAmountChange}
							handleRemoveItem={handleRemoveItem}
							handleFinalPrice={handleFinalPrice}
						></Basket>
						<Button
							onClick={toggleModal}
							className="text-center mt-5 w-100"
							variant="outline-danger"
							disabled={(finalPrice === 0) ? true : false}
						>Place Order!</Button>
					</Col>
				</Row>
				<Tooltip show={true}>Hello</Tooltip>
					<PaymentForm
						items={items}
						itemsAdded={itemsAdded}
						handleAmountChange={handleAmountChange}
						handleRemoveItem={handleRemoveItem}
						finalPrice={finalPrice}
						show={show}
						setShow={setShow}
						toggleModal={toggleModal}
					></PaymentForm>
			</Container>
			<Footer></Footer>
		</>
	);
};

export default App;
