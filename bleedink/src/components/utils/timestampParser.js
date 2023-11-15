import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const timestampParser = (timestamp) => {
  const newTimestamp = dayjs(timestamp).fromNow();
  return newTimestamp;
};

export default timestampParser;
