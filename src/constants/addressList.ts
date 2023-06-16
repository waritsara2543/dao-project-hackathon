const addressList: Record<string, `0x${string}`> = {
  RewardToken: "0x075e87A9eE1d06fe670E9c9e62763863b9457D3B",
  MyGovernor: "0x4cb0bbbd3a16bDd933a0B1Ad163a85e2AB45B6F9",
};

const getAddress = (key: string) => {
  return addressList[key] || "";
};

export default {
  raw: addressList,
  getAddress,
};
