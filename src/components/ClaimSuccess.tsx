"use client";

import { useState } from "react";
import { GiftCard } from "@/types";

interface ClaimSuccessProps {
  giftCard: GiftCard;
}

export default function ClaimSuccess({ giftCard }: ClaimSuccessProps) {
  const [showWalletInfo, setShowWalletInfo] = useState(false);

  // Generate a mock wallet address for demo purposes
  const mockWalletAddress = "G" + "A".repeat(55);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Regalo Canjeado Exitosamente!
          </h1>
          <p className="text-lg text-gray-600">
            Tu tarjeta de regalo ha sido canjeada y los fondos están en tu nueva wallet
          </p>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-lg p-6 text-white mb-6">
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h2 className="text-2xl font-bold mb-2">Fondos Recibidos</h2>
              <div className="text-4xl font-bold mb-2">
                {giftCard.amount} {giftCard.currency}
              </div>
              <p className="text-green-100">
                Tu regalo está listo para usar
              </p>
            </div>
          </div>

          {/* Wallet Information */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Tu Nueva Wallet de Stellar</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Dirección:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-gray-900 text-xs">
                    {showWalletInfo ? mockWalletAddress : `${mockWalletAddress.slice(0, 8)}...${mockWalletAddress.slice(-8)}`}
                  </span>
                  <button
                    onClick={() => setShowWalletInfo(!showWalletInfo)}
                    className="text-purple-600 hover:text-purple-700 text-xs"
                  >
                    {showWalletInfo ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Red:</span>
                <span className="text-gray-900">Stellar Testnet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Activa
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">¿Qué puedes hacer ahora?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl mb-2">🔄</div>
                <h4 className="font-semibold text-blue-900 mb-2">Intercambiar</h4>
                <p className="text-blue-800 text-sm">
                  Cambia entre XLM y USDC instantáneamente usando el DEX de Stellar
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl mb-2">💸</div>
                <h4 className="font-semibold text-green-900 mb-2">Retirar Efectivo</h4>
                <p className="text-green-800 text-sm">
                  Retira tu USDC en efectivo en cualquier agencia MoneyGram
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-2xl mb-2">📱</div>
                <h4 className="font-semibold text-purple-900 mb-2">Enviar a Otros</h4>
                <p className="text-purple-800 text-sm">
                  Envía regalos a amigos y familiares usando la misma plataforma
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-2xl mb-2">🏪</div>
                <h4 className="font-semibold text-orange-900 mb-2">Usar en Comercios</h4>
                <p className="text-orange-800 text-sm">
                  Usa tus fondos en comercios que acepten pagos en Stellar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => window.open("https://stellar.org/developers/guides/get-started/create-account.html", "_blank")}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            Explorar Stellar
          </button>

          <button
            onClick={() => window.location.href = "/"}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            Crear Otro Regalo
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            ¿Necesitas ayuda? Contacta a nuestro equipo de soporte en{" "}
            <a href="mailto:soporte@mint.com" className="text-purple-600 hover:text-purple-700 underline">
              soporte@mint.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
