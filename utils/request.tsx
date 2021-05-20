import axios from "axios";

export const GET = async (
  url: string,
  params: object,
): Promise<any> => {
  if (params) url += GetParams(params);
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    return handleError(error);
  }
};

export const GetParams = (params: object) => {
  let paramsUrl = "?";
  try {
    for (const key of Object.keys(params)) {
      paramsUrl += key + "=" + params[key] + "&";
    }
    return paramsUrl.slice(0, -1);
  } catch (error) {
    console.error(error);
    return "";
  }
};

const handleError = (error: any) => {
  console.log(error);
  console.log(error.response);
  if (
    error.response &&
    error.response.data &&
    error.response.data.returnStatus
  ) {
    return error.response.data;
  } else {
    return { returnStatus: null };
  }
};
