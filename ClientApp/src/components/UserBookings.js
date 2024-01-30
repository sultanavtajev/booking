import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService';
import './css/Item.css';

function UserProperties() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState(null);

    // Fetching data asynchronously from "/book" with the headers
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

            // Getting the response from "/book" with the set headers
            const response = await fetch('/book', { headers });
            const data = await response.json();

            setItems(data);
            setLoading(false);
        };

        fetchData();
    }, [userName]);

    // Rendering the userProperties-table, only displaying properties added by the current user
    // Taking items and userName as arguments
    const renderUserBookingsTable = (items, userName) => (
        <>
            <table className='table' style={{ borderCollapse: 'separate', borderSpacing: '0px 2rem' }} aria-labelledby="tabelLabel">
                <thead>
                    <tr style={{ textTransform: 'uppercase' }}>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Total Days</th>
                        <th>Landlord</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    { /* Filtering based on key values, item.bookerUserName and userName */}
                    { /* Source: https://stackabuse.com/how-to-filter-an-object-by-key-in-javascript/ */}
                    {items.filter(item => item.bookerUserName === userName)
                        // Iterating over the filtered items and displaying them as table rows
                        .map(item => (
                            <tr key={item.bookingId} style={{ height: '150px', backgroundColor: '#f0f0f0' }} >
                                <td className="rounded-left">{item.bookingId}</td>

                                { /* Getting the image based on the items imageUrl */}
                                { /* Source: https://stackoverflow.com/questions/47196800/reactjs-and-images-in-public-folder */}
                                <td>
                                    <a href={`details/${item.itemId}`}>
                                        <img src={process.env.PUBLIC_URL + item.imageUrl} alt="House" style={{ height: '150px', width: '250px' }} />
                                    </a>
                                </td>

                                <td><a href={`details/${item.itemId}`} style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}>{item.name}</a></td>

                                { /* Converting from date object to date-string with DD-MM-YYYY format */}
                                { /* Source: https://forum.freecodecamp.org/t/how-to-convert-date-to-dd-mm-yyyy-in-react/431093/2, suggestion by user Abraham1973 */ }
                                <td>{new Date(item.fromDateDay).toLocaleDateString()}</td>
                                <td>{new Date(item.toDateDay).toLocaleDateString()}</td>

                                <td>{item.totalDays}</td>
                                <td>{item.publisherUserName}</td>
                                <td>{item.totalPrice} NOK</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );

    return (
        <div className="box">
            <br></br>
            <h1 id="tabelLabel">My Bookings</h1>
            <br></br>
            {loading ? <p><em>Loading...</em></p> : renderUserBookingsTable(items, userName)}
            <br></br>
        </div>
    );
}

export default UserProperties;
