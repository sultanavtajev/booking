import React, { Component } from 'react';
import axios from 'axios';
import authService from './api-authorization/AuthorizeService';
import './css/Create.css';
import './css/Item.css';
import { Link } from 'react-router-dom';

// Form for creating a property
// Source: https://legacy.reactjs.org/docs/forms.html
class Create extends Component {
    constructor(props) {
        super(props);

        // Setting the inital state (value) of each input
        this.state = {
            propertyName: '',
            price: '',
            description: '',
            location: '',
            propertyType: '',
            rooms: 0,
            beds: 0,
            hasTV: false,
            hasKitchen: false,
            hasWashingMachine: false,
            hasFreeParking: false,
            hasPaidParking: false,
            hasAirCondition: false,
            hasPool: false,
            userName: null,
            files: null,
            submitSuccess: false, // Variable to track submission status    
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const user = await authService.getUser();
        this.setState({ userName: user && user.name }, () => {
            this.render();
        });
    }

    // Function that is called when changing the value of an input
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // Logging the name and value of input fields
        console.log(name + ": " + value);

        // Checking if the target name is imageUrl
        // Needs to be checked in order for the image to be saved as "image.png" and not "C:\fakepath\image.png"
        if (event.target.name === 'imageUrl' || event.target.name === 'imageUrl2' || event.target.name === 'imageUrl3') {
            const filename = target.files[0].name;
            console.log(filename);

            this.setState({
                [name]: filename,
            })
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    // Handling the submission of the form
    // Source: https://stackoverflow.com/questions/50617966/axios-post-form-with-reactjs
    handleSubmit = async (event) => {
        event.preventDefault();

        const target = event.target;
        // Setting the value of the target, with special handling for checkbox-targets
        const value = target.type === 'checkbox' ? target.checked : target.value;

        // Checking if the target name is imageUrl
        // Needs to be checked in order for the image to be saved as "image.png" and not "C:\fakepath\image.png"
        if (event.target.name === 'imageUrl' || event.target.name === 'imageUrl2' || event.target.name === 'imageUrl3') {
            const string = value;
            // Splitting the string on a backslash \
            const splitString = string.split("\\");
            // Only getting the value after the last backslash
            const filename = splitString[splitString.length - 1];
            console.log(filename);
        }

        // Setting the values of the item based on the current state of the item
        const item = {
            name: this.state.name,
            price: this.state.price,
            description: this.state.description,
            location: this.state.location,
            propertyType: this.state.propertyType,
            rooms: this.state.rooms,
            beds: this.state.beds,
            hasTV: this.state.hasTV,
            hasKitchen: this.state.hasKitchen,
            hasWashingMachine: this.state.hasWashingMachine,
            hasFreeParking: this.state.hasFreeParking,
            hasPaidParking: this.state.hasPaidParking,
            hasAirCondition: this.state.hasAirCondition,
            hasPool: this.state.hasPool,
            userName: this.state.userName,

            // Adding '/images/' to the urls, so that they link to the correct folder where images are saved
            imageUrl: '/images/' + this.state.imageUrl,
            imageUrl2: '/images/' + this.state.imageUrl2,
            imageUrl3: '/images/' + this.state.imageUrl3,

        };

        // Redirects to /userProperties
        window.location.href = '/userProperties';

        // Using axios to try to post the data to the Create() method in ItemController
        try {
            // Using the Create() method in ItemController
            const response = await axios.post('/item/create', item);
            console.log('Data saved successfully: ', response.item);
        } catch (error) {
            console.error('Error saving data: ', error);
        }
    };

    // Rendering the actual form
    render() {
        return (
            <>
                {/*
                Bootstrap Toasts to display a confirmation after successful submission
                Source: https://getbootstrap.com/docs/4.3/components/toasts/
                */}
                <div id="body" className="col-md-3 mx-auto">
                    <h1>Add New Property</h1>
                    <br></br>
                    { /* Form. encType is needed to handle the uploading of images */}
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data" autoComplete="off">
                        <div className="form-group mb-4">
                            <div className="form-floating">
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={undefined}
                                    onChange={this.handleInputChange} id="name" className="form-control" />
                                <label className="form-label" htmlFor="name">Property-name:</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="form-floating">
                                <input
                                    name="price"
                                    type="number"
                                    value={undefined}
                                    required
                                    onChange={this.handleInputChange} id="price" className="form-control" />
                                <label className="form-label" htmlFor="price">Price Per Day:</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="form-floating">
                                <input
                                    name="description"
                                    type="text"
                                    value={undefined}
                                    onChange={this.handleInputChange} id="description" className="form-control" />
                                <label className="form-label" htmlFor="description">Description:</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="form-floating">
                                <input className="form-control" type="file" name="imageUrl" value={undefined} onChange={this.handleInputChange} id="image" multiple />
                                <label className="form-label" htmlFor="image">Image 1:</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="form-floating">
                                <input className="form-control" type="file" name="imageUrl2" value={undefined} onChange={this.handleInputChange} id="image2" multiple />
                                <label className="form-label" htmlFor="image2">Image 2:</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="form-floating">
                                <input className="form-control" type="file" name="imageUrl3" value={undefined} onChange={this.handleInputChange} id="image3" multiple />
                                <label className="form-label" htmlFor="image3">Image 3:</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="form-floating">
                                <input
                                    name="location"
                                    type="text"
                                    value={undefined}
                                    required
                                    onChange={this.handleInputChange} id="location" className="form-control" />
                                <label className="form-label" htmlFor="location">Location:</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="form-floating">
                                <select name="propertyType" className="form-control custom-select" required onChange={this.handleInputChange}>
                                    <option defaultValue>Choose...</option>
                                    <option value="House">House</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Cabin">Cabin</option>
                                    <option value="VacationHome">Vacation Home</option>
                                    <option value="Other">Other</option>
                                </select>
                                <label className="form-label">Property Type:</label>
                            </div>
                            <span className="text-danger"></span>
                        </div>
                        <div className="form-group mb-4">
                            <div className="form-floating">
                                <input
                                    name="rooms"
                                    type="number"
                                    value={undefined}
                                    onChange={this.handleInputChange} id="rooms" className="form-control" required />
                                <label className="form-label" htmlFor="rooms">Rooms:</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="form-floating">
                                <input
                                    name="beds"
                                    type="number"
                                    value={undefined}
                                    onChange={this.handleInputChange} id="beds" className="form-control" required />
                                <label className="form-label" htmlFor="beds">Beds:</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <h3>Amenities</h3>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="hasTV" onChange={this.handleInputChange} />
                                <label className="form-check-label">TV</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="hasKitchen" onChange={this.handleInputChange} />
                                <label className="form-check-label">Kitchen</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="hasWashingMachine" onChange={this.handleInputChange} />
                                <label className="form-check-label">Washing Machine</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="hasFreeParking" onChange={this.handleInputChange} />
                                <label className="form-check-label">Free Parking</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="hasPaidParking" onChange={this.handleInputChange} />
                                <label className="form-check-label">Paid Parking</label>
                            </div>
                            <div className="form-check" name="has">
                                <input className="form-check-input" type="checkbox" name="hasAirCondition" onChange={this.handleInputChange} />
                                <label className="form-check-label">Air Condition</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="hasPool" onChange={this.handleInputChange} />
                                <label className="form-check-label">Pool</label>
                            </div>
                        </div>
                        <input type="submit" value="Add Property" className="btn btn-lg btn-outline-info w-100" style={{ color: 'black' }} />
                        <Link to={'/userProperties'} className="btn btn-outline-secondary text-dark w-100 mt-2">Cancel</Link>
                    </form>
                    <br></br>
                    <br></br>
                </div>
            </>
        );
    }
}

// Exporing the Create class
export default Create;
