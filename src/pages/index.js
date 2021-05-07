import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import App from "../components/App";

const index = ({ itemsData }) => {
    return (<App itemsData={itemsData}></App>)
}

export const getServerSideProps = async (context) => {
	let itemsData;
	await axios.get("https://azmmtest.herokuapp.com/")
		.then((res) => {
			itemsData = res.data
			
			//setItems(res.data);
		}).catch((error) => {
			console.log(error); //Logs a string: Error: Request failed with status code 404
		});

	return {
		props: {
			itemsData: itemsData
		}, // will be passed to the page component as props
	}
};

export default index;