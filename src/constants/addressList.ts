const addressList: Record<string, `0x${string}`> = {
  RewardToken: "0x89B7A97F3610Aab7Da907340742873D0d4026453",
  MyGovernor: "0x80A6034458dbb66614B1cC6Ee8F540d2df5b8159",
  DealClient: "0xc796E89D757119a8efC307a19Dd1E049FD376F8E",
};

const getAddress = (key: string) => {
  return addressList[key] || "";
};

export default {
  raw: addressList,
  getAddress,
};
