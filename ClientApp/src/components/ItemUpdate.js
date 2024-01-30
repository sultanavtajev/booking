import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService';
import axios from 'axios';
import { Link } from 'react-router-dom';

// UpdateItem component
function UpdateItem() {
    const navigate = useNavigate();
    // Getting the itemId from the URL-parameter
    const { itemId } = useParams();
    // Setting the initial state of the item
    const [item, setItem] = useState(null);
    // Setting the initial state of the user
    const [userName, setUserName] = useState(null);
    // Setting the initial state for updated item values
    const [updatedItem, setUpdatedItem] = useState({});

    // Fetching data asynchronously from the url "localhost:port/item"
    // Source: https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:44417/item');
                const data = await response.json();
                console.log(data);

                // Finding the specific item based on the itemId
                const selectedItem = data.find((item) => item.itemId.toString() === itemId);
                console.log(selectedItem);
                if (selectedItem) {
                    setItem(selectedItem);
                    // Initialize updatedItem with the current values
                    setUpdatedItem(selectedItem);
                } else {
                    throw new Error('Item not found');
                }
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchData();
    }, [itemId]);

    // Getting and setting the user and username
    useEffect(() => {
        const fetchUser = async () => {
            const user = await authService.getUser();
            setUserName(user && user.name);
        };

        fetchUser();
    }, []);

    // Handling the updating of an item
    const handleUpdate = async (e) => {
        e.preventDefault()

        // Only authorizing the update of the item if the item's userName is the same as the current userName
        if (userName === item.userName) {
            console.log("Authorized!");

            // Using axios to try to post the updated data to the Update() method in ItemController
            try {
                // Using the Update() method in ItemController
                const response = await axios.post('/item/update', updatedItem);
                console.log('Item updated successfully: ', response.item);
            } catch (error) {
                console.error('Error updating data: ', error);
                navigate('/userProperties');
            }
        }
        // Sending the user to the "home-screen" if they are unauthorized
        else {
            console.error("Unauthorized!");
        }
    };

    // Handling input changes for updating the item
    const handleInputChange = (event) => {
        // Getting different properties of the input elements
        const { name, type, checked, value } = event.target;

        // Special handling for amenities (checkboxes)
        if (type === 'checkbox') {
            // Updating the items state by creating a new object with the previous state and the changed or added property
            setUpdatedItem((prevItem) => ({ ...prevItem, [name]: checked }));
        } else if ((name === 'imageUrl' || name === 'imageUrl2' || name === 'imageUrl3') && event.target.files && event.target.files.length > 0) {
            // Special handling for files
            const filename = "/images/" + event.target.files[0].name;
            // Updating the items state by creating a new object with the previous state and the changed or added property
            setUpdatedItem((prevItem) => ({ ...prevItem, [name]: filename }));
        } else {
            // Handling for all other types of inputs
            // Updating the items state by creating a new object with the previous state and the changed or added property
            setUpdatedItem((prevItem) => ({ ...prevItem, [name]: value }));
        }
    };

    // If no item is found, continue loading
    if (!item) {
        return <p>Loading...</p>;
    }

    // Returning the details of the specific item with input fields for updating
    if (userName === item.userName) {
        return (
            <div id="body" className="col-md-3 mx-auto">
                <form onSubmit={handleUpdate} encType="multipart/form-data">
                    <h2>Update item: {item.name}</h2>
                    <br></br>
                    <div className="form-group mb-4">
                        <div className="form-floating">
                            <input
                                name="name"
                                type="text"
                                value={updatedItem.name || ''}
                                required
                                onChange={handleInputChange} id="name" className="form-control" />
                            <label className="form-label" htmlFor="name">Name:</label>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <div className="form-floating">
                            <input
                                name="price"
                                type="text"
                                required
                                value={updatedItem.price || ''}
                                onChange={handleInputChange} id="price" className="form-control" />
                            <label className="form-label" htmlFor="price">Price:</label>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <div className="form-floating">
                            <input
                                name="description"
                                type="text"
                                required
                                value={updatedItem.description || ''}
                                onChange={handleInputChange} id="description" className="form-control" />
                            <label className="form-label" htmlFor="description">Description:</label>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <div className="form-floating">
                            <input className="form-control" type="file" name="imageUrl" onChange={handleInputChange} id="image" multiple />
                            <label className="form-label" htmlFor="imageUrl">Image 1:</label>
                        </div>
                        {updatedItem.imageUrl && (
                            <span>Selected File: {updatedItem.imageUrl}</span>
                        )}
                    </div>
                    <div className="form-group mb-4">
                        <div className="form-floating">
                            <input className="form-control" type="file" name="imageUrl2" onChange={handleInputChange} id="image2" multiple />
                            <label className="form-label" htmlFor="imageUrl2">Image 2:</label>
                        </div>
                        {updatedItem.imageUrl2 && (
                            <span>Selected File: {updatedItem.imageUrl2}</span>
                        )}
                    </div>
                    <div className="form-group mb-4">
                        <div className="form-floating">
                            <input className="form-control" type="file" name="imageUrl3" onChange={handleInputChange} id="image3" multiple />
                            <label className="form-label" htmlFor="imageUrl3">Image 3:</label>
                        </div>
                        {updatedItem.imageUrl3 && (
                            <span>Selected File: {updatedItem.imageUrl3}</span>
                        )}
                    </div>
                    <div className="form-group mb-4">
                        <div className="form-floating">
                            <input
                                name="location"
                                type="text"
                                required
                                value={updatedItem.location || ''}
                                onChange={handleInputChange} id="location" className="form-control" />
                            <label className="form-label" htmlFor="location">Location:</label>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <div className="form-floating">
                            <select name="propertyType" className="form-control custom-select" required onChange={handleInputChange}>
                                <option disabled defaultValue>Choose...</option>
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
                                required
                                value={updatedItem.rooms || ''}
                                onChange={handleInputChange} id="rooms" className="form-control" />
                            <label className="form-label" htmlFor="rooms">Rooms:</label>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <div className="form-floating">
                            <input
                                name="beds"
                                type="number"
                                required
                                value={updatedItem.beds || ''}
                                onChange={handleInputChange} id="beds" className="form-control" />
                            <label className="form-label" htmlFor="beds">Beds:</label>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <h3>Amenities</h3>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="hasTV" checked={updatedItem.hasTV} onChange={handleInputChange} />
                            <label className="form-check-label">TV</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="hasKitchen" checked={updatedItem.hasKitchen} onChange={handleInputChange} />
                            <label className="form-check-label">Kitchen</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="hasWashingMachine" checked={updatedItem.hasWashingMachine} onChange={handleInputChange} />
                            <label className="form-check-label">Washing Machine</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="hasFreeParking" checked={updatedItem.hasFreeParking} onChange={handleInputChange} />
                            <label className="form-check-label">Free Parking</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="hasPaidParking" checked={updatedItem.hasPaidParking} onChange={handleInputChange} />
                            <label className="form-check-label">Paid Parking</label>
                        </div>
                        <div className="form-check" name="has">
                            <input className="form-check-input" type="checkbox" name="hasAirCondition" checked={updatedItem.hasAirCondition} onChange={handleInputChange} />
                            <label className="form-check-label">Air Condition</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="hasPool" checked={updatedItem.hasPool} onChange={handleInputChange} />
                            <label className="form-check-label">Pool</label>
                        </div>
                    </div>
                    <input type="submit" value="Save Changes" className="btn btn-lg btn-outline-info w-100 text-dark" />
                    <Link to={'/userProperties'} className="btn btn-outline-secondary text-dark w-100 mt-2">Cancel</Link>
                </form>
                <br></br>
                <br></br>
            </div>
        );
    }
}

// Exporting the component
export default UpdateItem;
