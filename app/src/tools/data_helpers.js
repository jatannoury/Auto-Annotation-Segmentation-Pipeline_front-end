function normalizeData(data) {
  if (Array.isArray(data) === false) {
    return [];
  }
  const bins = {};

  data.forEach((item) => {
    const binName = Math.floor(parseInt(item.name) / 1000) * 1000;
    if (!bins[binName]) {
      bins[binName] = { name: binName.toString(), count: 0 };
    }
    bins[binName].count += item.count;
  });
  console.log(
    Object.keys(bins).map((element) => {
      return bins[element];
    })
  );
  return Object.keys(bins).map((element) => {
    return bins[element];
  });
}
module.exports = {
  normalizeData,
};
