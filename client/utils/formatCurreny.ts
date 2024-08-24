const formatCurrency = (data: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(data);
};

export default formatCurrency;
