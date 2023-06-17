const addressList: Record<string, `0x${string}`> = {
  RewardToken: "0x89B7A97F3610Aab7Da907340742873D0d4026453",
  MyGovernor: "0x1330028d78e97118E5b6BabeF5F5Ca652ab1543b",
  DealClient: "0xc796E89D757119a8efC307a19Dd1E049FD376F8E",
};

const getAddress = (key: string) => {
  return addressList[key] || "";
};

export default {
  raw: addressList,
  getAddress,
};
