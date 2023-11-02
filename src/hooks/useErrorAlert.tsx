import React, { FC } from "react";
import MuiAlert from "@mui/material/Alert";

function Alert(props: any): JSX.Element {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export type ErrorAlertType = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
};

export type UseErrorAlertType = {
  hideAfterMs?: number;
  error: string;
  clearError: () => void;
};

export function ErrorAlert({ isOpen, message, onClose = () => {} }: ErrorAlertType): JSX.Element {
  return isOpen ? (
    <Alert onClose={onClose} severity="error">
      {message}
    </Alert>
  ) : (
    <></>
  );
}

export function useErrorAlert({ error, clearError, hideAfterMs }: UseErrorAlertType): () => JSX.Element {
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const clearErrorAlert = React.useCallback(() => {
    clearError();
    setShowErrorAlert(false);
  }, [clearError]);

  React.useEffect(() => {
    if (error) {
      setShowErrorAlert(true);
      if (hideAfterMs) {
        const timeout = setTimeout(() => {
          clearErrorAlert();
        }, hideAfterMs);
        return () => {
          clearTimeout(timeout);
        };
      }
    } else {
      setShowErrorAlert(false);
    }
  }, [error, clearErrorAlert, hideAfterMs]);

  return () => (
    <ErrorAlert
      isOpen={showErrorAlert}
      message={error}
      onClose={() => {
        clearErrorAlert();
      }}
    />
  );
}
