import Image from "next/image";
import { OnboardingFlow } from "./onboarding-flow";

const heroStats = [
  { value: "0.5%", label: "protocol fee" },
  { value: "6", label: "launch rails" },
  { value: "24/7", label: "escrow visibility" },
];

const howItWorks = [
  {
    title: "Create a campaign",
    text: "A business sets budget, creator slots, deadline, payout asset, and proof requirements.",
    stat: "01",
  },
  {
    title: "Lock funds in escrow",
    text: "Soroban holds the campaign budget so creators can verify funding before they work.",
    stat: "02",
  },
  {
    title: "Approve and settle",
    text: "Creators submit proof, brands approve delivery, and payouts move directly to wallets.",
    stat: "03",
  },
];

const whyAdsBazaar = [
  {
    title: "Local-currency commerce",
    text: "Campaigns can be priced for the market where the business operates, not forced through a USD-only workflow.",
  },
  {
    title: "Trust-minimized payouts",
    text: "Escrow turns creator payment from a promise into an auditable on-chain state.",
  },
  {
    title: "Emerging-market rails",
    text: "SEP-24 anchor flows create a path from bank transfer or mobile money to Stellar settlement and back.",
  },
];

const rails = [
  { market: "Nigeria", rail: "Bank transfer", asset: "NGN asset" },
  { market: "Kenya", rail: "Mobile money", asset: "KES asset" },
  { market: "Europe", rail: "SEPA", asset: "EURC" },
  { market: "Global", rail: "Wallet", asset: "USDC" },
];

const displayFont =
  'font-[Impact,Haettenschweiler,"Arial_Narrow_Bold",var(--font-geist-sans),sans-serif] font-black uppercase tracking-normal';

const labelClass =
  "mb-6 inline-flex rounded-full border border-[rgba(216,255,40,0.18)] px-3.5 py-2 text-xs font-black uppercase text-[var(--lime)]";

const lightLabelClass =
  "mb-6 inline-flex rounded-full border border-[rgba(7,17,22,0.1)] px-3.5 py-2 text-xs font-black uppercase text-[#5a7810]";

const gridOverlayClass =
  "pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:78px_78px] [mask-image:linear-gradient(180deg,black_0%,black_70%,transparent_100%)]";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--paper)]">
      <section
        className="relative min-h-svh overflow-hidden px-4 pb-12 pt-5 sm:px-6 md:px-10 lg:px-[78px] lg:pb-16 lg:pt-7 [background:radial-gradient(circle_at_82%_18%,rgba(190,240,24,0.18),transparent_34%),linear-gradient(180deg,#06171d_0%,#0a2427_56%,#789094_100%)]"
        id="top"
      >
        <div className={gridOverlayClass} aria-hidden="true" />

        <nav
          className="relative z-10 mx-auto flex max-w-[1230px] animate-enter-down items-center justify-between gap-6"
          aria-label="Main navigation"
        >
          <a
            href="#top"
            className="flex min-h-11 items-center text-xl font-extrabold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lime)]"
            aria-label="AdsBazaar home"
          >
            AdsBazaar
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.055] p-1 backdrop-blur-[18px] md:flex">
            {["How it works", "Why AdsBazaar", "Rails", "Build"].map((item) => (
              <a
                href={`#${item === "How it works" ? "how" : item === "Why AdsBazaar" ? "why" : item.toLowerCase()}`}
                className="min-h-[34px] rounded-full px-4 py-2 text-[13px] font-bold text-[rgba(247,248,242,0.78)] transition-colors hover:bg-white/10 hover:text-[var(--paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lime)]"
                key={item}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <OnboardingFlow buttonLabel="Connect wallet" />
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-[1230px] items-center gap-9 pt-14 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:gap-14 lg:pt-8">
          <div className="max-w-[610px] animate-enter-left">
            <p className={labelClass}>Stellar creator commerce</p>
            <h1
              className={`${displayFont} mb-6 max-w-[760px] text-[54px] leading-[0.94] sm:text-[64px] lg:text-[104px]`}
            >
              Campaign escrow for the next million creators.
            </h1>
            <p className="max-w-xl text-[17px] leading-relaxed text-[rgba(247,248,242,0.74)]">
              AdsBazaar connects brands and creators through Soroban escrow,
              multi-asset settlement, and local payment rails built for markets
              where fees, trust, and payout speed actually matter.
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row lg:mb-19">
              <OnboardingFlow buttonLabel="Get started" buttonSize="large" />
              <a
                href="#how"
                className="inline-flex min-h-13 items-center gap-2.5 rounded-full bg-[var(--paper)] py-2 pl-2 pr-5 text-[13px] font-black text-[var(--ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lime)]"
                aria-label="See how AdsBazaar works"
              >
                <span
                  className="flex size-9 items-center justify-center rounded-full bg-[#12262a] text-[11px] text-[var(--paper)]"
                  aria-hidden="true"
                >
                  ↓
                </span>
                See flow
              </a>
            </div>
          </div>

          <div className="relative grid animate-enter-right grid-cols-1 gap-4 sm:grid-cols-2 lg:min-h-[565px]">
            <div className="min-h-42 rounded-[22px] border border-white/15 bg-[rgba(230,247,240,0.88)] p-7 text-[var(--ink)] shadow-[var(--shadow)] backdrop-blur-[22px]">
              <strong className="mb-4 block text-[42px] leading-none after:ml-3.5 after:inline-block after:size-[15px] after:rounded-full after:bg-[var(--lime)] after:shadow-[0_0_20px_rgba(216,255,40,0.8)]">
                4.9
              </strong>
              <span className="block text-[15px] font-extrabold text-[rgba(7,17,22,0.72)]">
                Creator trust score
              </span>
              <small className="mt-2 block text-xs text-[rgba(7,17,22,0.55)]">
                2.6K verified campaign actions
              </small>
            </div>

            <div className="min-h-42 rounded-[22px] border border-white/15 bg-[linear-gradient(135deg,rgba(126,212,166,0.92),rgba(71,164,125,0.86))] p-7 text-[var(--ink)] shadow-[var(--shadow)] backdrop-blur-[22px]">
              <span className="block text-[15px] font-extrabold text-[rgba(7,17,22,0.72)]">
                Creators reachable
              </span>
              <strong className="my-4 block text-[54px] leading-none text-[var(--lime)]">
                80K
              </strong>
              <small className="mt-2 block text-xs text-[rgba(7,17,22,0.55)]">
                Africa-first launch network
              </small>
            </div>

            <div className="relative min-h-[340px] overflow-hidden rounded-[22px] border border-white/15 bg-[#e8efeb] shadow-[var(--shadow)] sm:col-span-2 lg:min-h-[365px]">
              <Image
                className="absolute inset-0 size-full object-cover object-[50%_48%]"
                src="/hero-wallet-phone.jpg"
                alt="Phone showing a mobile payment interface"
                fill
                priority
                sizes="(max-width: 680px) 100vw, 46vw"
              />

              <div className="absolute bottom-13 right-5 w-[118px] rounded-2xl bg-[rgba(247,248,242,0.92)] p-4 text-[var(--ink)] sm:right-14">
                <span className="block h-[76px] bg-[linear-gradient(135deg,transparent_45%,#16272c_46%_52%,transparent_53%),linear-gradient(90deg,var(--lime)_0_36%,transparent_36%_100%),linear-gradient(90deg,#4c91ff_0_52%,transparent_52%_100%)] bg-[length:80px_42px,54px_6px,74px_5px] bg-[position:0_42px,0_8px,0_26px] bg-no-repeat" />
                <strong className="text-xs">Escrow live</strong>
              </div>
            </div>

            <div className="absolute bottom-4 right-5 w-[150px] animate-float-y rounded-[18px] border border-white/15 bg-[var(--lime)] p-6 text-center text-[#14210f] shadow-[var(--shadow)] lg:-bottom-2 lg:right-[72px]">
              <strong className="block text-[35px] leading-none">$25+</strong>
              <span className="mt-1.5 block text-xs font-extrabold">
                viable micro-payouts
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="grid grid-cols-1 gap-px border-y border-white/10 bg-[#0b2024] md:grid-cols-3"
        aria-label="Key platform metrics"
      >
        {heroStats.map((item) => (
          <div
            className="bg-white/[0.025] px-5 py-8 sm:px-10 lg:px-[78px]"
            key={item.label}
          >
            <strong className="block text-[42px] leading-none text-[var(--lime)]">
              {item.value}
            </strong>
            <span className="mt-2.5 block text-[13px] font-extrabold uppercase text-[rgba(247,248,242,0.68)]">
              {item.label}
            </span>
          </div>
        ))}
      </section>

      <section
        className="bg-[var(--paper)] px-4 py-20 text-[var(--ink)] sm:px-8 lg:px-20 lg:py-25"
        id="how"
      >
        <div className="mx-auto max-w-[860px] text-center">
          <p className={lightLabelClass}>How it works</p>
          <h2
            className={`${displayFont} mb-4 text-[46px] leading-none lg:text-[76px]`}
          >
            Move from brief to payout without payment chaos.
          </h2>
          <p className="mx-auto max-w-[620px] text-base leading-relaxed text-[var(--muted-dark)]">
            AdsBazaar is structured around the real campaign lifecycle: funding,
            selection, proof, approval, and settlement.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1130px] gap-6 lg:grid-cols-3">
          {howItWorks.map((item, index) => (
            <article
              className={`min-h-[300px] rounded-[20px] border border-[var(--dark-line)] p-7 ${
                index === 0
                  ? "bg-[radial-gradient(circle_at_50%_76%,rgba(216,255,40,0.4),transparent_36%),#0b2024] text-[var(--paper)]"
                  : "bg-[linear-gradient(180deg,#ffffff,#f1f4ee)] text-[var(--ink)]"
              }`}
              key={item.title}
            >
              <span
                className={`mb-20 block font-mono text-[13px] font-black ${
                  index === 0 ? "text-[var(--lime)]" : "text-[#6d8d12]"
                }`}
              >
                {item.stat}
              </span>
              <h3 className="mb-3.5 text-[25px] font-black leading-tight">
                {item.title}
              </h3>
              <p
                className={`text-[15px] leading-relaxed ${
                  index === 0
                    ? "text-[rgba(247,248,242,0.72)]"
                    : "text-[var(--muted-dark)]"
                }`}
              >
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="grid gap-14 bg-[radial-gradient(circle_at_78%_10%,rgba(216,255,40,0.14),transparent_28%),linear-gradient(180deg,#06171d,#0c262a)] px-4 py-24 text-[var(--paper)] sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:px-20 lg:py-29"
        id="why"
      >
        <div className="max-w-[610px]">
          <p className={labelClass}>Why AdsBazaar</p>
          <h2
            className={`${displayFont} mb-4 text-[46px] leading-none lg:text-[76px]`}
          >
            Built like payment infrastructure, not a campaign spreadsheet.
          </h2>
          <p className="text-base leading-relaxed text-[rgba(247,248,242,0.72)]">
            The product combines creator marketplace UX with the primitives that
            make Stellar useful: native assets, low-fee settlement, anchors, and
            Soroban-enforced custody.
          </p>
        </div>

        <div className="grid gap-4.5">
          {whyAdsBazaar.map((item) => (
            <article
              className="rounded-[18px] border border-white/10 bg-white/[0.055] p-7 backdrop-blur-[14px]"
              key={item.title}
            >
              <h3 className="mb-3.5 text-[25px] font-black leading-tight">
                {item.title}
              </h3>
              <p className="mb-0 text-[15px] leading-relaxed text-[rgba(247,248,242,0.66)]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="bg-[var(--paper)] px-4 py-20 text-[var(--ink)] sm:px-8 lg:px-20 lg:py-25"
        id="rails"
      >
        <div className="mx-auto max-w-[860px] text-center">
          <p className={lightLabelClass}>Payment rails</p>
          <h2
            className={`${displayFont} mb-4 text-[46px] leading-none lg:text-[76px]`}
          >
            Stablecoin-native, local-market aware.
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-[980px] overflow-hidden rounded-[22px] border border-[var(--dark-line)] bg-white shadow-[0_28px_80px_rgba(7,17,22,0.08)]">
          {rails.map((rail) => (
            <div
              className="grid min-h-[78px] gap-3 border-b border-[var(--dark-line)] p-5 last:border-b-0 md:grid-cols-[1fr_1fr_auto] md:items-center md:gap-6 md:px-7"
              key={rail.market}
            >
              <strong className="text-lg">{rail.market}</strong>
              <span className="text-[var(--muted-dark)]">{rail.rail}</span>
              <em className="w-fit rounded-full bg-[#eaf3dc] px-3.5 py-2.5 font-mono text-[13px] font-black not-italic text-[#4f6e0c]">
                {rail.asset}
              </em>
            </div>
          ))}
        </div>
      </section>

      <section
        className="relative min-h-[620px] bg-[radial-gradient(circle_at_50%_0%,rgba(216,255,40,0.16),transparent_34%),linear-gradient(180deg,#0b2024,#06171d)] px-4 py-24 sm:px-8 lg:px-20 lg:py-28"
        id="build"
      >
        <div className={gridOverlayClass} aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[860px] rounded-3xl border border-white/10 bg-white/[0.06] px-8 py-10 text-center sm:p-14 lg:p-[72px]">
          <p className={labelClass}>Open-source Stellar dApp</p>
          <h2
            className={`${displayFont} mb-4 text-[46px] leading-none lg:text-[76px]`}
          >
            Launch campaigns where creators already live.
          </h2>
          <p className="mx-auto mb-8 max-w-[620px] text-[17px] leading-relaxed text-[rgba(247,248,242,0.72)]">
            AdsBazaar is being built as an open-source reference for creator
            commerce, Soroban escrow, and cross-border stablecoin settlement.
          </p>
          <OnboardingFlow buttonLabel="Get started" buttonSize="large" />
        </div>
      </section>
    </main>
  );
}
