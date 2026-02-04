import React from "react";
import { CheckCircle, Coins, BarChart2, DollarSign, Users } from "lucide-react";
import jcoin from "../../../../../assets/logo.webp";

const CompletedSlab = ({ slab, isActive }) => (
  <div
    className={`bg-white rounded-xl p-5 text-gray-800 shadow-md border border-gray-200 transform transition-all duration-700 min-h-[250px] relative overflow-hidden ${
      isActive ? "scale-100 opacity-100" : "scale-95 opacity-80"
    }`}
  >
    {/* Subtle background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 pointer-events-none"></div>
    
    {/* Header */}
    <div className="relative z-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-12 bg-[#085358] rounded-sm mr-1"></div>
          <div>
            <h3 className="text-gray-900 font-semibold text-lg leading-tight">
              {slab.title}
            </h3>
            <p className="text-gray-500 text-xs">Round {slab.id} completed</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-blue-200 font-medium">
            <CheckCircle size={12} strokeWidth={2.5} />
            <span>Sold Out</span>
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="mb-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Left column - Token info */}
          <div className="flex-1 bg-slate-50 rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-slate-200">
                <img src={jcoin} alt="Coin" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="text-gray-700 font-medium text-base">JAIMAX Token</h4>
                <p className="text-slate-500 text-xs">ICO completed successfully</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-xs text-gray-500 font-medium">Total Supply</span>
              <span className="text-sm text-gray-800 font-semibold">{parseInt(slab.totalCoins).toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-xs text-gray-500 font-medium">Sold Amount</span>
              <span className="text-sm text-gray-800 font-semibold">{parseInt(slab.totalCoins).toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-gray-500 font-medium">Completion</span>
              <span className="text-sm text-emerald-600 font-semibold">100%</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-slate-200 rounded-full h-1.5 my-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-full"></div>
            </div>
          </div>
          
          {/* Right column - Financial info */}
          <div className="flex-1 bg-slate-50 rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart2 className="text-blue-600" size={16} />
              <h4 className="text-gray-700 font-medium text-base">Final Pricing</h4>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
               <div className="bg-white rounded-md border border-slate-200 p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    {/* <span className="font-mono text-blue-500">₹</span> */}
                    INR Price
                  </span>
                  
                </div>
                <p className="text-lg font-semibold text-gray-800">₹{slab.prices.inr.toFixed(5)}</p>
              </div>
              <div className="bg-white rounded-md border border-slate-200 p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    {/* <DollarSign size={12} className="text-blue-500" /> */}
                    USD Price
                  </span>
             
                </div>
                <p className="text-lg font-semibold text-gray-800">${slab.prices.usd.toFixed(5)}</p>
              </div>
              
             
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="rounded-lg p-3 bg-blue-50 border border-blue-100 mt-2">
        
          
          <p className="text-sm text-gray-700 leading-tight text-center">
            
            {slab.description}
          </p>
     
      </div>
    </div>
  </div>
);

export default CompletedSlab;