import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CarouselTest from './CarouselTest';
import './css/ItemDetails.css';
import { renderAmenities } from './Item';

// ItemDetails component
function ItemDetails() {
    // Getting the itemId from the URL-parameter
    const { itemId } = useParams();
    // Setting the initial state of the item
    const [item, setItem] = useState(null);

    // Fetching data asynchronously from the url "localhost:port/item"
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:44417/item');
                const data = await response.json();
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

    if (!item) {
        return <p>Loading...</p>;
    }

    // Returning the details of the specific item
    return (
        <>
        <div className="container detail"> 
            <div className="box">
                <div className="row">
                    <h3>{item.name}</h3>
                    <hr style={{ marginBottom: '50px' }} />

                    <div className="col-5">
                        <CarouselTest item={item} />
                        <br />
                    </div>
                    <div className="col-7">
                        <div>
                            <div className="row" style={{ margin: '50px' }}>
                                <div className="col h-50">
                                    <p className="mb-2"><strong>{item.description}</strong></p>
                                    <p className="mb-2"><small>{item.price} NOK/Night</small></p>
                                    <p className="mb-2"><i className="bi bi-geo-alt">{item.location}</i></p>
                                </div>
                                <div className="col h-50" >
                                    <p className="mb-2"><strong>Rooms: </strong>{item.rooms}</p>
                                    <p className="mb-2"><strong>Beds: </strong>{item.beds}</p>
                                    <p style={{ marginBottom: '50px' }} className="mb-2"><strong>Amenities: </strong>{renderAmenities(item)}</p>
                                </div>
                                
                            </div>
                            <div className="row">
                                <Link to={`/book/${item.itemId}`} className="btn btn-outline-info text-dark w-50 mx-auto">Book Property</Link><br></br>
                                </div>
                            <div className="row">
                                <Link to={'/all-items'} className="btn btn-outline-secondary text-dark w-50 mx-auto mt-2">Cancel</Link>
                            </div>
                        </div>
                    </div>

            </div>
            </div>
        </div>
        </>
    );
}

// Exporting the component
export default ItemDetails;
