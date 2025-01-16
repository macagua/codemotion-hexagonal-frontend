import { InjectionToken } from '@angular/core';
import { Nft } from '../models/nft.model';

export interface NftAdapterInterface {
  /**
   * Reclama un NFT desde el backend y procesa los datos.
   * @returns Promise con los datos del NFT.
   */
  claimNft(): Promise<Nft>;

  /**
   * Convierte una URL IPFS en una URL HTTP accesible.
   * @param ipfsUrl URL IPFS.
   * @returns URL HTTP.
   */
  convertIpfsUrl(ipfsUrl: string): string;
}

export const NFT_ADAPTER = new InjectionToken<NftAdapterInterface>('NFT_ADAPTER');
