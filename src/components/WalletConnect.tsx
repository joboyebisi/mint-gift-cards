"use client";

import { useState, useEffect, useCallback } from "react";
import { isConnected, setAllowed, getAddress } from "@stellar/freighter-api";

interface WalletConnectProps {
  onConnect: (publicKey: string) => void;
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkConnection = useCallback(async () => {
    try {
      const connected = await isConnected();
      if (connected) {
        const pubKey = await getAddress();
        onConnect(pubKey.address);
      }
    } catch (error) {
      console.error("Error checking connection:", error);
    }
  }, [onConnect]);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      await setAllowed();
      const pubKey = await getAddress();
      onConnect(pubKey.address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError("Error al conectar la wallet. Asegúrate de tener Freighter instalado.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isConnecting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Conectando...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
            Conectar Freighter Wallet
          </>
        )}
      </button>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="text-sm text-gray-600 text-center">
        <p>¿No tienes Freighter?</p>
        <a 
          href="https://www.freighter.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-purple-600 hover:text-purple-700 underline"
        >
          Descárgalo aquí
        </a>
      </div>
    </div>
  );
}
