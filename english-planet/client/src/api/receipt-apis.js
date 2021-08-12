
const createReceiptApis = (fetcher) => ({
    upsertReceipt: (receipt) => {
        return fetcher.put(`/receipt`, receipt);
    },
});
exports.createReceiptApis = createReceiptApis;
