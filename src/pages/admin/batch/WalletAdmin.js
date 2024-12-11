import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallet } from './walletSlice';
import UpdateWallet from './UpdateWallet';

const WalletAdmin = () => {
    const dispatch = useDispatch();
    const { walletData, loading, error } = useSelector((state) => state.wallet);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        dispatch(fetchWallet());
    }, [dispatch]);

    const handleUpdateClick = () => {
        setIsUpdating((prev) => !prev);
    };

    const handleSave = (updatedWallet) => {
        // Handle save logic here, if needed
        setIsUpdating(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Wallet Admin</h1>
                    <button
                        onClick={handleUpdateClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        {isUpdating ? 'Cancel Update' : 'Update Wallet'}
                    </button>
                </div>
            </div>

            {/* Update Wallet Section */}
            {isUpdating && walletData && (
                <div className="mb-6">
                    <UpdateWallet walletData={walletData} onSave={handleSave} />
                </div>
            )}
        </div>
    );
};

export default WalletAdmin;
