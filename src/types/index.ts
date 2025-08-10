export interface GiftCard {
  id: string;
  amount: number;
  currency: string;
  recipientEmail: string;
  message: string;
  senderAddress: string;
  createdAt: string;
  status: "pending" | "created" | "claimed";
  claimUrl: string;
  recipientData?: RecipientData;
  claimedAt?: string;
}

export interface RecipientData {
  name: string;
  email: string;
  phone?: string;
}

export interface WalletInfo {
  address: string;
  network: string;
  status: string;
}
