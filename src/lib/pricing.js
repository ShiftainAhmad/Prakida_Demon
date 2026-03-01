export const formatINR = (amount) => {
    const value = Number(amount);
    if (!Number.isFinite(value)) return "";
    return new Intl.NumberFormat("en-IN").format(value);
};

export const formatINRWithSymbol = (amount) => {
    const formatted = formatINR(amount);
    return formatted ? `₹${formatted}` : "";
};

export const formatRegistrationFee = (category) => {
    if (!category) return "";
    const fee = category.registrationFee;
    const feeText = formatINRWithSymbol(fee);
    if (!feeText) return "";

    const unit = category.feeUnit;
    if (unit === "per_head") return `${feeText} / head`;
    return feeText;
};

export const summarizeFee = (categories) => {
    const rows = (categories || []).filter((c) => Number.isFinite(Number(c?.registrationFee)));
    if (!rows.length) return "";

    const units = new Set(rows.map((c) => c.feeUnit || "team"));
    const fees = rows.map((c) => Number(c.registrationFee)).filter((n) => Number.isFinite(n));

    const minFee = Math.min(...fees);
    const maxFee = Math.max(...fees);

    if (units.size === 1) {
        const unit = Array.from(units)[0];
        const suffix = unit === "per_head" ? " / head" : "";
        if (minFee === maxFee) return `${formatINRWithSymbol(minFee)}${suffix}`;
        return `${formatINRWithSymbol(minFee)}–${formatINRWithSymbol(maxFee)}${suffix}`;
    }

    // Mixed units across categories (e.g. per-head + team)
    return `From ${formatINRWithSymbol(minFee)}`;
};

export const summarizePrizePool = (categories) => {
    const rows = (categories || []).filter((c) => Number.isFinite(Number(c?.prizePool)));
    if (!rows.length) return "";
    const prizes = rows.map((c) => Number(c.prizePool)).filter((n) => Number.isFinite(n));
    const maxPrize = Math.max(...prizes);
    return formatINR(maxPrize);
};
