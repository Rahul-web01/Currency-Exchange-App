import { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  currency,
  currencyOptions,
  onCurrencyChange,
  amountDisabled = false,
  names = {},
}) {
  const amountId = useId();
  const currencyId = useId();

  return (
    <div className="rounded-2xl bg-paper px-5 py-4 text-ink sm:px-6 sm:py-5">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={amountId} className="text-sm font-medium text-ink/70">
          {label}
        </label>
        <label htmlFor={currencyId} className="sr-only">
          {label} currency
        </label>
        <select
          id={currencyId}
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="max-w-[11rem] cursor-pointer rounded-lg bg-ink/5 px-3 py-1.5 text-sm font-semibold outline-none hover:bg-ink/10 focus-visible:ring-2 focus-visible:ring-ink"
        >
          {currencyOptions.map((c) => (
            <option key={c} value={c}>
              {c}
              {names[c] ? ` · ${names[c]}` : ""}
            </option>
          ))}
        </select>
      </div>
      <input
        id={amountId}
        type="number"
        inputMode="decimal"
        min="0"
        step="any"
        value={amount}
        disabled={amountDisabled}
        placeholder="0"
        onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
        className="num mt-2 w-full bg-transparent text-4xl font-semibold tracking-tight outline-none placeholder:text-ink/25 focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-8 sm:text-5xl"
      />
    </div>
  );
}

export default InputBox;
