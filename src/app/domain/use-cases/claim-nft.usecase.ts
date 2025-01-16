import { Injectable } from '@angular/core';
import { Nft } from '../models/nft.model';
import { ConvertIpfsUseCase } from './convert-ipfs.usecase';
import { Inject } from '@angular/core';
import { NFT_ADAPTER, NftAdapterInterface } from '../interfaces/nft-adapter.inferface';

/**
 * Caso de uso para reclamar un NFT.
 * Orquesta la interacción entre el puerto y la conversión de URLs IPFS.
 */
@Injectable({
  providedIn: 'root',
})
export class ClaimNftUseCase {
  constructor(@Inject(NFT_ADAPTER) private nftAdapter: NftAdapterInterface,
  private convertIpfsUseCase: ConvertIpfsUseCase ) {}

  async execute(): Promise<Nft> {
    const nft = await this.nftAdapter.claimNft();

    // Usar el caso de uso para convertir la URL de la imagen
    if (nft.image.startsWith('ipfs://')) {
      nft.imageUrl = this.convertIpfsUseCase.execute(nft.image);
    } else {
      nft.imageUrl = nft.image;
    }

    return nft;
  }
}

