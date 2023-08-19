export function WalletConnection({ isConnected, accounts, onDisconnect, onConnect }) {
  return (
    <div className="mb-5">
      {isConnected ? (
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-xl font-bold mb-2">Wallet Connected: {accounts[0]}</div>
          <button className="bg-red-500 text-white px-4 py-2 rounded mt-2 sm:mt-0" onClick={onDisconnect}>
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold mb-6">Connect your wallet</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 sm:mt-0" onClick={onConnect}>
            Connect With MetaMask
          </button>
        </div>
      )}
    </div>
  );
}
