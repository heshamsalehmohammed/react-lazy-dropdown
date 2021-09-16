export const isElementAtBottom = (target, scrollThreshold = 0.8) => {
  const clientHeight = target.clientHeight;

  const threshold = parseThreshold(scrollThreshold);

  if (threshold.unit === ThresholdUnits.Pixel) {
    return (
      target.scrollTop + clientHeight >= target.scrollHeight - threshold.value
    );
  }

  return (
    target.scrollTop + clientHeight >=
    (threshold.value / 100) * target.scrollHeight
  );
};

const ThresholdUnits = {
  Pixel: 'Pixel',
  Percent: 'Percent',
};

const defaultThreshold = {
  unit: ThresholdUnits.Percent,
  value: 0.8,
};

const parseThreshold = (scrollThreshold) => {
  if (typeof scrollThreshold === 'number') {
    return {
      unit: ThresholdUnits.Percent,
      value: scrollThreshold * 100,
    };
  }

  if (typeof scrollThreshold === 'string') {
    if (scrollThreshold.match(/^(\d*(\.\d+)?)px$/)) {
      return {
        unit: ThresholdUnits.Pixel,
        value: parseFloat(scrollThreshold),
      };
    }

    if (scrollThreshold.match(/^(\d*(\.\d+)?)%$/)) {
      return {
        unit: ThresholdUnits.Percent,
        value: parseFloat(scrollThreshold),
      };
    }

    return defaultThreshold;
  }

  return defaultThreshold;
}
