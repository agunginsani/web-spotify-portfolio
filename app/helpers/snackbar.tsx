import clsx from "clsx";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useReducer } from "react";

type SnackbarState = {
  message: string;
} | null;

type SnackbarAction =
  | {
      type: "show";
      message: string;
    }
  | {
      type: "dismiss";
    };

const SnackbarContext = createContext<{
  state: SnackbarState;
  dispatch: React.Dispatch<SnackbarAction>;
} | null>(null);

function reducer(state: SnackbarState, action: SnackbarAction): SnackbarState {
  switch (action.type) {
    case "show":
      return { ...state, message: action.message };
    case "dismiss":
      return null;
    default:
      throw new Error(`Unknown "action.type"`);
  }
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null);
  return (
    <SnackbarContext.Provider value={{ state, dispatch }}>
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (context === null) {
    throw new Error(`Snackbar cannot be used outside "SnackbarProvider"`);
  }

  return context;
}

export function Snackbar() {
  const { state, dispatch } = useSnackbar();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (state !== null) {
      timer = setTimeout(() => {
        dispatch({ type: "dismiss" });
      }, 3000);
    }

    return () => {
      if (timer !== null) clearTimeout(timer);
    };
  }, [state, dispatch]);

  return (
    <div
      className={clsx("fixed bottom-0 left-0 w-full bg-white p-5 text-black", {
        hidden: state === null,
      })}
    >
      {state?.message}
    </div>
  );
}
