interface IResponse<T> {
  status: "success" | "error";
  message: string | null;
  data: null | T;
}

export async function RequestFN<T>(
  request: () => Promise<T>
): Promise<IResponse<T>> {
  const resp: IResponse<T> = {
    status: "success",
    message: null,
    data: null
  };

  try {
    resp.data = await request();
  } catch (error) {
    resp.status = "error";
    resp.message = error.message;
  }

  return resp;
}
