import React from "react";

import { AiOutlineClose } from "react-icons/ai";
import { Button, Container, Table, FormControl, Row, Col } from "react-bootstrap";

const Basket = (props) => {
	const items = props.items;
	const itemsAdded = props.itemsAdded;
	const mode = props.mode;
	var totalPrice = 0;
	var totalPriceRender = 0.00;
	var changeAmountInput;
	var removeItemButton;

	const itemsAddedRender = Object.keys(itemsAdded).map((item) => {
		for(let i = 0; i < items.length; i++) {
			if(items[i].Name == item) { // items[i].Name comes from the Backend fetch a and item comes from mapping the keys of the itemsAdded object
				var itemPrice = (itemsAdded[item] * items[i].Price)
				var itemPriceRender = (itemPrice / 100).toFixed(2)
				totalPrice = totalPrice + itemPrice
				totalPriceRender = (totalPrice /100).toFixed(2)
				console.log(totalPriceRender)

				if(props.handleFinalPrice) {
					props.handleFinalPrice(totalPrice);
				}

				if(mode === "edit") {
					changeAmountInput = 
						<FormControl 
							type="number"
							className="w-75"
							id="itemAmount"
							name="itemAmount"
							value={itemsAdded[item]}
							max="10"
							min="1" 
							onChange={(e) => {
								e.preventDefault()
								props.handleAmountChange(parseInt(e.target.value), item) 
							}}
						></FormControl>

					removeItemButton = 
						<Button
							variant="outline-danger"
							className="d-flex align-items-center py-2"
							onClick={(e) => {
								e.preventDefault()
								props.handleRemoveItem(e, item)
							}}
						>
							<AiOutlineClose></AiOutlineClose>
						</Button>
				} else if(mode ==="view") {
					changeAmountInput = <>{itemsAdded[item]}</>
				}
				
				return(
					<tr>
						<td className="col-sm-4 align-middle">{items[i].Name}</td>
						<td className="col-sm-3 align-middle">{changeAmountInput}</td>
						<td className="col-sm-4 align-middle">£{itemPriceRender}</td>
						<td className="col-sm-1 align-middle">{removeItemButton}</td>
					</tr>
				)
			}
			
		}
	});

	const tableSize = () => {
		if(typeof window !== "undefined" && window.innerWidth < 575) {
			return "sm"
		} else {
			return null
		}
	}

	return (
		<Container fluid className="table-wrapper">
			<Table hover size={tableSize()}>
				<thead>
					<tr>
						<th className="col-sm-4">Item Name</th>
						<th className="col-sm-3">Amount</th>
						<th className="col-sm-4">Price</th>
						<th className="col-sm-1"></th>
					</tr>
				</thead>
				<tbody>
					{itemsAddedRender}
					<tr>
						<td className="col-sm-4"><b>Total</b></td>
						<td className="col-sm-3"></td>
						<td className="col-sm-4"><b>£{totalPriceRender}</b></td>
						<td className="col-sm-1"></td>
					</tr>
				</tbody>
			</Table>
		</Container>
	)
};

export default Basket;