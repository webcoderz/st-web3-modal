import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";
import React from "react";
import { useState, useEffect } from "react";

const Disconnect: NextPage = () => {
  const address = useAddress();
  const disconnect = useDisconnect();
  // Tell Streamlit we're ready to start receiving data
  useEffect(() => {
    Streamlit.setComponentReady();
    Streamlit.setFrameHeight(600)
  }, []);
  return (
    <div className={styles.container}>
      {address && (
        <button className={styles.connectWalletButton} onClick={disconnect}>
          Disconnect
        </button>
      )}
    </div>
  );
};

export default withStreamlitConnection(Disconnect);