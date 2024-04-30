import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";

function App() {
  const [currentAccount, setCurrentAccount] = useState('');

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Metamask not detected');
        return;
      }

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log('Connected to chain:', chainId);

      const sepoliaChainId = '0x7a69'; // Sepolia chain ID

      if (chainId !== sepoliaChainId) {
        alert('You are not connected to the Sepolia network!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Found account', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log('Error connecting to Metamask', error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      {currentAccount === '' ? (
        <button
          className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : (
        <div className="app">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
