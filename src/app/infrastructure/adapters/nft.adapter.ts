import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Nft } from '../../domain/models/nft.model';
import { NftAdapterInterface } from '../../domain/interfaces/nft-adapter.inferface';

@Injectable({
  providedIn: 'root',
})
export class NftAdapter implements NftAdapterInterface {
  private readonly BASE_URL = '/api';

  constructor(private http: HttpClient) {}

  /**
   * Reclama un NFT desde el backend.
   * @returns Promise con los datos del NFT.
   */
  async claimNft(): Promise<Nft> {
    const response = await firstValueFrom(
      this.http.post<Nft>(`${this.BASE_URL}/claim-nft`, {})
    );

    if (!response) {
      throw new Error('Failed to claim NFT');
    }

    return response;
  }

  /**
   * Convierte una URL IPFS en una URL HTTP.
   * @param ipfsUrl URL IPFS.
   * @returns URL HTTP accesible.
   */
  convertIpfsUrl(ipfsUrl: string): string {
    return ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
}
