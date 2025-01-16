import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nft-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="metadata">
      <h2>{{ metadata.name }}</h2>
      <img [src]="transformedImageUrl" [alt]="metadata.name" />
      <p>{{ metadata.description }}</p>
    </div>
  `,
})
export class NftViewerComponent implements OnInit {
  @Input() ipfsUrl = '';
  metadata: any;
  transformedImageUrl = '';

  async ngOnInit(): Promise<void> {
    if (this.ipfsUrl) {
      await this.loadMetadata(this.ipfsUrl);
    }
  }

  private async loadMetadata(ipfs: string): Promise<void> {
    try {
      const gatewayUrl = this.ipfsToHttp(ipfs);
      const response = await fetch(gatewayUrl);
      this.metadata = await response.json();

      // Si la metadata tiene un campo 'image' en ipfs://..., lo transformamos también
      if (this.metadata.image) {
        this.transformedImageUrl = this.ipfsToHttp(this.metadata.image);
      }
    } catch (err) {
      console.error('Error cargando NFT metadata', err);
    }
  }

  private ipfsToHttp(ipfsPath: string): string {
    // Quitar "ipfs://" si existe
    if (ipfsPath.startsWith('ipfs://')) {
      return `https://ipfs.io/ipfs/${ipfsPath.slice(7)}`;
    }
    return ipfsPath;
  }
}
