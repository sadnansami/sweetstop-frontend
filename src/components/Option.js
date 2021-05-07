import React from "react";
import { Row, Col } from "react-bootstrap";

const Option = (props) => {
	const { items, category} = props;

	const itemRender = items.map((item) => {
			
			if(item.Category == category) {
				let itemPriceRender = parseInt(item.Price / 100).toFixed(2)
				return(
					<Row
						className="itemButton"
						onClick={(e) => {
							e.preventDefault()
							props.handleAddItem(e, item.Name)
						}}
					>
						<Col md={9} className="itemName">
							<span>{item.Name}</span>
						</Col>
						<Col md={3} className="d-flex align-items-center justify-content-end itemPrice">
							<span>£{itemPriceRender}</span>
						</Col>
					</Row>
				)
			}
	});
				

	return (
		<>
			{itemRender}
		</>
	);
};

export default Option;