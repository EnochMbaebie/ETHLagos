import React, { Component } from "react";
import IPFSInboxContract from "./IPFSInbox.json";
import getWeb3 from "./utils/getWeb3";

//import truffleContract from "truffle-contract";
//import ipfs from './ipfs' ;

import "./App.css";

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			web3: null,
			accounts: null,
			contract: null,
			ipfsHash: null
		};
	}

	componentDidMount = async () => {

	}

//Get the contract instance
const Contract = truffle-contract(IPFSInboxContract);
Contract.setProvider(web3.currentProvider);
const instance = await Contract.deployed();
	
//Turns the file submitted into a buffer

captureFile = (event) => {
	event.stopPropagation()
	event.preventDefault()
	const file = event.target.files[0]
	let reader = new window.FileReader()
	reader.readAsArrayBuffer(file)
	reader.onloadend = () => this.convertToBuffer(reader)
};

//helper function for turning a file into a buffer
convertToBuffer = async(reader) => {
	const buffer = await Buffer.from(reader.result);
	this.setState({buffer});
};

//Function for sending the buffer to the ipfs node
// and shows the ipfs hash onto the UI

onIPFSSubmit = async (event) => {
	event.preventDefault();
	await ipfs.add(this.state.buffer, (err, ipfsHash) => {
		console.log(err,ipfsHash);
		this.setState({ ipfsHash:ipfsHash[0].hash });
	})
};

return (
	<div className="App">
	  <h2> 1. Add a file to IPFS here </h2>
	  <form id="ipfs-hash-form" className="scep-form" onSubmit={this.onIPFSSubmit}>
	  	<input
	  		type="file"
	  		onChange={this.captureFile}
	  	  />
	  	  <button
	  	  	type="submit">
	  	  	send it 
	  	  </button>
	  	 </form>
	  	 <p> The IPFS hash is: {this.state.ipfsHash}</p>
	  </div>





	)



}

