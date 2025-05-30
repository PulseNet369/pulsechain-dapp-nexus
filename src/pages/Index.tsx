
import { WalletConnect } from '@/components/WalletConnect';
import { tokens } from '@/config/tokens';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

        {/* Token Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(tokens).map(([key, token]) => (
            <Card key={key} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {token.name}
                  {token.hasWrapper && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Wrapper Available
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  Rewards: {token.rewardtoken.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Token:</span>{' '}
                    <span className="font-mono text-xs">
                      {token.token.address.slice(0, 10)}...
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Distributor:</span>{' '}
                    <span className="font-mono text-xs">
                      {token.distributor.address.slice(0, 10)}...
                    </span>
                  </div>
                  {token.hasWrapper && token.wrappedToken && (
                    <div className="text-sm">
                      <span className="font-medium">Wrapped:</span>{' '}
                      <span className="font-mono text-xs">
                        {token.wrappedToken.address.slice(0, 10)}...
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Network Info */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Network Information</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">RPC URL:</span> https://rpc.pulsechain.com
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Chain ID:</span> 369
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
