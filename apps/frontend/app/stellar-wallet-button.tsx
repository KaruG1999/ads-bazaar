"use client";

import { useEffect, useState } from "react";
import {
  getAddress,
  getNetworkDetails,
  isAllowed,
  isConnected,
  requestAccess,
} from "@stellar/freighter-api";

export type WalletState = {
  address: string;
  network: string;
};

type StellarWalletButtonProps = {
  className?: string;
  label?: string;
  onConnected?: (wallet: WalletState) => void;
  size?: "default" | "large";
};

const connectButtonClass =
  "inline-flex min-h-10.5 cursor-pointer items-center justify-center rounded-full border-0 bg-[linear-gradient(180deg,var(--lime),var(--lime-2))] px-5 py-3 text-[13px] font-black text-[#102014] shadow-[0_18px_40px_rgba(216,255,40,0.18)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lime)] disabled:cursor-wait disabled:opacity-70";

const walletChipClass =
  "inline-flex min-h-10.5 min-w-36 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full border border-[rgba(216,255,40,0.52)] bg-[rgba(247,248,242,0.94)] px-4 py-2 text-[var(--ink)] shadow-[0_18px_40px_rgba(216,255,40,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lime)]";

const largeClass = "min-h-13 px-7 py-4";

const shortenAddress = (address: string) =>
  `${address.slice(0, 5)}...${address.slice(-5)}`;

const getErrorMessage = (error: unknown) => {
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  return "Unable to connect wallet.";
};

export function StellarWalletButton({
  className = "",
  label = "Connect wallet",
  onConnected,
  size = "default",
}: StellarWalletButtonProps) {
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [status, setStatus] = useState(label);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const sizeClass = size === "large" ? largeClass : "";

  useEffect(() => {
    let isMounted = true;

    const restoreWallet = async () => {
      const connected = await isConnected();

      if (connected.error || !connected.isConnected) {
        return;
      }

      const allowed = await isAllowed();

      if (allowed.error || !allowed.isAllowed) {
        return;
      }

      const [addressResult, networkResult] = await Promise.all([
        getAddress(),
        getNetworkDetails(),
      ]);

      if (!isMounted || addressResult.error || !addressResult.address) {
        return;
      }

      setWallet({
        address: addressResult.address,
        network: networkResult.error ? "Stellar" : networkResult.network,
      });
      setStatus("Wallet connected");
    };

    restoreWallet();

    return () => {
      isMounted = false;
    };
  }, []);

  const connectWallet = async () => {
    setIsPending(true);
    setErrorMessage("");
    setStatus("Connecting...");

    try {
      const connected = await isConnected();

      if (connected.error || !connected.isConnected) {
        throw new Error("Install Freighter to connect a Stellar wallet.");
      }

      const access = await requestAccess();

      if (access.error || !access.address) {
        throw new Error(getErrorMessage(access.error));
      }

      const network = await getNetworkDetails();

      const connectedWallet = {
        address: access.address,
        network: network.error ? "Stellar" : network.network,
      };

      setWallet(connectedWallet);
      setStatus("Wallet connected");
      onConnected?.(connectedWallet);
    } catch (error) {
      setWallet(null);
      setStatus(label);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  };

  const clearWallet = () => {
    setWallet(null);
    setStatus(label);
    setErrorMessage("");
  };

  if (wallet) {
    return (
      <div className={`relative inline-flex flex-col items-center gap-2 ${className}`.trim()}>
        <button
          type="button"
          className={`${walletChipClass} ${sizeClass}`.trim()}
          onClick={() => (onConnected ? onConnected(wallet) : clearWallet())}
          aria-label={onConnected ? "Continue with connected wallet" : "Clear connected wallet"}
        >
          <span className="text-[10px] font-black uppercase leading-none text-[rgba(7,17,22,0.58)]">
            {wallet.network}
          </span>
          <strong className="font-mono text-xs leading-tight text-[var(--ink)]">
            {shortenAddress(wallet.address)}
          </strong>
        </button>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex flex-col items-center gap-2 ${className}`.trim()}>
      <button
        type="button"
        className={`${connectButtonClass} ${sizeClass}`.trim()}
        onClick={connectWallet}
        disabled={isPending}
        aria-busy={isPending}
      >
        {status}
      </button>
      {errorMessage ? (
        <small
          className="absolute left-1/2 top-[calc(100%+8px)] w-max max-w-[min(260px,78vw)] -translate-x-1/2 text-center text-[11px] font-extrabold leading-tight text-[#ffd8d8]"
          role="status"
        >
          {errorMessage}
        </small>
      ) : null}
    </div>
  );
}
