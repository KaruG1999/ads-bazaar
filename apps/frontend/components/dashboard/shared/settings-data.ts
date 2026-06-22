export type UserProfile = {
  displayName: string;
  email: string;
  bio: string;
  role: "business" | "creator";
};

export const businessProfile: UserProfile = {
  displayName: "Stellar Labs Inc.",
  email: "admin@stellarlabs.io",
  bio: "Building the future of decentralized advertising on Stellar.",
  role: "business",
};

export const creatorProfile: UserProfile = {
  displayName: "Alexa Vibe",
  email: "alexa@vibestudio.co",
  bio: "Lifestyle & tech content creator. 1.7M+ reach across platforms.",
  role: "creator",
};
