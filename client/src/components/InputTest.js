import React from "react";
import Input from "@material-ui/core/Input";
import { StylesProvider } from "@material-ui/core/styles";
import "./stylesOverride.css";

function OverridesCss() {
  return (
    <div>
      <StylesProvider injectFirst>
        <Input value="Hello world" />
      </StylesProvider>
    </div>
  );
}

export default OverridesCss;