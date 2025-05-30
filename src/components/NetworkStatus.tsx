
import { useEffect, useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { PULSECHAIN_CONFIG } from '@/config/pulsechain';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export const NetworkStatus = () => {
  const { isConnected } = useWallet();
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  const checkNetwork = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const chainIdNumber = parseInt(chainId, 16);
        setCurrentChainId(chainIdNumber);
        setIsCorrectNetwork(chainIdNumber === PULSECHAIN_CONFIG.chainId);
      } catch (error) {
        console.error('Error checking network:', error);
      }
    }
  };

  const switchToPulseChain = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask or another Web3 wallet');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${PULSECHAIN_CONFIG.chainId.toString(16)}` }]
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${PULSECHAIN_CONFIG.chainId.toString(16)}`,
                chainName: PULSECHAIN_CONFIG.chainName,
                nativeCurrency: PULSECHAIN_CONFIG.nativeCurrency,
                rpcUrls: PULSECHAIN_CONFIG.rpcUrls,
                blockExplorerUrls: PULSECHAIN_CONFIG.blockExplorerUrls
              }
            ]
          });
        } catch (addError) {
          console.error('Error adding PulseChain network:', addError);
        }
      }
    }
  };

  useEffect(() => {
    if (isConnected) {
      checkNetwork();

      if (typeof window.ethereum !== 'undefined') {
        const handleChainChanged = () => {
          checkNetwork();
        };

        window.ethereum.on('chainChanged', handleChainChanged);
        return () => {
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        };
      }
    }
  }, [isConnected]);

  if (!isConnected) {
    return null;
  }

  if (isCorrectNetwork) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Connected to PulseChain network
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          You're connected to the wrong network. Please switch to PulseChain.
          {currentChainId && ` (Current: Chain ID ${currentChainId})`}
        </span>
        <Button
          onClick={switchToPulseChain}
          size="sm"
          className="ml-4"
        >
          Switch to PulseChain
        </Button>
      </AlertDescription>
    </Alert>
  );
};
