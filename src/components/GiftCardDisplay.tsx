"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { GiftCard } from "@/types";

interface GiftCardDisplayProps {
  giftCard: GiftCard;
}

export default function GiftCardDisplay({ giftCard }: GiftCardDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(giftCard.claimUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const shareViaEmail = () => {
    const subject = "¡Tienes un regalo especial! 🎁";
    const body = `Hola,

¡Tienes un regalo especial esperando por ti!

${giftCard.message}

Cantidad: ${giftCard.amount} ${giftCard.currency}

Para canjear tu regalo, visita este enlace:
${giftCard.claimUrl}

¡Disfruta tu regalo!

Saludos,
El equipo de Mint`;

    window.open(`mailto:${giftCard.recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="space-y-6">
      {/* Gift Card Visual */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">🎁</div>
          <h3 className="text-xl font-bold mb-2">Tarjeta de Regalo</h3>
          <div className="text-3xl font-bold mb-2">
            {giftCard.amount} {giftCard.currency}
          </div>
          <p className="text-purple-100 text-sm">
            Para: {giftCard.recipientEmail}
          </p>
        </div>
      </div>

      {/* QR Code */}
      <div className="text-center">
        <div className="bg-white p-4 rounded-lg inline-block">
          <QRCode 
            value={giftCard.claimUrl}
            size={200}
            level="M"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Escanea para canjear
        </p>
      </div>

      {/* Gift Card Details */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Detalles del Regalo</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">ID:</span>
            <span className="font-mono text-gray-900">{giftCard.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estado:</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              giftCard.status === 'created' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {giftCard.status === 'created' ? 'Creada' : 'Pendiente'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Creada:</span>
            <span className="text-gray-900">
              {new Date(giftCard.createdAt).toLocaleDateString('es-ES')}
            </span>
          </div>
        </div>
      </div>

      {/* Message */}
      {giftCard.message && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Mensaje:</h4>
          <p className="text-blue-800 italic">&quot;{giftCard.message}&quot;</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={copyToClipboard}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
          {copied ? "¡Copiado!" : "Copiar Enlace"}
        </button>

        <button
          onClick={shareViaEmail}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Enviar por Email
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-900 mb-2">✅ Tarjeta Creada Exitosamente</h4>
        <p className="text-green-800 text-sm">
          Tu tarjeta de regalo ha sido creada. El destinatario recibirá un email con el enlace para canjear su regalo.
        </p>
      </div>
    </div>
  );
}
