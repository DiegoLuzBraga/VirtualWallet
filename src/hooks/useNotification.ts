import { useSnackbar, OptionsObject } from "notistack";

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (msg: string, variant: OptionsObject["variant"]) =>
    enqueueSnackbar(msg, {
      variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right"
      }
    });
};
