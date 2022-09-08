import type { Metaplex as MetaplexType } from '@/Metaplex';
import { CreateAuctionHouseInput } from '@/plugins';
import { sol, Signer } from '@/types';

export const createAuctionHouse = async (
  mx: MetaplexType,
  auctioneerAuthority?: Signer | null,
  input: Partial<CreateAuctionHouseInput> = {}
) => {
  const { auctionHouse } = await mx
    .auctionHouse()
    .create({
      sellerFeeBasisPoints: 200,
      auctioneerAuthority: auctioneerAuthority?.publicKey,
      ...input,
    })
    .run();

  await mx.rpc().airdrop(auctionHouse.feeAccountAddress, sol(100));

  return {
    auctionHouse,
  };
};
