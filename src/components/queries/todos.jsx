import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import * as todosApi from "../apis/todos";
import { ALL_TODOS_QUERY_KEY } from "../pages/keys/reactQueryKeys";

export const useGetAllTodos = () => {
  return useQuery({
    queryKey: [ALL_TODOS_QUERY_KEY],
    queryFn: () => todosApi.getAllTodos(),
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTodo) =>
      todosApi.createTodo(newTodo.title, newTodo.description),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ALL_TODOS_QUERY_KEY],
      });
      toast.success("Todo created successfully");
    },
    onError: (error) => {
      toast.error(error || "Failed to create todo");
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todoId) => todosApi.deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ALL_TODOS_QUERY_KEY],
      });
      toast.success("Todo deleted successfully");
    },
    onError: (error) => {
      toast.error(error || "Failed to delete todo");
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, title, description}) => todosApi.updateTodo(id, title, description),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ALL_TODOS_QUERY_KEY],
      });
      toast.success("Todo updated successfully");
    },
    onError: (error) => {
      toast.error(error || "Failed to update todo");
    },
  });
};
