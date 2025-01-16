export interface Nft {
    name: string;
    description: string;
    image: string; // URL original del NFT (puede ser ipfs://...)
    imageUrl: string; // URL procesada para renderizar la imagen
    attributes: Array<{ trait_type: string; value: string }>;
  }
  