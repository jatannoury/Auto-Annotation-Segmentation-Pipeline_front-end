const getCurrentDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
function findOldestAndNewestTimestamps(fileList) {
    
  let oldestTimestamp = null;
  let newestTimestamp = null;

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];

    const currentTimestamp = file.lastModified;

    if (oldestTimestamp === null || currentTimestamp < oldestTimestamp) {
      oldestTimestamp = currentTimestamp;
    }

    if (newestTimestamp === null || currentTimestamp > newestTimestamp) {
      newestTimestamp = currentTimestamp;
    }
  }

  return {
    oldest: new Date(oldestTimestamp).toISOString(),
    newest: new Date(newestTimestamp).toISOString(),
  };
}
module.exports = {
  getCurrentDateTime,
  findOldestAndNewestTimestamps,
};
