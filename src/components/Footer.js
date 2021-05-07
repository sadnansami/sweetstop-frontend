import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Button, Container, Row, Col } from "react-bootstrap";

const Footer = () => {
	return(
		<div className="footer d-flex align-items-center">
			<Container className="">
				<Row>
					<Col className="footerLink my-3 d-flex align-items-center justify-content-center" lg={3}>About Us</Col>
					<Col className="footerLink my-3 d-flex align-items-center justify-content-center" lg={3}>Contact Us</Col>
					<Col className="footerLink my-3 d-flex align-items-center justify-content-center" lg={3}>Terms & Conditions</Col>
					<Col className="footerLink my-3 d-flex align-items-center justify-content-center" lg={3}>Legal</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Footer;
