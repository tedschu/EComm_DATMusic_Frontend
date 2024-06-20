import React from "react";

function ProductFilter() {
  return (
    <>
      <div className="leftMenu">
        <input
          type="checkbox"
          id="guitars"
          name="guitars"
          value="guitars"
          //onChange={setResults}
        />
        <label for="guitars">Guitars</label>
        <br></br>
        <input
          type="checkbox"
          id="drums"
          name="drums"
          value="drums"
          //onChange={setResults}
        />
        <label for="drums">Drums</label>
      </div>
    </>
  );
}

export default ProductFilter;
