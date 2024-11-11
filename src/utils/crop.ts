import { Crop, CropAvg, CropCalStats, CropProduction, TotalCropProduction } from "../types/crop";

// I read carefully of data-set and I found that the data-set is an array of objects, and it is sortred by year.

const findCropProductionExtremes = (year: number, dataset: Crop[]): { maxCrop: string, minCrop: string } => {
  const cropsForYear = dataset.filter(data => data.year === year);

  let maxCrop = cropsForYear[0];
  let minCrop = cropsForYear[0];

  for (const cropData of cropsForYear) {
    if (cropData.cropProduction > maxCrop.cropProduction) {
        maxCrop = cropData;
    }
    if (cropData.cropProduction < minCrop.cropProduction && cropData.cropProduction !== 0) {
        minCrop = cropData;
    }
  }

  return {
      maxCrop: maxCrop?.cropName,
      minCrop: minCrop?.cropName
  };
}

const cropProductionExtremesData= (dataSet: Crop[]): CropProduction[] => {
  const startYear = 1950;
  const endYear = 2020;
  const cropProductionData = [];

  for (let i = startYear; i <= endYear; i++) {
    const result = findCropProductionExtremes(i, dataSet);
    cropProductionData.push({
      year: i,
      maximumCropProduction: result.maxCrop,
      minimumCropProduction: result.minCrop
    });
  }
  return cropProductionData;
}

const cropAvgYieldAndAreaData= (dataSet: Crop[]): CropAvg[] => {
  const cropCalStats: { [key: string]: CropCalStats } = {};
  dataSet.forEach((crop) => {
    const cropName = crop.cropName;
    const area = crop.areaUnderCultivation || 0;
    const yieldOfCrops = crop.yieldOfCrops || 0;

    if (!cropCalStats[cropName]) {
        cropCalStats[cropName] = { totalArea: 0, totalYield: 0, count: 0 };
    }
    cropCalStats[cropName].totalArea += area;
    cropCalStats[cropName].totalYield += yieldOfCrops;
    cropCalStats[cropName].count += 1;
  });

  const avgStats = Object.keys(cropCalStats).map((cropName) => {
    const stats = cropCalStats[cropName];
    return {
        cropName,
        avgArea: Number((stats.totalArea / stats.count).toFixed(3)),
        avgYield: Number((stats.totalYield / stats.count).toFixed(3)),
    };
  });

  return avgStats;
}

const totalCropProduction = (dataSet: Crop[]): TotalCropProduction[] => {
  const cropCalStats: { [key: string]: { production: number} } = {};

  dataSet.forEach((crop) => {
    const cropName = crop.cropName;
    const production = crop.cropProduction || 0;

    if (!cropCalStats[cropName]) {
        cropCalStats[cropName] = { production: 0 };
    }
    cropCalStats[cropName].production += production;
  });

  const totalProdcutionStats = Object.keys(cropCalStats).map((cropName) => {
    const stats = cropCalStats[cropName];
    return {
        cropName,
        totalCropProduction: stats.production,
    };
  });

  return totalProdcutionStats;
}

export {
  cropProductionExtremesData,
  cropAvgYieldAndAreaData,
  totalCropProduction,
};
