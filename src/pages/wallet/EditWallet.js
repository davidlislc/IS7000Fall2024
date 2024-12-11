import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGiftCard } from './store'; // Assuming the thunk is exported from your store file

function EditWallet({ onSave, isAddingGiftCard, walletData }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.wallet);

  const [name, setName] = useState(walletData ? walletData.name : 'My name');
  const [credit, setCredit] = useState(walletData ? walletData.credit : 250);
  const [giftcard, setGiftcard] = useState(walletData ? walletData.giftcard : (isAddingGiftCard ? 0 : 50));

  useEffect(() => {
    if (walletData) {
      setName(walletData.name);
      setCredit(walletData.credit);
      setGiftcard(walletData.giftcard);
    }
  }, [walletData]);

  const handleSave = () => {
    dispatch(
      saveGiftCard({
        id: walletData ? walletData.id : 1, // Default to 1 if no walletData
        name,
        credit,
        giftcard,
      })
    ).then(() => {
      if (!error) {
        onSave();
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{isAddingGiftCard ? 'Add Gift Card' : 'Edit Wallet'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Credit</label>
        <input
          type="number"
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Gift Card Balance</label>
        <input
          type="number"
          value={giftcard}
          onChange={(e) => setGiftcard(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
}

export default EditWallet;
