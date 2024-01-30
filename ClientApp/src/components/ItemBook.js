import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService';
import axios from 'axios';
import { Link } from 'react-router-dom';

// ItemBook component
// Pretty much the same as ItemUpdate.js
function ItemBook() {
    const navigate = useNavigate();
    // Getting the itemId from the URL-parameter
    const { itemId } = useParams();
    // Setting the initial state of the item
    const [item, setItem] = useState(null);
    // Setting the initial state of the user
    const [userName, setUserName] = useState(null);
    // Setting the initial state for updated item values
    const [updatedItem, setUpdatedItem] = useState({
        fromDateDay: '',
        fromDateMonth: '',
        fromDateYear: '',
        toDateDay: '',
        toDateMonth: '',
        toDateYear: '',
    });

    const [totalDays, setTotalDays] = useState();
    const [totalPrice, setTotalPrice] = useState();

    // Fetching data asynchronously from the url "localhost:port/item"
    // Source: https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Getting response from the /item endpoint
                const response = await fetch('https://localhost:44417/item');
                const data = await response.json();

                // Only selecting the item with the same itemId as the one in the URL-parameter
                const selectedItem = data.find((item) => item.itemId.toString() === itemId);
                if (selectedItem) {
                    setItem(selectedItem);
                    setUpdatedItem({
                        ...selectedItem,
                        PublisherUserName: selectedItem.userName,
                        BookerUserName: userName
                    });
                } else {
                    throw new Error('Item not found');
                }
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchData();
    }, [itemId, userName]);

    // Getting and setting the user and username using authService
    useEffect(() => {
        const fetchUser = async () => {
            const user = await authService.getUser();
            setUserName(user && user.name);
        };

        fetchUser();
    }, []);

    useEffect(() => {
        // Check if all date fields have values
        if (
            updatedItem.fromDateDay &&
            updatedItem.fromDateMonth &&
            updatedItem.fromDateYear &&
            updatedItem.toDateDay &&
            updatedItem.toDateMonth &&
            updatedItem.toDateYear
        ) {
            // Creating new Dates using the values from the input-fields
            const fromDate = new Date(
                updatedItem.fromDateYear,
                updatedItem.fromDateMonth - 1, // Month is zero-based
                updatedItem.fromDateDay
            );
            const toDate = new Date(
                updatedItem.toDateYear,
                updatedItem.toDateMonth - 1, // Month is zero-based
                updatedItem.toDateDay
            );

            // Calculate the difference in days
            const timeDifference = toDate.getTime() - fromDate.getTime();
            const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            const totalPrice = daysDifference * updatedItem.price;

            // Update totalDays state
            setTotalDays(daysDifference);

            // Update totalPrice state
            setTotalPrice(totalPrice);
        } else {
            // If any of the date fields is empty, reset totalDays to 0
            setTotalDays(0);
            setTotalPrice(0);
        }
    }, [updatedItem]);

    // Handling the updating of an item
    const handleUpdate = async (e) => {
        // Prevent loading page with the input-values as the URL-parameters
        e.preventDefault();

        try {
            setUpdatedItem((prevItem) => ({ ...prevItem, BookerUserName: userName }));

            // Calculating totalDays by first converting the values to a date
            const fromDate = new Date(
                updatedItem.fromDateYear,
                updatedItem.fromDateMonth - 1, // Month is zero-based
                updatedItem.fromDateDay
            );
            const toDate = new Date(
                updatedItem.toDateYear,
                updatedItem.toDateMonth - 1, // Month is zero-based
                updatedItem.toDateDay
            );

            // Calculating the actual difference by subtracting toDate from fromDate
            const timeDifference = toDate.getTime() - fromDate.getTime();
            const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            const totalPrice = totalDays * updatedItem.price;

            // Sending the updatedItem values to the /book/create endpoint, saving the data to the database
            const response = await axios.post('/book/create', {
                ...updatedItem,
                fromDateDay: fromDate,
                toDateDay: toDate,
                totalDays: totalDays,
                totalPrice: totalPrice,
            });

            navigate('/userBookings');

            console.log('Property booked successfully: ', response.item);
        } catch (error) {
            console.error('Error booking property: ', error);
        }
    };

    // Handling input changes for updating the item
    const handleInputChange = (event) => {
        // Getting different properties of the input elements
        const { name, value } = event.target;

        setUpdatedItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    // If no item is found, continue loading
    if (!item) {
        return <p>Loading...</p>;
    }

    // Checking if the userName of the currently logged in user is the same as the userName of the item
    if (userName === item.userName) {
        // The user should not be able to book their own property
        return <h1>You can't book your own property!</h1>
    }

    // Returning the details of the specific item with input fields for booking
    return (
        <div id="body" className="col-md-3 mx-auto">
            <br/>
            <h2>Book Property: {item && item.name}</h2>
            <h3>Price Per Day: {item.price}</h3>
            <br></br>
            <form onSubmit={handleUpdate} autoComplete="off">
                {/* Input for startDay */}
                <div className="form-group md-4">
                    <div className="form-floating">
                        <input
                            name="fromDateDay"
                            type="text"
                            value={updatedItem.fromDateDay}
                            onChange={handleInputChange}
                            id="fromDateDay"
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="fromDateDay">
                            From Date Day:
                        </label>
                    </div>
                </div>
                <br />

                {/* Input for startMonth */}
                <div className="form-group mb-4">
                    <div className="form-floating">
                        <input
                            name="fromDateMonth"
                            type="text"
                            value={updatedItem.fromDateMonth}
                            onChange={handleInputChange}
                            id="fromDateMonth"
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="fromDateMonth">
                            From Date Month:
                        </label>
                    </div>
                </div>

                {/* Input for startYear */}
                <div className="form-group mb-4">
                    <div className="form-floating">
                        <input
                            name="fromDateYear"
                            type="text"
                            value={updatedItem.fromDateYear}
                            onChange={handleInputChange}
                            id="fromDateYear"
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="fromDateYear">
                            From Date Year:
                        </label>
                    </div>
                </div>

                {/* Input for endDay */}
                <div className="form-group mb-4">
                    <div className="form-floating">
                        <input
                            name="toDateDay"
                            type="text"
                            value={updatedItem.toDateDay}
                            onChange={handleInputChange}
                            id="toDateDay"
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="toDateDay">
                            To Date Day:
                        </label>
                    </div>
                </div>

                {/* Input for endMonth */}
                <div className="form-group mb-4">
                    <div className="form-floating">
                        <input
                            name="toDateMonth"
                            type="text"
                            value={updatedItem.toDateMonth}
                            onChange={handleInputChange}
                            id="toDateMonth"
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="toDateMonth">
                            To Date Month:
                        </label>
                    </div>
                </div>

                {/* Input for endYear */}
                <div className="form-group mb-4">
                    <div className="form-floating">
                        <input
                            name="toDateYear"
                            type="text"
                            value={updatedItem.toDateYear}
                            onChange={handleInputChange}
                            id="toDateYear"
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="toDateYear">
                            To Date Year:
                        </label>
                    </div>
                </div>

                <p>Total Days: {totalDays}</p>
                <p>Total Price: {totalPrice}</p>

                { /* Displaying an "error"-message if totalDays <= 0 */ }
                {totalDays <= 0 && <p>Total Days must be positive!</p> }
                <p hidden>Total Days must be positive!</p>

                {/* Submit button */}
                {/* Is disabled unless the totalDays > 0 */}
                <input
                    type="submit"
                    value="Book Item"
                    className="btn btn-lg btn-outline-info w-100"
                    style={{ color: 'black' }}
                    disabled={totalDays <= 0}
                />
                <Link to={`../details/${item.itemId}`} className="btn btn-outline-secondary text-dark w-100 mt-2">Cancel</Link>
            </form>
            <br />
            <br />
        </div>
    );
}

// Exporting the component
export default ItemBook;
