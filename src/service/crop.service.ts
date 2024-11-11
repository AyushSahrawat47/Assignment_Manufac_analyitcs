import { Crop } from "../types/crop";
import { ApiResponse } from "./service-response";

export default class CropService {
  getCropData = async ():
  Promise<ApiResponse<Crop[]>> => {
    try {
      const response = await fetch('./src/constant/manufac-india-agro-dataset.json');
      const responseJson = await response.json();

      const cropData:Crop[] = [];

      responseJson.map((item) => {
        cropData.push({
          areaUnderCultivation: item['Area Under Cultivation (UOM:Ha(Hectares))'],
          country: item.Country,
          cropName: item['Crop Name'],
          cropProduction: item['Crop Production (UOM:t(Tonnes))'] ? item['Crop Production (UOM:t(Tonnes))'] : 0,
          year: Number(item.Year.slice(-4)),
          yieldOfCrops: item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] ? item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] : 0,
        });
      });

      return new ApiResponse(cropData, undefined);
    } catch (e) {
      return new ApiResponse();
    }
  };
}
