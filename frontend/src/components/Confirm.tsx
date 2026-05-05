import React from "react";

const Confirm = ({ receipt }: { receipt: string }) => {
  return (
    <div>
      <h2 className="text-xl text-green-600 mb-3">
        Vote Recorded Successfully
      </h2>

      <p className="mb-2">Your Receipt ID:</p>

      <div className="p-3 bg-gray-200 break-all">
        {receipt}
      </div>

      <p className="mt-3 text-sm text-gray-600">
        Use this receipt to verify your vote later.
      </p>
    </div>
  );
};

export default Confirm;