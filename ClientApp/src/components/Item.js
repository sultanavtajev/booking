// Sources:
// Sorting: https://www.florin-pop.com/blog/2019/07/sort-table-data-with-react/
// Filtering/searching: https://codesandbox.io/s/musing-khorana-ouviu?file=/src/App.js

import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService';
import { Link } from 'react-router-dom';
import './css/Item.css';

// Rendering the amenities of an item
export const renderAmenities = (item) => {
    // Initializing the array of amenities
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

    // Joining the amenities the item has into a single string with commas separating the amenities
    var finalstring = amenities.join(', ');

    // Returning the final string
    return finalstring;
};

const Item = () => {
    // Setting initial states
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState(null);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState({ fieldToSort: '', direction: 'default' });

    useEffect(() => {
        const fetchData = async () => {
            const user = await authService.getUser();
            setUserName(user && user.name);

            populateItemData();
        };

        fetchData();
    }, []);

    // Rendering the table with all items
    const renderItemsTable = () => (
        <>
            { /* Search-bar */}
            { /* The input sets the value (query) which is then used when calling the setQuery function */}
            { /* This value is then used in the getFilteredItems to filter the items based on the query */}
            <input type="text" placeholder="Search by name" value={query} onChange={(e) => setQuery(e.target.value)} style={{ borderColor: 'lightGray', borderRadius: '10px', padding: '5px' }} />
            <br></br>
            <br></br>

            <table style={{ borderCollapse: 'separate', borderSpacing: '0px 2rem' }} className='table' aria-labelledby="tabelLabel">
                <thead>
                    <tr style={{ textTransform: 'uppercase' }}>
                        { /* Calling handleHeaderClick() when pressing a table header */ }
                        { /* Styling the header so that it becomes a 'pointer' when hovering over it */}
                        { /* Displaying arrows next to the pressed table-header to indicate which direction the sorting is */ }
                        <th onClick={() => handleHeaderClick("ItemId")} style={{ cursor: 'pointer', color: 'black' }}>
                            <span><u>Id</u></span>
                            {sort.fieldToSort === "ItemId" && sort.direction !== 'default' && (sort.direction === 'asc' ? '🔼' : '🔽')}
                        </th>
                        <th>Image</th>
                        <th onClick={() => handleHeaderClick("Name")} style={{ cursor: 'pointer', color: 'black' }}>
                            <span><u>Name</u></span>
                            {sort.fieldToSort === "Name" && sort.direction !== 'default' && (sort.direction === 'asc' ? '🔼' : '🔽') }
                        </th>
                        <th onClick={() => handleHeaderClick("Price")} style={{ cursor: 'pointer', color: 'black' }}>
                            <span><u>Price</u></span>
                            {sort.fieldToSort === "Price" && sort.direction !== 'default' && (sort.direction === 'asc' ? '🔼' : '🔽')}
                        </th>
                        <th onClick={() => handleHeaderClick("Location")} style={{ cursor: 'pointer', color: 'black' }}>
                            <span><u>Location</u></span>
                            {sort.fieldToSort === "Location" && sort.direction !== 'default' && (sort.direction === 'asc' ? '🔼' : '🔽')}
                        </th>
                        <th onClick={() => handleHeaderClick("Rooms")} style={{ cursor: 'pointer', color: 'black' }}>
                            <span><u>Rooms</u></span>
                            {sort.fieldToSort === "Rooms" && sort.direction !== 'default' && (sort.direction === 'asc' ? '🔼' : '🔽')}
                        </th>
                        <th>Type</th>
                        <th>Landlord</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { /* Displaying the filtered items based on the input in the search-bar */ }
                    {getFilteredItems(query, items).map((item) => (
                        <tr key={item.itemId} style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
                            <td className="rounded-left">{item.itemId}</td>
                            <td>
                                <a href={`details/${item.itemId}`}>
                                    <img src={process.env.PUBLIC_URL + item.imageUrl} alt="House" style={{ height: '150px', width: '250px' }} />
                                </a>
                            </td>
                            <td><a href={`details/${item.itemId}`} style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}>{item.name}</a></td>
                            <td>{item.price} NOK/Night</td>
                            <td>{item.location}</td>
                            <td>{item.rooms}</td>
                            <td>{item.propertyType}</td>
                            <td>{item.userName}</td>
                            <td className="rounded-right">
                                {item.userName === userName && (
                                    <>
                                        <a href={`update/${item.itemId}`} className="btn btn-outline-info" style={{ color: 'black', margin: '5px' }}>Update</a>
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

    // Called when user clicks the table headers that can be used to sort
    function handleHeaderClick(field) {
        // Sorts by 'default' initially
        let nextDirection = 'default';

        // When table header is pressed once, it should first sort the items in descending order
        if (sort.direction === 'default') {
            nextDirection = 'desc';
        }
        // If the sort-direction is 'desc' and the table-header is pressed again, it should then sort the items in ascending order
        else if (sort.direction === 'desc') {
            nextDirection = 'asc';
        }
        // If sort.direction === 'asc' and the header is pressed again, it fall backs to 'default' so we don't need an extra if-statement to check this condition

        // Setting the sorting based on the field that was pressed, as well as the direction of the sorting
        setSort({
            fieldToSort: field,
            direction: nextDirection
        });
    }

    // Filtering items based on the query (input) in the search-bar
    // Source: https://codesandbox.io/s/musing-khorana-ouviu?file=/src/App.js
    const getFilteredItems = (query, items) => {
        // Filtering based on the names of the items
        let filteredItems = items.filter((item) => item.name.includes(query));

        // Sorting based on the field
        // Source: https://www.youtube.com/watch?v=ran0d8WHTYs
        if (sort.direction !== 'default') {
            const sortField = sort.fieldToSort;

            // Sorting the items
            // String comparison using localeCompare, source: https://www.youtube.com/watch?v=ran0d8WHTYs
            // For example, comparing a.name to b.name, multiplying the result by either 1 if ascending or -1 if descending
            filteredItems = [...filteredItems].sort((a, b) => {
                if (sortField === 'Name') {
                    return a.name.localeCompare(b.name) * (sort.direction === 'asc' ? 1 : -1);
                } else if (sortField === 'Price') {
                    return (a.price - b.price) * (sort.direction === 'asc' ? 1 : -1);
                } else if (sortField === 'Location') {
                    return a.location.localeCompare(b.location) * (sort.direction === 'asc' ? 1 : -1);
                } else if (sortField === 'ItemId') {
                    return (a.itemId - b.itemId) * (sort.direction === 'asc' ? 1 : -1);
                } else if (sortField === 'Rooms') {
                    return (a.rooms - b.rooms) * (sort.direction === 'asc' ? 1 : -1);
                }
                return 0;
            });
        }

        return filteredItems;
    };

    // Fetching the data from /item asynchronously
    const populateItemData = async () => {
        const token = await authService.getAccessToken();

        // Setting the headers
        const headers = {
            'Authorization': `Bearer ${token}`,
            'UserName': userName
        };

        // Fetching the response
        const response = await fetch('/item', { headers });
        const data = await response.json();

        // Updating the state
        setItems(data);
        setLoading(false);
    };

    // Loading the items
    const contents = loading
        ? <p><em>Loading...</em></p>
        : renderItemsTable();

    // Displaying the contents (table)
    return (
            <div className="box">
                <br></br>
                <h1 id="tabelLabel">Properties</h1>
                <br></br>
                {contents}
                <br></br>
            </div>
  
    );
};

export default Item;