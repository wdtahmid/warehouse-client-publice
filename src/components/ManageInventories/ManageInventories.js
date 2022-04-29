import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import InventoryUi from '../InventoryUi/InventoryUi';

const ManageInventories = () => {

    const navigate = useNavigate();
    const addNewItem = () => {
        navigate('/additem')
    }

    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:5000/manageinventories';
        fetch(url)
            .then(res => res.json())
            .then(data => setInventories(data))
    }, [])


    //delete item
    const deleteThisItem = (id) => {
        const url = `http://localhost:5000/manageinventories/${id}`;

        fetch(url, {
            'method': 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    const remaining = inventories.filter(i => i._id !== id)
                    console.log('Item deleted');
                    setInventories(remaining);
                    console.log(data);
                }
            })

    }

    return (
        <div>
            <div className='containar-fluid py-5 bg-dark'>
                <h1 className='mt-5 text-uppercase text-white'>Manage Inventoies</h1>
                <Button onClick={addNewItem} variant="outline-info" className='mb-5 mt-2'>Add New Item</Button>
            </div>
            <div className='container'>
                <div className="row mt-5 mb-5">            {
                    inventories.map(inventory => <InventoryUi
                        key={inventory._id}
                        inventory={inventory}
                        deleteThisItem={deleteThisItem}
                    ></InventoryUi>)
                }
                </div>
            </div>
        </div>
    );
};

export default ManageInventories;