
const createReceiptApis = (fetcher) => ({
    upsertReceipt: (receipt) => {
        return fetcher.put(`/receipt`, receipt);
    },
    deleteReceipt: (id) => {
        return fetcher.delete(`/receipt/${id}`);
    },
});
exports.createReceiptApis = createReceiptApis;
