import React from "react";
import Filter from "./Filter.js";

import _filters from "./filters.json";

class Filters extends React.Component {
  renderFilters = () => {
    let filters = [];
    for (const [, value] of Object.entries(_filters)) {
      filters.push(
        <Filter
          key={value.key}
          index={value.key}
          name={value.label}
          filters={value.filters}
          isString={typeof value.filters === "string"}
          values={this.props.filters[value.key]}
          onChange={this.props.onFilterChange}
          style={{
            height: "30px"
          }}
        />
      );
    }
    return filters;
  };

  render() {
    return this.renderFilters();
  }
}

export default Filters;
