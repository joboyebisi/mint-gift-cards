"use client";

import { useState } from "react";
import GiftCardForm from "@/components/GiftCardForm";
import WalletConnect from "@/components/WalletConnect";
import GiftCardDisplay from "@/components/GiftCardDisplay";
import { GiftCard } from "@/types";

export default function Home() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [giftCard, setGiftCard] = useState<GiftCard | null>(null);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Envía Regalos Digitales con Crypto
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Crea tarjetas de regalo en USDC y XLM usando la red Stellar. 
            Fácil, rápido y sin comisiones ocultas.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Gift Creation */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Crear Tarjeta de Regalo
            </h2>
            
            {!publicKey ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Conecta tu wallet para comenzar
                </p>
                <WalletConnect onConnect={setPublicKey} />
              </div>
            ) : (
              <div>
                <p className="text-sm text-green-600 mb-4">
                  ✅ Conectado: {publicKey.slice(0, 8)}...{publicKey.slice(-8)}
                </p>
                <GiftCardForm 
                  publicKey={publicKey} 
                  onGiftCardCreated={(card: GiftCard) => setGiftCard(card)}
                />
              </div>
            )}
          </div>

          {/* Right Column - Gift Display */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Tu Tarjeta de Regalo
            </h2>
            
            {giftCard ? (
              <GiftCardDisplay giftCard={giftCard} />
            ) : (
              <div className="text-center text-gray-500 py-12">
                <div className="text-6xl mb-4">🎁</div>
                <p>Tu tarjeta de regalo aparecerá aquí</p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Transacciones Instantáneas</h3>
            <p className="text-gray-600">
              La red Stellar procesa transacciones en segundos
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="text-lg font-semibold mb-2">Cash Out en MoneyGram</h3>
            <p className="text-gray-600">
              Retira tu USDC en efectivo en cualquier agencia MoneyGram
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-lg font-semibold mb-2">Alcance Global</h3>
            <p className="text-gray-600">
              Envía regalos a cualquier parte del mundo sin fronteras
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
