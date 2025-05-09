import { fetchNumbers } from "../services/numberFetcher.js";
import { getWindow, updateWindow } from "../utils/windowManager.js";

const validTypes = {
  p: "primes",
  f: "fibo",
  e: "even",
  r: "rand"
};

const getNumbers = async (req, res) => {
  const { type } = req.params;

  if (!validTypes[type]) {
    return res.status(400).json({ error: "Invalid number ID" });
  }

  const prevWindow = getWindow();
  let numbers = [];

  try {
    numbers = await fetchNumbers(validTypes[type]);
  } catch (err) {
    console.error("Fetch failed or timed out");
    return res.status(500).json({ error: "Upstream fetch error" });
  }

  const updatedWindow = updateWindow(numbers);

  const avg =
    updatedWindow.reduce((sum, n) => sum + n, 0) / updatedWindow.length;

  res.json({
    windowPrevState: prevWindow,
    windowCurrState: updatedWindow,
    numbers,
    avg: parseFloat(avg.toFixed(2))
  });
};

export default getNumbers;
