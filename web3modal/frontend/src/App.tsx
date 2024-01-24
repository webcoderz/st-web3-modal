import React, { ReactNode, createRef } from "react";
import { ConnectWallet, darkTheme, lightTheme } from "@thirdweb-dev/react";
import styles from "./styles/Home.module.css";
import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib";

interface State {
  address: string | null;
  frameHeight: number;
  prevAddress: string | null;
}

class Connect extends StreamlitComponentBase<State> {
  public state = {
    address: null,
    frameHeight: this.props.args["modal_size"] === "wide" ? 550 : 350, // Set initial frame height based on modal size
    prevAddress: null
  };

  private containerRef = createRef<HTMLDivElement>();

  public componentDidMount() {
    // Tell Streamlit we're ready to start receiving data
    Streamlit.setComponentReady();
  
    // Determine the initial frame height based on the content to be shown
    let initialHeight = this.state.address ? 200 : 350; // Set to 200 if no address is connected
  
    // Update the state with the initial frame height
    this.setState({ frameHeight: initialHeight }, () => {
      // Set the frame height in Streamlit after the state is updated
      Streamlit.setFrameHeight(this.state.frameHeight);
    });
  
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', this.handleAccountsChanged);
      window.ethereum.on('chainChanged', this.handleAccountsChanged);
      window.ethereum.on('disconnect', this.handleAccountsChanged);
    }
  }
  private adjustFrameHeight() {
    let newHeight = this.state.address ? 450 : 200; // Set to 200 if no address is connected
  
    // Set the new frame height
    Streamlit.setFrameHeight(newHeight);
  }

  public componentDidUpdate() {
    // Send the address back to Streamlit only if it has changed
    if (this.state.address !== this.state.prevAddress) {
      try {
        Streamlit.setComponentValue({ address: this.state.address || "None" });
      } catch (error) {
        console.error("Error in componentDidUpdate:", error);
      }
    }

    // Update prevAddress with the current address
    this.setState({ prevAddress: this.state.address });

  };

  private handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // Wallet is disconnected
      this.setState({ address: null }, () => {
        this.adjustFrameHeight(); // Adjust frame height after state update
        Streamlit.setComponentValue({ address: "None" }); // Update Streamlit with the new address value
        this.setState({ prevAddress: null }); // Update prevAddress after address has been set to null
      });
    } else {
      // Wallet is connected
      const newAddress = accounts[0];
      this.setState({ address: newAddress }, () => {
        this.adjustFrameHeight(); // Adjust frame height after state update
        Streamlit.setComponentValue({ address: newAddress }); // Update Streamlit with the new address value
        this.setState({ prevAddress: newAddress }); // Update prevAddress after address has been set to the new address
      });
    }
  };
  private handleConnectWallet = async () => {
    try {
      // Connect the wallet using MetaMask ethereum object
      await window.ethereum.enable();
  
      // Get the connected wallet address
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const walletAddress = accounts[0];
  
      this.setState({ address: walletAddress }, () => {
        this.adjustFrameHeight(); // Adjust frame height after state update
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  public render = (): ReactNode => {
    // Retrieve properties from Streamlit
    const btnTheme = this.props.args["button_theme"];
    const modalSize = this.props.args["modal_size"];
    const welcomeTitle = this.props.args["welcome_title"];
    const welcomeSubtitle = this.props.args["welcome_subtitle"];
    const btnTitle = this.props.args["button_title"];
    const { theme } = this.props;
    const style: React.CSSProperties = {};
    // Maintain compatibility with older versions of Streamlit that don't send
    // a theme object.
    const themeToUse = btnTheme === "dark" ? darkTheme : lightTheme;
    return (
      <div ref={this.containerRef} className={styles.container}>
        <ConnectWallet
          theme={themeToUse({
            colors: {
              primaryButtonText: theme?.textColor,
              accentButtonBg: theme?.primaryColor,
              primaryButtonBg: theme?.secondaryBackgroundColor,
              secondaryButtonBg: theme?.primaryColor,
            },
          })}
          modalSize={modalSize || "compact"}
          welcomeScreen={{
            title: welcomeTitle || "Welcome",
            subtitle: welcomeSubtitle || "Connect your wallet to get started",
          }}
          btnTitle={btnTitle || "Connect Wallet"}
          style={style}
          onConnect={this.handleConnectWallet}

        />
      </div>
    );
  }


}

export default withStreamlitConnection(Connect);
