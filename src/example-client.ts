import { createApiClient } from "./spec/valtown-client";
import schemas from "./spec/schemas";
import { z } from "zod";

const token = process.env.VALTOWN_API_KEY;

const apiClient = createApiClient("https://api.val.town");

const BaseValList = z.array(schemas.BaseVal);

type ValListData = z.infer<typeof BaseValList>;

const listVals = async (offset: number = 0): Promise<ValListData> => {
  let response = await apiClient.getUserVals({
    params: { user_id: "5d1042a9-7b0b-499d-8a72-3a8ac7a4e185" },
    headers: { Authorization: "Bearer " + token },
    queries: { offset: offset },
  });

  const data = response.data;

  if (response.links && response.links.next) {
    return data.concat(await listVals(offset + 20));
  } else {
    return data;
  }
};

// @ts-ignore
const output = await listVals();

console.log(output.length);
for (const val of output) {
  console.log("@nbbaier." + val.name + "   !");
}
