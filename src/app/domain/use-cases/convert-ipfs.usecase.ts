/**
 * Caso de uso para convertir URLs IPFS en URLs HTTP.
 */
export class ConvertIpfsUseCase {
    /**
     * Convierte una URL con esquema `ipfs://` en una URL accesible por un gateway HTTP.
     * @param ipfsUrl La URL IPFS original.
     * @returns La URL procesada con un gateway HTTP.
     */
    execute(ipfsUrl: string): string {
      if (!ipfsUrl.startsWith('ipfs://')) {
        throw new Error('La URL no tiene un esquema válido de IPFS.');
      }
  
      // Convertir la URL al gateway HTTP
      return ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
  }
  