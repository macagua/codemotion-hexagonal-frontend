import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WalletService } from '../../infrastructure/services/wallet.service';
import { ClaimNftUseCase } from '../../domain/use-cases/claim-nft.usecase';

@Component({
  selector: 'app-floating-wallet-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-wallet-button.component.html',
  styleUrls: ['./floating-wallet-button.component.css'],
})
export class FloatingWalletButtonComponent {
  isConnected: boolean = false;
  loading: boolean = false;
  errorMessage: string | null = null;
  claimingNft: boolean = false;
  nftData: any | null = null; // Almacena los metadatos del NFT

  connectedAccount: string | null = null;
  network: string | null = null;
  isCorrectNetwork: boolean = true;

  constructor(
    private walletService: WalletService,
    private claimNftUseCase: ClaimNftUseCase
  ) {
    // Suscribirse a los cambios en el estado de la cuenta conectada
    this.walletService.connectedAccount$.subscribe((account) => {
      this.isConnected = !!account;
      this.connectedAccount = account;
    });

    // Suscribirse a los cambios en el estado de la red activa
    this.walletService.currentNetwork$.subscribe((network) => {
      this.network = network;
      this.isCorrectNetwork = network === '0x89'; // Validar si está en Polygon Mainnet
    });
  }

  /**
   * Reclama un NFT y obtiene los metadatos desde IPFS.
   */
  async onClaimNft(): Promise<void> {
    this.claimingNft = true;
    try {
      // Paso 1: Reclamar el NFT
      const nftUrl = await this.claimNftUseCase.execute();
      console.log('NFT URL:', nftUrl);

      // Paso 2: Obtener los metadatos del NFT desde IPFS
      const metadata = await this.fetchNftMetadata(nftUrl as any);
      console.log('Metadata del NFT:', metadata);

      // Mostrar los metadatos en un popup
      this.nftData = metadata;
    } catch (error) {
      console.error('Error al reclamar o cargar el NFT:', error);
      this.errorMessage = 'Failed to claim NFT. Please try again.';
    } finally {
      this.claimingNft = false;
    }
  }

  /**
   * Obtiene los metadatos del NFT desde la URL de IPFS.
   * @param nftUrl URL del NFT (protocolo IPFS).
   * @returns Metadatos del NFT.
   */
  private async fetchNftMetadata(nftUrl: string): Promise<any> {
    const gatewayUrl = nftUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
  
    const response = await fetch(gatewayUrl);
    if (!response.ok) {
      throw new Error('Error al obtener metadatos del NFT');
    }
  
    const metadata = await response.json();
  
    // Convertir la URL de la imagen a un gateway válido
    const imageUrl = metadata.image?.startsWith('ipfs://') ? metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/') : metadata.image;
  
    return {
        ...metadata,
        imageUrl // Asignar la URL procesada
      };
  }

  /**
   * Maneja el clic en el botón de wallet.
   * Conecta o muestra los detalles de la wallet según el estado actual.
   */
  async onWalletButtonClick(): Promise<void> {
    this.errorMessage = null;

    if (this.isConnected) {
      console.log('Wallet Details:', {
        account: this.connectedAccount,
        network: this.network,
      });
    } else {
      await this.connectWalletAndEnsureNetwork();
    }
  }

  /**
   * Conecta la wallet y asegura que esté en la red correcta.
   */
  private async connectWalletAndEnsureNetwork(): Promise<void> {
    this.loading = true;
    try {
      await this.walletService.connectWallet();

      const desiredChainId = '0x89'; // Polygon Mainnet
      await this.walletService.changeNetwork(desiredChainId);
    } catch (error) {
      console.error('Error al conectar la wallet:', error);
      this.errorMessage = 'Error connecting to wallet. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  /**
   * Cierra el popup de NFT.
   */
  closeNftPopup(): void {
    this.nftData = null;
  }
}
