import React, { Dispatch } from "react";

import { AddressAutofill } from "@mapbox/search-js-react";
import { HyLabelInput } from "../../..";

type THyAutoLocation = {
  value: string;
  setValue: Dispatch<any>;
};

const HyAutoLocation = (props: THyAutoLocation) => {
  const { value, setValue } = props;

  return (
    <AddressAutofill accessToken="pk.eyJ1IjoibGhldW1lbGwiLCJhIjoiY2xpa2R5dzZkMDB6aTNzbXA5b2FoNGFqdSJ9.-iWQMwxxd0WH4gTATYgIpA">
      <HyLabelInput
        label="Addresse"
        type="text"
        value={value}
        setValue={setValue}
        autoComplete="address-line1"
      />
    </AddressAutofill>
  );
};

export default HyAutoLocation;
