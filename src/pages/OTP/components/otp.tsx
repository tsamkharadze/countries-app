import {
  ChangeEvent,
  ClipboardEvent,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import styles from "./otp.module.css";

const Otp = ({ numInputs }: { numInputs: number }) => {
  // კომპონენტის viewში შეგვიძლია მივუთითოთ ინფუთის რაოდენობა,
  // რომელიც გადაეცემა ჩაილდად numInputs-ის სახით

  const [inputs, setInputs] = useState(Array(numInputs).fill(""));

  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value.length <= 1) {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);

        if (value && index < numInputs - 1) {
          inputRefs.current[index + 1]?.focus();
        } else {
          inputRefs.current[index]?.blur();
        }
      }
    };

  const handlePaste =
    (index: number) => (e: ClipboardEvent<HTMLInputElement>) => {
      const pasteData = e.clipboardData
        .getData("text")
        .slice(0, numInputs - index);
      const newInputs = [...inputs];

      pasteData.split("").forEach((char, i) => {
        newInputs[index + i] = char;
        if (inputRefs.current[index + i]) {
          inputRefs.current[index + i]!.value = char;
        }
      });

      setInputs(newInputs);
      e.preventDefault();
      inputRefs.current[index + pasteData.length - 1]?.focus();
    };

  const handleKeyDown =
    (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (inputs[index] === "" && index > 0) {
          const newInputs = [...inputs];
          newInputs[index - 1] = "";
          setInputs(newInputs);
          inputRefs.current[index - 1]?.focus();
        } else {
          const newInputs = [...inputs];
          newInputs[index] = "";
          setInputs(newInputs);
        }
      }
    };

  return (
    <div className={styles.container}>
      {inputs.map((input, index) => (
        <input
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          key={index}
          value={input}
          onChange={handleChange(index)}
          onPaste={handlePaste(index)}
          onKeyDown={handleKeyDown(index)}
          className={styles.input}
          type="number"
          maxLength={1}
          placeholder="●"
        />
      ))}
    </div>
  );
};

export default Otp;
