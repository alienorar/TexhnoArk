import { useQuery } from "@tanstack/react-query";
import { getCategory, getSubCategory } from "../service";

// ============GET CATEGORY============
export function useGetCategory() {
    return useQuery({
        queryKey: ["category"],
        queryFn: () => getCategory()
    })
}
export function useGetSubCategory(parent_category_id:string|number) {
    return useQuery({
        queryKey: ["category",parent_category_id],
        queryFn: () => getSubCategory(parent_category_id)
    })
}
