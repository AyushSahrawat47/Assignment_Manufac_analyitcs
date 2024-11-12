import "@mantine/core/styles.css";
import { MantineProvider, Flex, Text, NativeSelect } from "@mantine/core";
import { theme } from "./theme";
import {
  CROP_AVG_YEILD_AND_AREA_TABLE_HEAD,
  CROP_PRODUCTION_TABLE_HEAD,
  CROP_PYEARLY_TABLE_HEAD,
  TOTAL_CROP_PRODUCTION_TABLE_HEAD,
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
import getYearData from "./utils/year";
import { DataTable } from "./components";

export default function App() {
  const [cropData, setCropData] = useState<Crop[]>([]);
  const [cropYearlyData, setCropYearlyData] = useState<Crop[]>([]);
  const [value, setValue] = useState("1950");
  const [cropProductionData, setCropProductionData] = useState<
    CropProduction[]
  >([]);
  const [cropAvgYeildAndAreaData, setCropAvfYeildAndAreaData] = useState<
    CropAvg[]
  >([]);
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
  }, []);

  useEffect(() => {
    if (cropData.length > 0) {
      setTotalCropProductionData(totalCropProduction(cropData));
      setCropProductionData(cropProductionExtremesData(cropData));
      setCropAvfYeildAndAreaData(cropAvgYieldAndAreaData(cropData));
    }
  }, [cropData]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setCropYearlyData(getAllCropDataBasedOnYear(Number(value), cropData));
  }, [value, cropData]);

  return (
    <MantineProvider theme={theme}>
      <div style={{ padding: "20px" }}>
        <Flex gap="xl" direction="column">
          <DataTable
            head={CROP_PYEARLY_TABLE_HEAD}
            body={cropYearlyData}
            heading="Crop Data Based on the Year"
          >
            <Flex
              mih={50}
              gap="md"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="nowrap"
            >
              <Text>Select Year: </Text>
              <NativeSelect
                value={value}
                onChange={handleChange}
                data={getYearData()}
              />
            </Flex>
          </DataTable>
          <DataTable
            head={TOTAL_CROP_PRODUCTION_TABLE_HEAD}
            body={totalCropProductionData}
            heading="Total Crop Production from 1950 to 2020"
          >
          </DataTable>
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
