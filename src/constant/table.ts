import { TableHead } from "../types/table";

const TOTAL_CROP_PRODUCTION_TABLE_HEAD:TableHead[] = [
  new TableHead('cropName', 'Crop Name'),
  new TableHead('totalCropProduction', 'Total Production')
];

const CROP_PRODUCTION_TABLE_HEAD:TableHead[] = [
  new TableHead('year', 'Year'),
  new TableHead('maximumCropProduction', 'Crop with Maximum Production in that Year'),
  new TableHead('minimumCropProduction', 'Crop with Minimum Production in that Year'),
];

const CROP_AVG_YEILD_AND_AREA_TABLE_HEAD:TableHead[] = [
  new TableHead('cropName', 'Crop'),
  new TableHead('avgYield', 'Average Yield of the Crop between 1950-2020'),
  new TableHead('avgArea', 'Average Cultivation Area of the Crop between 1950-2020'),
];

export {
  CROP_PRODUCTION_TABLE_HEAD,
  CROP_AVG_YEILD_AND_AREA_TABLE_HEAD,
  TOTAL_CROP_PRODUCTION_TABLE_HEAD,
};
