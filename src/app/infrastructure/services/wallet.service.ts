import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WalletAdapter } from '../adapters/wallet.adapter';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  // Estado de la wallet
  private connectedAccount = new BehaviorSubject<string | null>(null);
  private currentNetwork = new BehaviorSubject<string | null>(null);

  // Observables para que los componentes puedan suscribirse
  public connectedAccount$ = this.connectedAccount.asObservable();
  public currentNetwork$ = this.currentNetwork.asObservable();

  constructor(private walletAdapter: WalletAdapter) {}

  /**
   * Conecta la wallet y actualiza el estado.
   */
  async connectWallet(): Promise<void> {
    try {
      const account = await this.walletAdapter.connectWallet();
      if (account) {
        this.connectedAccount.next(account);
        const network = await this.walletAdapter.getCurrentNetwork();
        this.currentNetwork.next(network);
        console.log('Cuenta conectada:', account, 'en la red:', network);
      } else {
        console.warn('No se pudo conectar la wallet.');
      }
    } catch (error) {
      console.error('Error al conectar la wallet:', error);
    }
  }

  /**
   * Cambia la red activa a la especificada.
   * @param chainId Hexadecimal del Chain ID deseado.
   */
  async changeNetwork(chainId: string): Promise<void> {
    try {
      const success = await this.walletAdapter.changeNetwork(chainId);
      if (success) {
        const network = await this.walletAdapter.getCurrentNetwork();
        this.currentNetwork.next(network);
        console.log('Red cambiada a:', network);
      } else {
        console.warn('No se pudo cambiar de red.');
      }
    } catch (error) {
      console.error('Error al cambiar de red:', error);
    }
  }

  /**
   * Obtiene la cuenta actualmente conectada y actualiza el estado.
   */
  async refreshAccount(): Promise<void> {
    try {
      const account = await this.walletAdapter.getConnectedAccount();
      this.connectedAccount.next(account);
      console.log('Cuenta actualizada:', account);
    } catch (error) {
      console.error('Error al refrescar la cuenta conectada:', error);
    }
  }

  /**
   * Desconecta la wallet (a nivel de la aplicación).
   */
  disconnectWallet(): void {
    this.walletAdapter.disconnectWallet();
    this.connectedAccount.next(null);
    this.currentNetwork.next(null);
    console.log('Wallet desconectada.');
  }
}
