import "@mantine/core/styles.css";
import { MantineProvider, Flex, Text } from "@mantine/core";
import { theme } from "./theme";
import TableComponent from "./components/table";
import { CROP_AVG_YEILD_AND_AREA_TABLE_HEAD, CROP_PRODUCTION_TABLE_HEAD, TOTAL_CROP_PRODUCTION_TABLE_HEAD } from "./constant/table";
import { useEffect, useState } from "react";
import CropService from "./service/crop.service";
import { Crop, CropAvg, CropProduction, TotalCropProduction } from "./types/crop";
import { cropAvgYieldAndAreaData, cropProductionExtremesData, totalCropProduction } from "./utils/crop";

export default function App() {

  const [cropData, setCropData] = useState<Crop[]>([]);
  const [cropProductionData, setCropProductionData] = useState<CropProduction[]>([]);
  const [cropAvgYeildAndAreaData, setCropAvfYeildAndAreaData] = useState<CropAvg[]>([]);
  const [totalCropProductionData, setTotalCropProductionData] = useState<TotalCropProduction[]>([]);

  const cropService = new CropService();

  const getCropData = async () => {
    const response = await cropService.getCropData();
    if (response.data){
      setCropData(response.data);
    }
  }

  useEffect(() => {
    getCropData().catch(() => {});
  }, []);

  useEffect(() => {
    if (cropData.length > 0){
      setTotalCropProductionData(totalCropProduction(cropData));
      setCropProductionData(cropProductionExtremesData(cropData));
      setCropAvfYeildAndAreaData(cropAvgYieldAndAreaData(cropData));
    }
  }, [cropData]);

  return (
      <MantineProvider theme={theme}>
        <div style={{ padding: '20px' }}>
        <Flex
          gap="xl"
          direction="column"
        >
        <Flex
          mih={50}
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="column"
          wrap="nowrap"
        >
          <Text>Total Crop Production from 1950 to 2020</Text>
          <TableComponent head={TOTAL_CROP_PRODUCTION_TABLE_HEAD} body={totalCropProductionData} />
        </Flex>
        <Flex
          mih={50}
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="column"
          wrap="nowrap"
        >
          <Text>Crop with Maximum And Minmum Production in that Year</Text>
          <TableComponent head={CROP_PRODUCTION_TABLE_HEAD} body={cropProductionData} />
        </Flex>
        <Flex
          mih={50}
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="column"
          wrap="nowrap"
        >
          <Text>Crop with Avg Yeild And Avg Cultivation Area Crop between 1950-2020</Text>
          <TableComponent head={CROP_AVG_YEILD_AND_AREA_TABLE_HEAD} body={cropAvgYeildAndAreaData} />
        </Flex>
        </Flex>
        </div>
      </MantineProvider>
  );
}
