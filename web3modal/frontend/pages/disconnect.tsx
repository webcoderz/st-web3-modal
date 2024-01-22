// Disconnect.tsx
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useDisconnect } from "@thirdweb-dev/react";
import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";
import React, { useEffect } from "react";
import { useAppContext } from "../pages/contexts/AppContext";

const Disconnect: NextPage = () => {
  const { address, setAddress } = useAppContext();
  const disconnect = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
    setAddress(null);
  };

  // Tell Streamlit we're ready to start receiving data
  useEffect(() => {
    Streamlit.setComponentReady();
    Streamlit.setFrameHeight(600);
  }, []);

  return (
    <div className={styles.container}>
      {address && (
        <button className={styles.connectWalletButton} onClick={handleDisconnect}>
          Disconnect
        </button>
      )}
    </div>
  );
};

export default withStreamlitConnection(Disconnect);
