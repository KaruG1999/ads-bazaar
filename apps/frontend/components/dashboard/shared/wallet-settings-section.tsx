"use client";

import { Wallet } from "lucide-react";
import { useWallet } from "@/components/wallet/wallet-context";

const shortenAddress = (address: string) =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

export function WalletSettingsSection() {
  const { wallet, isConnecting, connect } = useWallet();

  return (
    <section className="border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6">
      <h2 className="mb-4 text-sm font-semibold text-[var(--dash-heading)]">
        Wallet settings
      </h2>

      <div className="flex flex-col gap-6">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
            Connected wallet
          </p>
          {wallet ? (
            <div className="flex items-center gap-2">
              <Wallet
                className="size-[18px] text-[var(--dash-accent)]"
                aria-hidden="true"
              />
              <span className="font-mono text-sm text-[var(--dash-body)]">
                {shortenAddress(wallet.address)}
              </span>
              <span className="text-xs text-[var(--dash-muted)]">
                ({wallet.network})
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-[var(--dash-body)]">
                No wallet connected
              </span>
              <button
                type="button"
                onClick={connect}
                disabled={isConnecting}
                className="flex items-center gap-2 border border-[var(--dash-border)] px-4 py-2 text-sm font-semibold text-[var(--dash-body)] transition-colors hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)] disabled:cursor-wait disabled:opacity-60"
              >
                <Wallet className="size-4" aria-hidden="true" />
                {isConnecting ? "Connecting..." : "Connect"}
              </button>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="settlement-asset"
            className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]"
          >
            Default settlement asset
          </label>
          <select
            id="settlement-asset"
            disabled
            title="Coming soon"
            defaultValue="USDC"
            className="w-full max-w-xs border border-[var(--dash-border)] bg-[var(--dash-surface)] px-3 py-2 text-sm text-[var(--dash-body)] disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-[220px]"
          >
            <option value="USDC">USDC</option>
            <option value="XLM">XLM</option>
            <option value="EURC">EURC</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--dash-body)]">Auto-claim payouts</p>
            <p className="text-xs text-[var(--dash-muted)]">
              Automatically claim payouts as soon as they settle.
            </p>
          </div>
          <button
            type="button"
            disabled
            title="Coming soon"
            aria-label="Toggle auto-claim payouts"
            className="flex size-10 shrink-0 items-center rounded-full bg-[var(--dash-border)] px-1 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="size-5 rounded-full bg-[var(--dash-surface)]" />
          </button>
        </div>
      </div>
    </section>
  );
}
