import jcoin from "../../../../../assets/logo.webp";

export const getOrdinalNumber = (num) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = num % 100;
  const suffix =
    suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
  return `${num}${suffix}`;
};

// utils.js
export const transformApiDataToSlabs = (apiData) => {
  if (!apiData?.data?.rounds) return staticSlabsData;

  return apiData.data.rounds.map((round) => {
    const percent = (round.soldQty / round.totalQty) * 100;

    const soldPercentage = percent < 0.01
      ? percent.toFixed(4)
      : percent.toFixed(2);
    const isActive = round.status === 1;
    const isCompleted = round.status === 2;
    
    return {
      id: round.round,
      _id: round._id,
      title: `${getOrdinalNumber(round.round)} ICO Slab`,
      status: isActive ? "Live" : isCompleted ? "Sold" : "Upcoming",
      statusColor: isActive
        ? "bg-emerald-500"
        : isCompleted
        ? "bg-red-500"
        : "bg-amber-500",
      type: isActive ? "active" : isCompleted ? "sold" : "upcoming",
      prices: {
        usd: round.atPriceUsdt,
        inr: round.atPriceInr,
      },
      soldPercentage: parseFloat(soldPercentage),
      totalCoins: round.totalQty.toString(),
      soldQty: round.soldQty,
      remainingQty: round.remaingQty,
      jaimaxCoins: round.jaimaxCoins,
      round: round.round,
      atPriceInr: round.atPriceInr,
      atPriceUsdt: round.atPriceUsdt,
      description: isActive
        ? `Invest in Jaimax ${getOrdinalNumber(
            round.round
          )} ICO slab for your financial future.`
        : isCompleted
        ? `${getOrdinalNumber(round.round)} ICO slab has been sold out.`
        : `Get ready for the ${getOrdinalNumber(round.round)} ICO slab launch.`,
    };
  });
};

export const staticSlabsData = [
  {
    id: 1,
    title: "1st ICO Slab",
    status: "Live",
    statusColor: "bg-emerald-500",
    type: "active",
    prices: { usd: 0.00044, inr: 0.04 },
    soldPercentage: 20.5,
    totalCoins: "50000000000",
    description: "Invest in Jaimax 1st ICO slab for your financial future.",
  },
  {
    id: 2,
    title: "2nd ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.00059, inr: 0.05 },
    totalCoins: "20000000000",
  },
  {
    id: 3,
    title: "3rd ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.0071, inr: 0.6 },
    totalCoins: "25000000000",
  },
  {
    id: 4,
    title: "4th ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.01893, inr: 1.6 },
    totalCoins: "30000000000",
  },
  {
    id: 5,
    title: "5th ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.00189, inr: 0.159 },
    totalCoins: "23000000000",
  },
];