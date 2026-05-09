// M-Pesa API Types

export interface MpesaSTKPushRequest {
  phone: string;
  amount: number;
  accountRef: string;
  description: string;
}

export interface MpesaSTKPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

export interface MpesaCallbackData {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: number;
  ResultDesc: string;
  CallbackMetadata?: {
    Item: Array<{
      Name: string;
      Value: string | number;
    }>;
  };
}

export interface MpesaCallback {
  Body: {
    stkCallback: MpesaCallbackData;
  };
}