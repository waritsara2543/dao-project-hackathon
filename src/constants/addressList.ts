const addressList: Record<string, `0x${string}`> = {
  RewardToken: "0x89B7A97F3610Aab7Da907340742873D0d4026453",
  MyGovernor: "0x34A0fAdc95F833168f9ED8d6b86E78fc2F6cEdB0",
  DealClient: "0xc796E89D757119a8efC307a19Dd1E049FD376F8E",
};

const getAddress = (key: string) => {
  return addressList[key] || "";
};

export default {
  raw: addressList,
  getAddress,
};
