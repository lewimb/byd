export const FLAT_RATE_ANNUAL = 0.045; // 4.5%/year flat — placeholder, swap for real partner rate when available
export const DP_MIN_PERCENT = 10;
export const DP_MAX_PERCENT = 50;
export const DP_STEP_PERCENT = 5;
export const TENOR_OPTIONS_YEARS = [1, 2, 3, 4, 5] as const;

export interface InstallmentInput {
  otrPrice: number;
  /** 10–50, matches DP_MIN_PERCENT..DP_MAX_PERCENT */
  dpPercent: number;
  /** one of TENOR_OPTIONS_YEARS */
  tenorYears: number;
}

export interface InstallmentEstimate {
  dpAmount: number;
  principal: number;
  totalInterest: number;
  totalPayable: number;
  monthlyInstallment: number;
}

export function calculateInstallment(input: InstallmentInput): InstallmentEstimate {
  const dpAmount = input.otrPrice * (input.dpPercent / 100);
  const principal = input.otrPrice - dpAmount;
  const totalInterest = principal * FLAT_RATE_ANNUAL * input.tenorYears;
  const totalPayable = principal + totalInterest;
  const monthlyInstallment = totalPayable / (input.tenorYears * 12);

  return { dpAmount, principal, totalInterest, totalPayable, monthlyInstallment };
}
