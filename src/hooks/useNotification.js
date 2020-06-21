import { useSnackbar } from "notistack";

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (msg, variant) =>
    enqueueSnackbar(msg, {
      variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
};
