
import { WalletConnect } from '@/components/WalletConnect';
import { NetworkStatus } from '@/components/NetworkStatus';
import { WalletInfo } from '@/components/WalletInfo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              PulseNet DApp
            </h1>
            <p className="text-lg text-gray-600">
              Interact with PulseChain ecosystem tokens and distributors
            </p>
          </div>
          <WalletConnect />
        </div>

        {/* Network and Wallet Information */}
        <div className="space-y-6">
          <NetworkStatus />
          <WalletInfo />
        </div>
      </div>
    </div>
  );
};

export default Index;
