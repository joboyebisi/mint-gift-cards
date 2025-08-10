"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ClaimForm from "@/components/ClaimForm";
import ClaimSuccess from "@/components/ClaimSuccess";
import { GiftCard, RecipientData } from "@/types";

export default function ClaimPage() {
  const params = useParams();
  const giftCardId = params.id as string;
  
  const [giftCard, setGiftCard] = useState<GiftCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaimed, setIsClaimed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching gift card data
    // In a real implementation, this would fetch from your backend
    const fetchGiftCard = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock gift card data - in real app this would come from your database
        const mockGiftCard: GiftCard = {
          id: giftCardId,
          amount: 50,
          currency: "XLM",
          recipientEmail: "destinatario@ejemplo.com",
          message: "¡Felicitaciones! Tienes un regalo especial.",
          status: "pending",
          createdAt: new Date().toISOString(),
          senderAddress: "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          claimUrl: `${window.location.origin}/claim/${giftCardId}`
        };
        
        setGiftCard(mockGiftCard);
      } catch {
        setError("Error al cargar la tarjeta de regalo");
      } finally {
        setIsLoading(false);
      }
    };

    if (giftCardId) {
      fetchGiftCard();
    }
  }, [giftCardId]);

  const handleClaim = async (recipientData: RecipientData) => {
    try {
      setIsLoading(true);
      
      // Simulate claim process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update gift card status
      setGiftCard((prev: GiftCard | null) => {
        if (!prev) return null;
        return {
          ...prev,
          status: "claimed",
          recipientData
        };
      });
      
      setIsClaimed(true);
    } catch {
      setError("Error al canjear la tarjeta de regalo");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tarjeta de regalo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!giftCard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tarjeta No Encontrada</h1>
          <p className="text-gray-600">La tarjeta de regalo que buscas no existe o ya fue canjeada.</p>
        </div>
      </div>
    );
  }

  if (isClaimed) {
    return <ClaimSuccess giftCard={giftCard} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Tienes un Regalo! 🎁
          </h1>
          <p className="text-lg text-gray-600">
            Alguien te ha enviado una tarjeta de regalo en blockchain
          </p>
        </div>

        {/* Gift Card Preview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg p-6 text-white mb-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h2 className="text-2xl font-bold mb-2">Tarjeta de Regalo</h2>
              <div className="text-4xl font-bold mb-2">
                {giftCard.amount} {giftCard.currency}
              </div>
            </div>
          </div>

          {giftCard.message && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Mensaje del Remitente:</h3>
              <p className="text-blue-800 italic">&quot;{giftCard.message}&quot;</p>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Detalles:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="font-mono text-gray-900">{giftCard.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                  Pendiente de Canje
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
        </div>

        {/* Claim Form */}
        <ClaimForm 
          giftCard={giftCard} 
          onClaim={handleClaim}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
