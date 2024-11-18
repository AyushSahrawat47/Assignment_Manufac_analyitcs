import "@mantine/core/styles.css";
import { MantineProvider, Flex} from "@mantine/core";
import { theme } from "./theme";
import {
  CROP_AVG_YEILD_AND_AREA_TABLE_HEAD,
  CROP_PRODUCTION_TABLE_HEAD
} from "./constant/table";
import { useEffect, useState } from "react";
import CropService from "./service/crop.service";
import {
  Crop,
  CropAvg,
  CropProduction,                                        
  TotalCropProduction,
} from "./types/crop";
import {
  cropAvgYieldAndAreaData,
  cropProductionExtremesData,
  getAllCropDataBasedOnYear,
  totalCropProduction,
} from "./utils/crop";
import { DataTable } from "./components";

export default function App() {
  const [cropData, setCropData] = useState<Crop[]>([]);
  //eslint-disable-next-line
  const [cropYearlyData, setCropYearlyData] = useState<Crop[]>([]);
  //eslint-disable-next-line
  const [value, setValue] = useState("1950");
  const [cropProductionData, setCropProductionData] = useState<
  CropProduction[]
  >([]);
  const [cropAvgYeildAndAreaData, setCropAvfYeildAndAreaData] = useState<
  CropAvg[]
  >([]);
  //eslint-disable-next-line
  const [totalCropProductionData, setTotalCropProductionData] = useState<
    TotalCropProduction[]
  >([]);

  const cropService = new CropService();

  const getCropData = async () => {
    const response = await cropService.getCropData();
    if (response.data) {
      setCropData(response.data);
    }
  };

  useEffect(() => {
    getCropData().catch(() => {});
    //eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    if (cropData.length > 0) {
      setTotalCropProductionData(totalCropProduction(cropData));
      setCropProductionData(cropProductionExtremesData(cropData));
      setCropAvfYeildAndAreaData(cropAvgYieldAndAreaData(cropData));
    }
  }, [cropData]);
  
  useEffect(() => {
    setCropYearlyData(getAllCropDataBasedOnYear(Number(value), cropData));
  }, [value, cropData]);
  
  return (
    <MantineProvider theme={theme}>
      <div style={{ padding: "20px" }}>
        <Flex gap="xl" direction="column">
          <DataTable
            head={CROP_PRODUCTION_TABLE_HEAD}
            body={cropProductionData}
            heading="Crop with Maximum And Minmum Production in that Year"
            >
          </DataTable>
          <DataTable
            head={CROP_AVG_YEILD_AND_AREA_TABLE_HEAD}
            body={cropAvgYeildAndAreaData}
            heading="Crop with Avg Yeild And Avg Cultivation Area Crop between 1950-2020"
          >
          </DataTable>
        </Flex>
      </div>
    </MantineProvider>
  );
}
