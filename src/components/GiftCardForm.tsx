"use client";

import { useState } from "react";
import { GiftCard } from "@/types";

interface GiftCardFormProps {
  publicKey: string;
  onGiftCardCreated: (giftCard: GiftCard) => void;
}

export default function GiftCardForm({ publicKey, onGiftCardCreated }: GiftCardFormProps) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("XLM");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !recipientEmail) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      // Generate a unique gift card ID
      const giftCardId = `gift_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create the gift card object
      const giftCard: GiftCard = {
        id: giftCardId,
        amount: parseFloat(amount),
        currency,
        recipientEmail,
        message: message || "¡Felicitaciones! Tienes un regalo especial.",
        senderAddress: publicKey,
        createdAt: new Date().toISOString(),
        status: "pending",
        claimUrl: `${window.location.origin}/claim/${giftCardId}`,
      };

      // For MVP, we'll simulate the transaction
      // In a real implementation, you would:
      // 1. Create a claimable balance on Stellar
      // 2. Store the gift card data in a database
      // 3. Send the claim URL to the recipient

      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update gift card status
      giftCard.status = "created";
      
      onGiftCardCreated(giftCard);
      
      // Reset form
      setAmount("");
      setRecipientEmail("");
      setMessage("");
      
    } catch (error) {
      console.error("Error creating gift card:", error);
      setError("Error al crear la tarjeta de regalo. Intenta de nuevo.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount and Currency */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Cantidad
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0.01"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
            Moneda
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="XLM">XLM</option>
            <option value="USDC">USDC</option>
          </select>
        </div>
      </div>

      {/* Recipient Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email del Destinatario
        </label>
        <input
          type="email"
          id="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          placeholder="destinatario@ejemplo.com"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Mensaje Personalizado (Opcional)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="¡Felicitaciones! Tienes un regalo especial."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isCreating || !amount || !recipientEmail}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isCreating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creando Tarjeta...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
            Crear Tarjeta de Regalo
          </>
        )}
      </button>

      {/* Info */}
      <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
        <p className="font-medium mb-2">ℹ️ Información importante:</p>
        <ul className="space-y-1">
          <li>• La tarjeta se enviará por email al destinatario</li>
          <li>• El destinatario podrá canjearla sin necesidad de wallet previa</li>
          <li>• Se creará automáticamente una wallet para el destinatario</li>
          <li>• Podrá intercambiar entre XLM y USDC instantáneamente</li>
        </ul>
      </div>
    </form>
  );
}
