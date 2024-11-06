import React, { useState } from 'react';

const PaymentPage = ({ amount, onClose }) => {
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState(null);

    const handlePayment = () => {
        setProcessing(true);
        
        setTimeout(() => {
            const dummyTransactionId = `TRANS-${Math.floor(Math.random() * 1000000)}`;
            setTransactionId(dummyTransactionId);
            setProcessing(false);
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Payment Gateway</h2>
                {processing ? (
                    <div className="mt-4">
                        <p className="text-gray-600">Processing your payment...</p>
                        <div className="loader"></div> {}
                    </div>
                ) : (
                    <>
                        <p className="mt-4 text-gray-600">Amount: ${amount}</p>
                        <button
                            className="mt-4 w-full p-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-200 ease-in-out"
                            onClick={handlePayment}
                        >
                            Pay Now
                        </button>
                        {transactionId && (
                            <div className="mt-4">
                                <p className="text-green-600">Payment Successful!</p>
                                <p>Transaction ID: {transactionId}</p>
                            </div>
                        )}
                    </>
                )}
                <button
                    className="mt-4 w-full p-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-200 ease-in-out"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
