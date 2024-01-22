// Connect.tsx
import { ConnectWallet } from "@thirdweb-dev/react";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";
import React, { useEffect } from "react";
import { useAppContext } from "./AppContext";

const Connect: NextPage = () => {
  const address = useAddress();
  const [prevAddress, setPrevAddress] = useState("");

  // Tell Streamlit we're ready to start receiving data
  useEffect(() => {
    Streamlit.setComponentReady();
    Streamlit.setFrameHeight(600);
  }, []);

  // Send the address back to Streamlit whenever it changes
  useEffect(() => {
    try {
      if (address !== prevAddress) {
        Streamlit.setComponentValue({ address: address });
        setPrevAddress(address || "None");
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, [address]);

  return (
    <div className={styles.container}>
      {!address && <ConnectWallet className={styles.connectWalletButton} />}
    </div>
  );
};

export default withStreamlitConnection(Connect);
