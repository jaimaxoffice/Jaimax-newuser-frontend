import React, { useState } from "react";
import checkIcon from "../assets/Images/checkIcon.svg";
import copyIcon from "../assets/Images/copyIcon.svg";

const CopyToClipboardButton = ({ className, textToCopy, styles }) => {
  const [buttonText, setButtonText] = useState("");
  const [image, setImage] = useState(copyIcon);
  const [isClickable, setIsClickable] = useState(true);

  const handleCopy = async () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setButtonText("Copied");
          setImage(checkIcon);
          setIsClickable(false);

          setTimeout(() => {
            setButtonText("Copy");
            setImage(copyIcon);
            setIsClickable(true);
          }, 3000);
        })
        .catch(() => {});
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");

        setButtonText("Copied");
        setImage(checkIcon);
        setIsClickable(false);

        setTimeout(() => {
          setButtonText("Copy");
          setImage(copyIcon);
          setIsClickable(true);
        }, 3000);
      } catch (err) {
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <button
      className={
        className ||
        "input-group-text copy_button rounded-0 shadow-none border-0 p-0 "
      }
      id="basic-addon1"
      type="button"
      onClick={isClickable ? handleCopy : null}
      style={styles}
    >
      <img alt="copy" src={image} className="pe-1" />
      {buttonText}
    </button>
  );
};

export default CopyToClipboardButton;
