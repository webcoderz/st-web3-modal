import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// This is the chain your dApp will work on.
const activeChain = 'ethereum';

// Read-only mode
const readOnlySdk = new ThirdwebSDK("ethereum", {
  clientId: "78975f0675bf621a560b43a957d2f57b", // Use client id if using on the client side, get it from dashboard settings
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
