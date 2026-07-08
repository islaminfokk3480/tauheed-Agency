import React, { useState, useEffect } from 'react';
import { Landmark, Calculator, Info, CheckCircle, Percent } from 'lucide-react';
import { formatPKRPrice } from './PropertyCard';

interface MortgageCalculatorProps {
  darkMode: boolean;
  initialPrice?: number;
}

export default function MortgageCalculator({ darkMode, initialPrice = 30000000 }: MortgageCalculatorProps) {
  // Input states
  const [price, setPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // default 20%
  const [interestRate, setInterestRate] = useState<number>(13.5); // standard KIBOR rate + margin
  const [tenureYears, setTenureYears] = useState<number>(15);

  // Calculated states
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [monthlyEMI, setMonthlyEMI] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  useEffect(() => {
    // Sync with initial price when it changes (e.g. selected from a property)
    if (initialPrice) {
      setPrice(initialPrice);
    }
  }, [initialPrice]);

  useEffect(() => {
    const downAmount = (price * downPaymentPercent) / 100;
    const principal = price - downAmount;
    
    setDownPaymentAmount(downAmount);
    setLoanAmount(principal);

    // EMI Calculation
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    if (interestRate === 0) {
      const emi = principal / totalMonths;
      setMonthlyEMI(emi);
      setTotalPayment(principal);
      setTotalInterest(0);
    } else {
      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                  (Math.pow(1 + monthlyRate, totalMonths) - 1);
      
      const totalPayable = emi * totalMonths;
      const totalInt = totalPayable - principal;

      setMonthlyEMI(emi);
      setTotalPayment(totalPayable);
      setTotalInterest(totalInt);
    }
  }, [price, downPaymentPercent, interestRate, tenureYears]);

  // Handle price presets
  const handlePricePreset = (val: number) => {
    setPrice(val);
  };

  // Percent ratio
  const principalPercent = totalPayment > 0 ? (loanAmount / totalPayment) * 100 : 100;
  const interestPercent = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  return (
    <div
      id="mortgage-calc"
      className={`p-6 sm:p-8 rounded-2xl border ${
        darkMode ? 'bg-[#0b0b0b]/80 border-white/10' : 'bg-slate-50 border-black/5'
      }`}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#C8A951]/10 flex items-center justify-center text-[#C8A951]">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-base uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Premium Mortgage & EMI Calculator
          </h3>
          <p className="text-[11px] font-mono text-[#C8A951] font-semibold uppercase">
            Calculate your monthly investments based on Karachi Bank rates
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5">
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                Property Value (PKR)
              </label>
              <span className="text-xs font-mono font-bold text-[#C8A951]">
                {formatPKRPrice(price, 'buy')}
              </span>
            </div>
            <input
              type="range"
              min={1000000} // 10 Lakhs
              max={500000000} // 50 Crores
              step={1000000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#C8A951] cursor-pointer h-1.5 rounded-lg bg-gray-700"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-500 mt-1">
              <span>10 Lakh</span>
              <span>10 Crore</span>
              <span>25 Crore</span>
              <span>50 Crore</span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {[15000000, 30000000, 50000000, 100000000, 150000000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePricePreset(preset)}
                  className={`px-2 py-1 rounded text-[10px] font-mono border transition-all ${
                    price === preset
                      ? 'bg-[#C8A951] border-[#C8A951] text-black font-bold'
                      : darkMode
                      ? 'bg-white/5 border-white/5 text-gray-400 hover:border-[#C8A951]/50'
                      : 'bg-black/5 border-black/5 text-slate-600 hover:border-[#C8A951]/50'
                  }`}
                >
                  {preset >= 10000000 ? `${preset / 10000000} Crore` : `${preset / 100000} Lakh`}
                </button>
              ))}
            </div>
          </div>

          {/* Down Payment Percent */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-xs font-mono font-semibold text-gray-400">
                {formatPKRPrice(downPaymentAmount, 'buy')}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#C8A951] cursor-pointer h-1.5 rounded-lg bg-gray-700"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-500 mt-1">
              <span>10% (Min)</span>
              <span>20% (Rec)</span>
              <span>40%</span>
              <span>60%</span>
              <span>80% (Max)</span>
            </div>
          </div>

          {/* Interest Markup Rate */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                Annual Markup / Interest Rate (%)
              </label>
              <span className="text-xs font-mono font-bold text-[#C8A951]">
                {interestRate}% P.A.
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={25}
              step={0.5}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#C8A951] cursor-pointer h-1.5 rounded-lg bg-gray-700"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-500 mt-1">
              <span>5% (Islamic)</span>
              <span>12%</span>
              <span>16% (KIBOR Average)</span>
              <span>20%</span>
              <span>25%</span>
            </div>
          </div>

          {/* Tenure Years */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                Loan Period / Tenure
              </label>
              <span className="text-xs font-mono font-bold text-[#C8A951]">
                {tenureYears} Years ({tenureYears * 12} Installments)
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-[#C8A951] cursor-pointer h-1.5 rounded-lg bg-gray-700"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-500 mt-1">
              <span>1 Year (Short)</span>
              <span>5 Years</span>
              <span>10 Years</span>
              <span>15 Years (Standard)</span>
              <span>25 Years (Max)</span>
            </div>
          </div>
        </div>

        {/* Right Outputs / Calculations */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className={`p-5 rounded-xl border flex flex-col justify-center text-center relative overflow-hidden ${
            darkMode ? 'bg-black/50 border-white/5' : 'bg-white border-black/5 shadow-sm'
          }`}>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#C8A951] uppercase block mb-1">
              Estimated Monthly Installment (EMI)
            </span>
            <span className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight block ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {formatPKRPrice(monthlyEMI, 'buy')}
            </span>
            <span className="text-[10px] text-gray-500 font-sans block mt-1">
              Estimated mortgage payment per month
            </span>

            {/* Highlighted info */}
            <div className="mt-5 pt-4 border-t border-dashed border-gray-700/20 text-left space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Total Down Payment:</span>
                <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {formatPKRPrice(downPaymentAmount, 'buy')}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Total Loan Principal:</span>
                <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {formatPKRPrice(loanAmount, 'buy')}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Total Interest Payable:</span>
                <span className="font-mono font-bold text-red-400">
                  {formatPKRPrice(totalInterest, 'buy')}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Total Capital Cost:</span>
                <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {formatPKRPrice(totalPayment, 'buy')}
                </span>
              </div>
            </div>

            {/* Ratio Breakdown bar */}
            <div className="mt-5">
              <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                <span>Principal ({principalPercent.toFixed(0)}%)</span>
                <span>Interest ({interestPercent.toFixed(0)}%)</span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden bg-gray-700 flex">
                <div style={{ width: `${principalPercent}%` }} className="h-full bg-[#C8A951]" title="Principal Ratio" />
                <div style={{ width: `${interestPercent}%` }} className="h-full bg-red-400" title="Interest Ratio" />
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl border border-[#C8A951]/10 bg-[#C8A951]/5 flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-[#C8A951] shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500 leading-normal">
              Disclaimer: This EMI calculation is for planning purposes only and is modeled on standard commercial mortgage rates in Pakistan. Actual loan terms, down payment criteria, and insurance surcharges are subject to final bank assessment and credit score verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
