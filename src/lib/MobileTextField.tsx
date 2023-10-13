import React, {
  EventHandler,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";
import { makeStyles } from "@mui/styles";
import { InputType } from "zlib";
// import "./styles.scss";

interface MobileTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  inputMask?: string;
  specialCharsToSkip?: string;
  required?: true | false;
  overHeadLabel?: string;
  upperCase?: true | false;
  showErrorForMasking?: true | false;
  placeholder?: string;
  disabled?: true | false;
  styles?: object;
}

const MobileTextField: React.FC<MobileTextFieldProps> = (
  props: MobileTextFieldProps
) => {
  const [error, setError] = useState(props.error);

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  const useStyles = makeStyles({
    root: {
      "& .MuiOutlinedInput-input": {
        fontSize: "14px !important",
        color: "black !important",
        "&::placeholder": {
          textOverflow: "ellipsis !important",
          color: "#999",
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "24px",
          borderRadius: "6px",
        },
      },
      "& .Mui-error": {
        fontSize: "1.2rem !important",
        color: "#F4787D !important",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #F4787D !important",
          borderRadius: "6px",
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #999 !important",
        borderRadius: "6px",
        "& .Mui-error": {
          border: "1px solid #F4787D !important",
        },
      },
    },
  });

  const maskErrorMessage = (value: string): string => {
    if (props.inputMask) {
      switch (props.inputMask[value.length]) {
        case "a":
          return "Invalid Input: Please enter a character (e.g., A, B, C).";
        case "9":
          return "Invalid Input: Please enter a number (e.g., 1, 2, 3).";
        default:
          return "";
      }
    }
    return "";
  };

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.specialCharsToSkip) {
      if (e.target.value.match(props.specialCharsToSkip)) {
        return;
      } else {
        props.onChange(e.target.value);
      }
    } else {
      props.onChange(e.target.value);
    }
  };

  const classes = useStyles();

  const maskedInput = () => {
    return (
      <TextField
        autoComplete="off"
        disabled={props.disabled}
        sx={{ ...props.styles }}
        error={error ? true : false}
        helperText={error}
        id="outlined-basic"
        className={classes.root}
        placeholder={props.placeholder}
        onKeyUp={(e) => {
          if (props.showErrorForMasking) {
            if (e.key === "Backspace") setError(props.error);
          }
        }}
        variant="outlined"
      />
    );
  };

  return (
    <div className="text-field-wrapper">
      <div className={`input-label ${props.required ? "required" : ""}`}>
        {props.overHeadLabel}
      </div>
      {props.inputMask ? (
        <InputMask
          mask={props.inputMask}
          maskChar=""
          value={
            props.value
              ? props.upperCase
                ? props.value.toUpperCase()
                : props.value
              : ""
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (props.showErrorForMasking) {
              if (
                (e.nativeEvent as InputEvent).inputType !==
                "deleteContentBackward"
              ) {
                if (e.target.value.length === props.value?.length) {
                  setError(maskErrorMessage(e.target.value));
                } else {
                  setError(props.error);
                }
              }
            }
            updateValue(e);
          }}
          placeholder={props.placeholder}
        >
          {maskedInput()}
        </InputMask>
      ) : (
        <TextField
          disabled={props.disabled}
          sx={{ ...props.styles }}
          error={error ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateValue(e)}
          helperText={error}
          id="outlined-basic"
          className={classes.root}
          value={props.value}
          placeholder={props.placeholder}
          variant="outlined"
        />
      )}
    </div>
  );
};

export default MobileTextField;
