
const getFigures = (receipt) => {
    const subtotal = receipt.amount ?? 0;
    const discountAmount = !receipt.discount?.type ? 0 : (
        receipt.discount.type === "percent" ? ((receipt.discount.value ?? 0) / 100) * subtotal : (receipt.discount.value ?? 0)
    );

    return {
        subtotal, discountAmount,
        total: subtotal - discountAmount
    }
};
exports.getFigures = getFigures;
