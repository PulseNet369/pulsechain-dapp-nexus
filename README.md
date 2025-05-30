
# PulseChain dApp Nexus

A decentralized application for interacting with the PulseChain ecosystem, including tokens and distributors.

## Project info

**URL**: https://lovable.dev/projects/9723c0d2-f99b-4001-87a9-13462ef3d91a

## GitHub Pages Deployment

This project is configured to be deployed on GitHub Pages. Follow these steps:

### 1. Repository Setup
1. Push this code to a GitHub repository
2. Go to your repository settings on GitHub
3. Navigate to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"

### 2. Automatic Deployment
The project includes a GitHub Actions workflow that will automatically:
- Build the application when you push to the main branch
- Deploy it to GitHub Pages
- Make it available at `https://yourusername.github.io/pulsechain-dapp-nexus/`

### 3. Custom Domain (Optional)
If you want to use a custom domain:
1. Add a `CNAME` file to the `public` folder with your domain
2. Configure your domain's DNS to point to GitHub Pages
3. Update the `base` config in `vite.config.ts` to use your domain

## Local Development

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Setup
```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd pulsechain-dapp-nexus

# Install dependencies
npm install

# Start development server
npm run dev
```

## Technologies Used

This project is built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Ethers.js for Web3 integration

## Features

- **Wallet Connection**: Connect to MetaMask and other Web3 wallets
- **Network Detection**: Automatic PulseChain network detection and switching
- **PLS Balance**: Display native PulseChain token balance
- **Responsive Design**: Mobile-friendly interface

## Configuration

The dApp is configured for PulseChain mainnet. Network settings can be found in `src/config/pulsechain.ts`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to GitHub (automatic deployment will trigger)
5. Create a Pull Request

## License

This project is open source and available under the MIT License.
