"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { carDetails } from "@/lib/data/car-details";
import { formatIDR, getStartingPrice } from "@/lib/car-price";
import {
  DP_MAX_PERCENT,
  DP_MIN_PERCENT,
  DP_STEP_PERCENT,
  TENOR_OPTIONS_YEARS,
  calculateInstallment,
} from "@/lib/car-finance";
import { cn } from "@/lib/utils";

export default function FinancingCalculatorSection() {
  const [selectedCarId, setSelectedCarId] = useState(carDetails[0]!.id);
  const [dpPercent, setDpPercent] = useState(20);
  const [tenorYears, setTenorYears] = useState(3);

  const selectedCar =
    carDetails.find((car) => car.id === selectedCarId) ?? carDetails[0]!;
  const otrPrice = getStartingPrice(selectedCar);

  const estimate = useMemo(() => {
    if (otrPrice == null) return undefined;
    return calculateInstallment({ otrPrice, dpPercent, tenorYears });
  }, [otrPrice, dpPercent, tenorYears]);

  return (
    <section id="simulasi" className="p-6 sm:p-10 lg:p-16 scroll-mt-28">
      <div className="max-w-2xl mb-8 sm:mb-12">
        <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-primary uppercase">
          Simulasi Cicilan
        </h3>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
          Hitung Estimasi Cicilan Bulanan Anda
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="calculator-car" className="text-sm font-medium">
              Pilih Tipe Mobil
            </label>
            <select
              id="calculator-car"
              value={selectedCarId}
              onChange={(event) => setSelectedCarId(event.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {carDetails.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium">Uang Muka (DP)</p>
              <span className="text-sm text-muted-foreground">
                {dpPercent}%
                {otrPrice != null && (
                  <span className="ml-2 font-semibold text-foreground">
                    {formatIDR(otrPrice * (dpPercent / 100))}
                  </span>
                )}
              </span>
            </div>
            <Slider
              min={DP_MIN_PERCENT}
              max={DP_MAX_PERCENT}
              step={DP_STEP_PERCENT}
              value={dpPercent}
              onValueChange={(value) => setDpPercent(value)}
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Tenor</p>
            <div className="flex flex-wrap gap-2">
              {TENOR_OPTIONS_YEARS.map((years) => (
                <button
                  key={years}
                  type="button"
                  onClick={() => setTenorYears(years)}
                  className={cn(
                    buttonVariants({
                      variant: years === tenorYears ? "default" : "outline",
                      size: "sm",
                    }),
                  )}
                >
                  {years} Tahun
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5">
          <p className="text-sm text-muted-foreground">
            Estimasi cicilan / bulan
          </p>
          <p className="text-3xl sm:text-4xl font-bold">
            {estimate ? formatIDR(estimate.monthlyInstallment) : "—"}
          </p>

          <div className="space-y-2 text-sm border-t border-border pt-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Uang Muka</span>
              <span className="text-foreground">
                {estimate ? formatIDR(estimate.dpAmount) : "—"}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tenor</span>
              <span className="text-foreground">{tenorYears} Tahun</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Total Bunga</span>
              <span className="text-foreground">
                {estimate ? formatIDR(estimate.totalInterest) : "—"}
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Estimasi, bukan penawaran resmi — bunga aktual tergantung mitra
            pembiayaan.
          </p>

          <Link
            href="#konsultasi"
            className={cn(buttonVariants({ size: "lg" }), "w-full text-md py-5.5")}
          >
            Ajukan Simulasi ke Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
