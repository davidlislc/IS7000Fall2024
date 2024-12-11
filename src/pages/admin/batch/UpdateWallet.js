import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateWallet } from './walletSlice';

const UpdateWallet = ({ onSave }) => {
    const dispatch = useDispatch();
    const { walletData } = useSelector((state) => state.wallet);
    const { currentUser } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        id: walletData?.id || '',
        name: walletData?.name || '',
        credit: walletData?.credit || 0,
        giftcard: walletData?.giftcard || 0,
        user: walletData?.user?.id || '',
    });

    useEffect(() => {
        if (walletData) {
            setFormData({
                id: walletData.id,
                name: walletData.name,
                credit: walletData.credit,
                giftcard: walletData.giftcard,
                user: walletData.user?.id || '',
            });
        }
    }, [walletData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedWallet = {
            ...formData,
            user: {
                id: formData.user,
                login: currentUser?.login,
                firstName: currentUser?.firstName,
                lastName: currentUser?.lastName,
                email: currentUser?.email,
            },
        };
        dispatch(updateWallet(updatedWallet)).then(() => {
            alert('Wallet updated successfully.');
            onSave(updatedWallet);
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white border rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Wallet</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Credit</label>
                    <input
                        type="number"
                        name="credit"
                        value={formData.credit}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Gift Card</label>
                    <input
                        type="number"
                        name="giftcard"
                        value={formData.giftcard}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">User</label>
                    <select
                        name="user"
                        value={formData.user}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="" disabled>Select User</option>
                        <option value={walletData?.user?.id}>
                            {walletData?.user?.firstName} {walletData?.user?.lastName} ({walletData?.user?.email})
                        </option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600"
                >
                    Update Wallet
                </button>
            </form>
        </div>
    );
};

export default UpdateWallet;
