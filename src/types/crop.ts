import { JsonObject } from "./common-types";

export type CropProduction = {
  year: number;
  maximumCropProduction: string;
  minimumCropProduction: string;
}

export type CropAvg = {
  cropName: string;
  avgYield: number;
  avgArea: number;
}

export type CropCalStats = {
  totalArea: number;
  totalYield: number;
  count: number;
};

export type TotalCropProduction = {
  totalCropProduction: number;
  cropName: string;
}

export class Crop {
  areaUnderCultivation: number;
  country: string;
  cropName: string;
  cropProduction: number;
  year: number;
  yieldOfCrops: number;

  constructor(json: JsonObject) {
    this.areaUnderCultivation = json.areaUnderCultivation as number;
    this.country = json.country as string;
    this.cropName = json.cropName as string;
    this.cropProduction = json.cropProduction as number;
    this.year = json.year as number;
    this.yieldOfCrops = json.yieldOfCrops as number;
  }
}
