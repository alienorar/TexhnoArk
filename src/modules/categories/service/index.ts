import axiosInstance from "@api";
import { ParamsType } from "@types";


// ===============GET CATEGORY=============
export async function getCategory(params:ParamsType) {
    return await axiosInstance.get("category/search",{params})
}