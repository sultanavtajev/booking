import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService';
import './css/Item.css';

function UserProperties() {
    // Setting the initial states
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState(null);

    // Fetching data asynchronously from "/item" with the headers
    useEffect(() => {
        const fetchData = async () => {
            // Getting and setting the user and username
            const user = await authService.getUser();
            setUserName(user && user.name);

            const token = await authService.getAccessToken();

            // Setting the headers that will be used when fetching the response
            const headers = {
                'Authorization': `Bearer ${token}`,
                'UserName': user && user.name,
            };

            // Getting the response from "/item" with the set headers
            const response = await fetch('/item', { headers });
            const data = await response.json();

            setItems(data);
            setLoading(false);
        };

        fetchData();
    }, [userName]);

    // Checking which amenities each item has, adding them to an array and returning the final string of amenities
    const renderAmenities = (item) => {
        // Initializing the array
        var amenities = [];

        // Checking what amenities the item has
        if (item.hasWifi) {
            amenities.push("Wifi");
        }

        if (item.hasTV) {
            amenities.push("TV");
        }

        if (item.hasKitchen) {
            amenities.push("Kitchen");
        }

        if (item.hasWashingMachine) {
            amenities.push("Washing Machine");
        }

        if (item.hasFreeParking) {
            amenities.push("Free Parking");
        }

        if (item.hasPaidParking) {
            amenities.push("Paid Parking");
        }

        if (item.hasAirCondition) {
            amenities.push("Air Condition");
        }

        if (item.hasPool) {
            amenities.push("Pool");
        }

        // Joining the amenities the item has into a single string with commas seperating the amenities
        var finalstring = amenities.join(', ');

        // Returning the final string
        return finalstring;
    }

    // Rendering the userProperties-table, only displaying properties added by the current user
    // Taking items and userName as arguments
    const renderUserPropertiesTable = (items, userName) => (
        <>
            { /* Link (button) to /create to create a new property */ }
            <Link to="/create" className="btn btn-outline-info text-dark">
                Add New Property
            </Link>
            <br></br>
            <br></br>

            { /* Table with contents */ }
            <table className='table' style={{ borderCollapse: 'separate', borderSpacing: '0px 2rem' }} aria-labelledby="tabelLabel">
                <thead>
                    <tr style={{ textTransform: 'uppercase' }}>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>Rooms</th>
                        <th>Type</th>
                        <th>Publisher UserName</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { /* Filtering based on key values, item.userName and userName */ }
                    { /* Source: https://stackabuse.com/how-to-filter-an-object-by-key-in-javascript/ */}
                    {items.filter(item => item.userName === userName)
                        // Iterating over the filtered items and displaying them as table rows
                        .map(item => (
                            <tr key={item.itemId} style={{ height: '150px', backgroundColor: '#f0f0f0' }} >
                                <td className="rounded-left">{item.itemId}</td>
                                { /* Getting the image based on the items imageUrl */}
                                { /* Source: https://stackoverflow.com/questions/47196800/reactjs-and-images-in-public-folder */}
                                <td>
                                    <a href={`details/${item.itemId}`}>
                                        <img src={process.env.PUBLIC_URL + item.imageUrl} alt="House" style={{ height: '150px', width: '250px' }} />
                                    </a>
                                </td>
                                <td><a href={`details/${item.itemId}`} style={{  textDecoration: 'none', color: 'black', fontSize: '20px' }}>{item.name}</a></td>
                                <td>{item.price} NOK/Night</td>
                                <td>{item.location}</td>
                                <td>{item.rooms}</td>
                                <td>{item.propertyType}</td>
                                <td>{item.userName}</td>

                                { /* Checking if current username is the same as the username of the publisher */}
                                { /* Only displaying the actions if they are the same */}
                                <td className="rounded-right">
                                    {item.userName === userName && (
                                        <>
                                            <a href={`update/${item.itemId}`} className="btn btn-outline-info" style={{ margin: '5px', color: 'black' }}>Update</a>
                                            <a href={`delete/${item.itemId}`} className="btn btn-outline-danger" style={{ margin: '5px', color: 'black' }}>Delete</a>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );

    // Returning the contents (User Properties Table) with the items and userName as arguments
    return (
        <div className="box">
            <br></br>
            <h1 id="tabelLabel">My Properties</h1>
            <br></br>
            {loading ? <p><em>Loading...</em></p> : renderUserPropertiesTable(items, userName)}
            <br></br>
        </div>
    );
}

export default UserProperties;
