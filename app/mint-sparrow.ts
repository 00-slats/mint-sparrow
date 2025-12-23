// app.mint-sparrow.ts
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { createPublicClient, http, formatEther, isAddress } from "viem";
import { base, baseSepolia } from "viem/chains";

type Net = {
  chain: typeof base;
  chainId: number;
  rpc: string;
  explorer: string;
  label: string;
};

const NETS: Net[] = [
  { chain: baseSepolia, chainId: 84532, rpc: "https://sepolia.base.org", explorer: "https://sepolia.basescan.org", label: "Base Sepolia" },
  { chain: base, chainId: 8453, rpc: "https://mainnet.base.org", explorer: "https://basescan.org", label: "Base Mainnet" },
];

let active = NETS[0];

const sdk = new CoinbaseWalletSDK({
  appName: "Mint Sparrow (Built for Base)",
  appLogoUrl: "https://base.org/favicon.ico",
});

const out = document.createElement("pre");
out.style.whiteSpace = "pre-wrap";
out.style.background = "#0b0f1a";
out.style.color = "#dbe7ff";
out.style.padding = "12px";
out.style.borderRadius = "12px";
out.style.minHeight = "220px";

function print(lines: string[]) {
  out.textContent = lines.join("\n");
}

function client() {
  return createPublicClient({ chain: active.chain, transport: http(active.rpc) });
}

async function connect() {
  const provider = sdk.makeWeb3Provider(active.rpc, active.chainId);
  const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
  const address = accounts?.[0];
  if (!address) throw new Error("No address returned");

  const chainHex = (await provider.request({ method: "eth_chainId" })) as string;
  const bal = await client().getBalance({ address: address as `0x${string}` });

  print([
    "Connected",
    `Network: ${active.label}`,
    `chainId: ${parseInt(chainHex, 16)}`,
    `Address: ${address}`,
    `ETH: ${formatEther(bal)}`,
    `Explorer: ${active.explorer}/address/${address}`,
  ]);
}

async function blockTip() {
  const bn = await client().getBlockNumber();
  print([
    "Block tip",
    `Network: ${active.label}`,
    `Latest block: ${bn}`,
    `Explorer: ${active.explorer}/block/${bn}`,
  ]);
}

async function balanceOf(v: string) {
  if (!isAddress(v)) throw new Error("Invalid address");
  const bal = await client().getBalance({ address: v as `0x${string}` });
  print([
    "Balance",
    `Network: ${active.label}`,
    `Address: ${v}`,
    `ETH: ${formatEther(bal)}`,
    `Explorer: ${active.explorer}/address/${v}`,
  ]);
}

function toggle() {
  active = active.chainId === 84532 ? NETS[1] : NETS[0];
  print([`Switched to ${active.label}.`]);
}

function mount() {
  const root = document.createElement("div");
  root.style.maxWidth = "900px";
  root.style.margin = "24px auto";
  root.style.fontFamily = "system-ui";

  const h1 = document.createElement("h1");
  h1.textContent = "Mint Sparrow";

  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.flexWrap = "wrap";
  row.style.gap = "10px";
  row.style.marginBottom = "10px";

  const input = document.createElement("input");
  input.placeholder = "0x… address";
  input.style.minWidth = "320px";
  input.style.padding = "8px 10px";

  function btn(label: string, fn: () => void | Promise<void>) {
    const b = document.createElement("button");
    b.textContent = label;
    b.style.padding = "8px 10px";
    b.onclick = () => Promise.resolve(fn()).catch(e => print([`Error: ${String(e?.message ?? e)}`]));
    return b;
  }

  row.append(
    btn("Connect", connect),
    btn("Toggle Network", toggle),
    btn("Block Tip", blockTip),
  );

  root.append(h1, row, input, btn("Read Balance", () => balanceOf(input.value.trim())), out);
  document.body.appendChild(root);

  print(["Ready", `Active: ${active.label}`, "Connect to start (read-only)."]);
}

mount();
