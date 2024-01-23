// Connect.tsx
import { ConnectWallet } from "@thirdweb-dev/react";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";
import React, { useEffect, useState } from "react";

const Connect: NextPage = () => {
  const [address, setAddress] = useState<string | null>(null);

  // Tell Streamlit we're ready to start receiving data
  useEffect(() => {
    Streamlit.setComponentReady();
    Streamlit.setFrameHeight(600);
  }, []);

  // Send the address back to Streamlit whenever it changes
  useEffect(() => {
    try {
      Streamlit.setComponentValue({ address: address || "None" });
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, [address]);

  const handleConnectWallet = async () => {
    try {
      // Connect the wallet using MetaMask ethereum object
      await window.ethereum.enable();
      
      // Get the connected wallet address
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const walletAddress = accounts[0];

      setAddress(walletAddress);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className={styles.container}>
      {true && (
        <ConnectWallet
          modalSize="wide"
          welcomeScreen={{
            title: "Welcome to GeNFT",
            subtitle: "Connect your wallet to get started",
          
          }}
          theme="dark"
          btnTitle="Login to GeNFT"
          className={styles.connectWalletButton}
          onConnect={handleConnectWallet}
        />
      )}
      
    </div>
  );
};

export default withStreamlitConnection(Connect);