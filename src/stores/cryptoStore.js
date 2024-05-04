import { create } from "zustand";
import { persist } from "zustand/middleware";

const cryptoStore = create()(
  persist(
    (set) => ({
      cryptoParams: {
        currency: "usd",
        perPage: 10,
        sortBy: "market_cap_desc",
        coinSelected: "",
        pageSelected: 1,
      },
      updateCryptoParams: (newCryptoParams) =>
        set({
          cryptoParams: newCryptoParams,
        }),
    }),
    {
      name: "cryptoParams store",
    }
  )
);

export default cryptoStore;
