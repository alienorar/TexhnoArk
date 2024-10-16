import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubCategory, updateSubCategory } from "../service";
import { SubCreate } from "../types";
import { openNotification } from "@utils";

// ============CREATE SUB CATEGORY============
export function useCreateSubCategory() {
    return useMutation({
        mutationFn: (data: SubCreate) => createSubCategory(data),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.message)

        },
        onError: (error) => {
            openNotification("error", "Error", error?.message)
        }
    })
}

// ============UPDATE SUB CATEGORY============
export function useUpdateSubCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: SubCreate) => updateSubCategory(data),
        onSuccess: (data) => {
            console.log(data);
            openNotification("success", "Success", data?.data?.data?.message)
        },
        onSettled: (_, error, variables) => {
            if (error) {
                openNotification("error", "Error", error.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["category", { id: variables.id }] })
            }
        }
    })
}