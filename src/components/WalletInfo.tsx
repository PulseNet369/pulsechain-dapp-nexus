
import { useEffect, useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { PULSECHAIN_CONFIG } from '@/config/pulsechain';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Coins } from 'lucide-react';

export const WalletInfo = () => {
  const { isConnected, account } = useWallet();
  const [plsBalance, setPlsBalance] = useState<string>('0');
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  const checkNetworkAndFetchBalance = async () => {
    if (!isConnected || !account || typeof window.ethereum === 'undefined') {
      return;
    }

    try {
      // Check if we're on the correct network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const chainIdNumber = parseInt(chainId, 16);
      const correctNetwork = chainIdNumber === PULSECHAIN_CONFIG.chainId;
      setIsCorrectNetwork(correctNetwork);

      if (correctNetwork) {
        // Fetch PLS balance
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [account, 'latest']
        });
        
        // Convert from wei to PLS (18 decimals)
        const balanceInPLS = (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4);
        setPlsBalance(balanceInPLS);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  useEffect(() => {
    checkNetworkAndFetchBalance();

    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = () => {
        checkNetworkAndFetchBalance();
      };

      const handleChainChanged = () => {
        checkNetworkAndFetchBalance();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [isConnected, account]);

  if (!isConnected || !account) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Wallet Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">
            {formatAddress(account)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {account}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Coins className="h-4 w-4" />
            PLS Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isCorrectNetwork ? `${plsBalance} PLS` : 'Switch to PulseChain'}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {isCorrectNetwork ? 'Native PulseChain token' : 'Connect to view balance'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
