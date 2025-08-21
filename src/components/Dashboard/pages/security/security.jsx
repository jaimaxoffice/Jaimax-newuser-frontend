import React, { useEffect, useState } from "react";
import { useGetLegalQuery } from "./legalApiSlice";
const Legal = () => {
  const [legalData, setLegalData] = useState("");
  const { data, isLoading, error } = useGetLegalQuery();

  useEffect(() => {
    if (data) {
      let responseData = data?.data?.legal_text || "N/A";
      setLegalData(responseData);
    }
  }, [data]);

  return (
    <section className="py-8 bg-gradient-to-br from-teal-50 to-white min-h-screen">
      <div className="w-full px-4 max-w-screen mx-auto">
        <div className="flex flex-col">
          <h4 className="text-teal-800 mb-6 text-2xl font-bold">Legal Details</h4>
          <div className="w-full">
            <div className="bg-white border border-teal-100 rounded-xl py-6 px-8 shadow-lg shadow-teal-100/50">
              <div
                dangerouslySetInnerHTML={{ __html: legalData }}
                className="text-gray-800 prose prose-lg prose-teal max-w-none 
                          prose-headings:text-teal-700 prose-links:text-teal-600 
                          prose-strong:text-teal-800 prose-p:text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legal;