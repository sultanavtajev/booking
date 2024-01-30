/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService';
import axios from 'axios';
import './css/Item.css';
import { Link } from 'react-router-dom';
import CarouselTest from './CarouselTest';
import './css/ItemDetails.css';
import Item from './Item';
import { renderAmenities } from './Item';

// ItemDelete component
function ItemDelete() {
    const navigate = useNavigate();
    // Getting the itemId from the URL-parameter
    const { itemId } = useParams();
    // Setting the initial state of the item
    const [item, setItem] = useState(null);
    // Setting the initial state of the user
    const [userName, setUserName] = useState(null);

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
                if (selectedItem) {
                    setItem(selectedItem);
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

    // Handling the deletion of an item
    const handleDelete = async (e) => {
        e.preventDefault();
        // Only authorizing the deletion of the item if the items userName is the same as the current userName
        if (userName === item.userName) {
            console.log("Authorized!");

            // Using axios to try to post the data to the Delete() method in ItemController
            try {
                // Using the Delete() method in ItemController
                const response = await axios.post('/item/delete', item);
                console.log('Item deleted successfully: ', response.item);
            } catch (error) {
                console.error('Error deleting data: ', error);
                navigate('/userProperties');
            }
        }
        // Sending the user to the "home-screen" if they are unauthorized
        else {
            console.error("Unauthorized!");
            window.location.href = "https://localhost:44417/";
        }
    };

    if (!item) {
        return <p>Loading...</p>;
    }

    // Returning the details of the specific item if the items userName is the same as the current userName
    if (userName === item.userName) {
        return (
            <div className="container detail">
                <div className="box">
                    <div className="row">
                        <h3>Delete property: {item.name}</h3>
                        <hr style={{ marginBottom: '50px' }} />
                        <div className="col-5">
                            <CarouselTest item={item} />
                            <br />
                        </div>
                        <div className="col-7">
                            <div>
                                <div className="row" style={{ margin: '50px' }}>
                                    <div className="col h-50">
                                        <p className="mb-2"><strong>Property ID: {item.itemId}</strong></p>
                                        <p className="mb-2"><strong>{item.description}</strong></p>
                                        <p className="mb-2"><small>{item.price} NOK/Night</small></p>
                                        <p className="mb-2"><i className="bi bi-geo-alt">{item.location}</i></p>
                                    </div>
                                    <div className="col h-50">
                                        <p className="mb-2"><strong>Property Type: </strong>{item.propertyType}</p>
                                        <p className="mb-2"><strong>Rooms: </strong>{item.rooms}</p>
                                        <p className="mb-2"><strong>Beds: </strong>{item.beds}</p>
                                        <p style={{ marginBottom: '50px' }} className="mb-2"><strong>Amenities: </strong>{renderAmenities(item)}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <Link onClick={handleDelete} to="/userProperties" className="btn btn-lrg btn-danger col-md-4 w-50 mx-auto mt-2">Delete</Link>
                                </div>
                                <div className="row">
                                    <Link to={'/all-items'} className="btn btn-outline-secondary text-dark w-50 mx-auto mt-2">Cancel</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Exporting the component
export default ItemDelete;
