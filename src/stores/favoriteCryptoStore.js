import { create } from "zustand";
import { persist } from "zustand/middleware";

const favoriteCryptoStore = create(
  persist(
    (set) => ({
      favoriteCrypto: [],
      addFavoriteCrypto: (crypto) =>
        set((state) => ({ favoriteCrypto: [...state.favoriteCrypto, crypto] })),
      removeFavoriteCrypto: (crypto) =>
        set((state) => ({
          favoriteCrypto: state.favoriteCrypto.filter(
            (cryptoItem) => cryptoItem !== crypto
          ),
        })),
    }),
    {
      name: "favoritecrypto store",
    }
  )
);

export default favoriteCryptoStore;
