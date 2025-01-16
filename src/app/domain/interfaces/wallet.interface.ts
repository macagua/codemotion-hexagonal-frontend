export interface WalletInterface {
    /**
     * Solicita la conexión a la wallet y devuelve la cuenta conectada.
     * @returns Promise con la dirección de la cuenta conectada.
     */
    connectWallet(): Promise<string | null>;
  
    /**
     * Cambia la red activa en la wallet al Chain ID proporcionado.
     * @param chainId Hexadecimal del Chain ID al que se desea cambiar (ej. '0x89' para Polygon Mainnet).
     * @returns Promise con true si el cambio fue exitoso.
     */
    changeNetwork(chainId: string): Promise<boolean>;
  
    /**
     * Obtiene la cuenta actualmente conectada en la wallet.
     * @returns Promise con la dirección de la cuenta conectada o null si no hay conexión.
     */
    getConnectedAccount(): Promise<string | null>;
  
    /**
     * Obtiene la red actualmente activa en la wallet.
     * @returns Promise con el Chain ID de la red activa.
     */
    getCurrentNetwork(): Promise<string | null>;
  
    /**
     * Desconecta la wallet (a nivel de la aplicación, no MetaMask).
     */
    disconnectWallet(): void;
  }
  