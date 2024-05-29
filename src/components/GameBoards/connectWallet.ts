import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

const providerOptions = {
  injected: {
    display: {
      name: 'MetaMask',
      description: 'Connect with MetaMask',
    },
    package: null,
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

export const connectWallet = async () => {
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const balance = await signer.getBalance();
  const balanceInEth = ethers.utils.formatEther(balance);
  return { provider, signer, address, balanceInEth };
};

export const disconnectWallet = async () => {
  web3Modal.clearCachedProvider();
};
