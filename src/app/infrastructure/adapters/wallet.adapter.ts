import { Injectable } from '@angular/core';
import { WalletInterface } from '../../domain/interfaces/wallet.interface';


@Injectable({
  providedIn: 'root',
})
export class WalletAdapter implements WalletInterface {
  private readonly desiredChainId = '0x89'; // Polygon Mainnet (137 decimal -> 0x89 hexadecimal)
  private ethereum: any;

  constructor() {
    const { ethereum } = window as any;
    if (!ethereum || !ethereum.isMetaMask) {
      console.warn('MetaMask no está instalada o detectada en el navegador.');
      this.ethereum = null;
    } else {
      this.ethereum = ethereum;
    }
  }

  /**
   * Solicita la conexión a la wallet y devuelve la cuenta conectada.
   */
  async connectWallet(): Promise<string | null> {
    if (!this.ethereum) {
      alert('MetaMask no está instalada o habilitada.');
      return null;
    }

    try {
      const accounts: string[] = await this.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return accounts[0] || null;
    } catch (error) {
      console.error('Error al conectar la wallet:', error);
      return null;
    }
  }

  /**
   * Cambia la red activa en la wallet al Chain ID proporcionado.
   */
  async changeNetwork(chainId: string = this.desiredChainId): Promise<boolean> {
    if (!this.ethereum) {
      alert('MetaMask no está instalada o habilitada.');
      return false;
    }

    try {
      await this.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
      console.log(`Red cambiada exitosamente al Chain ID ${chainId}`);
      return true;
    } catch (error: any) {
      if (error.code === 4902) {
        // Si la red no está añadida, intentamos agregarla
        try {
          await this.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId,
                chainName: 'Polygon Mainnet',
                rpcUrls: ['https://polygon-rpc.com/'],
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://polygonscan.com/'],
              },
            ],
          });
          console.log('Red añadida exitosamente.');
          return true;
        } catch (addError) {
          console.error('No se pudo añadir la red:', addError);
          return false;
        }
      } else {
        console.error('Error al cambiar de red:', error);
        return false;
      }
    }
  }

  /**
   * Obtiene la cuenta actualmente conectada en la wallet.
   */
  async getConnectedAccount(): Promise<string | null> {
    if (!this.ethereum) {
      console.warn('MetaMask no está instalada o habilitada.');
      return null;
    }

    try {
      const accounts: string[] = await this.ethereum.request({
        method: 'eth_accounts',
      });
      return accounts[0] || null;
    } catch (error) {
      console.error('Error al obtener la cuenta conectada:', error);
      return null;
    }
  }

  /**
   * Obtiene la red actualmente activa en la wallet.
   */
  async getCurrentNetwork(): Promise<string | null> {
    if (!this.ethereum) {
      console.warn('MetaMask no está instalada o habilitada.');
      return null;
    }

    try {
      const chainId: string = await this.ethereum.request({
        method: 'eth_chainId',
      });
      return chainId;
    } catch (error) {
      console.error('Error al obtener la red activa:', error);
      return null;
    }
  }

  /**
   * Desconecta la wallet (a nivel de la aplicación, no MetaMask).
   */
  disconnectWallet(): void {
    // Nota: No hay forma de desconectar MetaMask directamente desde el front-end.
    // Solo limpiamos el estado de la aplicación.
    console.log('Wallet desconectada (estado de la app reseteado).');
  }
}
