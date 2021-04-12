import React, { useState, useEffect } from "react";
import { Button, Container, Modal, Row, Col } from "react-bootstrap";
import Option from "./Option"

const OptionsCategory = (props) => {
	const { categories, show, setShow, toggleModal, handleCategoryChange } = props;
	

	console.log(categories)
	const categoriesRender = categories.map((eachCategory) => {
		return (
			<Row>
				<Col sm={12} className="categoryNameCol text-center">
					<a
						className="categoryName"
						href="#"
						onClick={(e) => {
							e.preventDefault()
							handleCategoryChange(eachCategory)
							toggleModal()
						}}
					>
						{eachCategory}
					</a>
				</Col>
			</Row>
		)
	});

	return(
		<Modal
			show={show}
			onHide={toggleModal}
			centered
		>
			<Container fluid>
				<Modal.Header className="justify-content-center">
					<h1>Menu</h1>
				</Modal.Header>
				<Modal.Body>
					{categoriesRender}
				</Modal.Body>
			</Container>
		</Modal>
		
	);
};

const Options = (props) => {
	const items = props.items;
	var itemsCategories = [];
	const [category, setCategory] = useState()

	const [show, setShow] = useState(false);
	const toggleModal = () => {
		setShow(!show)
	}
	
	for(let i = 0; i < items.length; i++) {
		if((itemsCategories.includes(items[i].Category)) === false) {
			itemsCategories.push(items[i].Category);
		}
	};

	const itemsOptions = {};
	
	itemsCategories.map((itemsCategory) => {
		itemsOptions[itemsCategory] = [];
	});

	for (let i = 0; i < items.length; i++) {
		itemsOptions[items[i].Category] = [...itemsOptions[items[i].Category], items[i].Name];
		
	}

	const categories = Object.keys(itemsOptions)

	useEffect(() => { 
		if(typeof categories !== "undefined" && typeof category === "undefined") {
			setCategory(categories[0])
		}
	});

	const handleCategoryChange = (currentCategory) => {
		setCategory(currentCategory)
	}
	
	return (
		<>
			<OptionsCategory
				categories={categories}
				handleCategoryChange={handleCategoryChange}
				show={show}
				setShow={setShow}
				toggleModal={toggleModal}
			></OptionsCategory>
			<h5 className="text-center">
				<span className="menuText">Menu >&nbsp;</span>
				<a
					href="#"
					className="text-danger category"
					onClick={toggleModal}
				>{category}</a>
			</h5>
			<Option
				items={items}
				itemsOptions={itemsOptions}
				category={category}
				handleAddItem={props.handleAddItem}
			></Option>
		</>
	);
}

export default Options;