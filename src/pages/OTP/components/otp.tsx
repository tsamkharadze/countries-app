import { ChangeEvent, useRef, useState } from "react";

const Otp = () => {
  const [inputs] = useState([
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
  ]);

  const inputRefs = useRef<any>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (value) {
      console.log("Next");
      inputRefs?.current[index + 1]?.focus();
    }
  };

  return (
    <div
      style={{
        padding: 100,
        display: "flex",
        gap: 8,
      }}
    >
      {inputs.map((input, index) => {
        return (
          <input
            ref={(element) => {
              if (index === 0) {
                element?.focus();
              }
              inputRefs.current[index] = element;
            }}
            key={index}
            onChange={(e) => handleChange(e, index)}
            style={{ width: 60 }}
            type="number"
            maxLength={1}
          />
        );
      })}
    </div>
  );
};

export default Otp;
