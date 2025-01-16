import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-wallet-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" (click)="onClose()">
      <div class="popup" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="onClose()">×</button>
        <h3>Wallet Details</h3>
        <p><strong>Account:</strong> {{ account || 'Not Connected' }}</p>
        <p><strong>Network:</strong> {{ getNetworkName(network) }}</p>
        <button *ngIf="!isCorrectNetwork" class="change-network-btn" (click)="onChangeNetwork()">
          Switch to Polygon
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./wallet-popup.component.css'],
})
export class WalletPopupComponent {
  @Input() account: string | null = null;
  @Input() network: string | null = null;
  @Input() isCorrectNetwork: boolean = true; // Indica si el usuario está en la red deseada
  @Output() close = new EventEmitter<void>();
  @Output() changeNetwork = new EventEmitter<void>();

  /**
   * Emite un evento para cerrar el popup.
   */
  onClose(): void {
    this.close.emit();
  }

  /**
   * Emite un evento para cambiar de red.
   */
  onChangeNetwork(): void {
    this.changeNetwork.emit();
  }

  /**
   * Devuelve el nombre de la red según el Chain ID.
   * @param chainId Hexadecimal del Chain ID de la red.
   */
  getNetworkName(chainId: string | null): string {
    const networks: { [key: string]: string } = {
      '0x1': 'Ethereum Mainnet',
      '0x89': 'Polygon Mainnet',
      '0x3': 'Ropsten Testnet',
      '0x4': 'Rinkeby Testnet',
      '0x5': 'Goerli Testnet',
      '0x2a': 'Kovan Testnet',
    };
    return chainId ? networks[chainId] || 'Unknown Network' : 'Unknown Network';
  }
}
