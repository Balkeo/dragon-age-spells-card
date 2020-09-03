import React from "react";
import Select from "react-select";
import { Input } from "reactstrap";

const customStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: "#272727",
    borderColor: "rgba(255, 255, 255, 0.2)",
    color: "rgba(255, 255, 255, 0.4)",
    outline: "none",
    ":hover": {
      borderColor: "rgba(255, 255, 255, 0.2)"
    },
    width: 80,
    fontSize: 12
  }),
  dropdownIndicator: styles => ({
    ...styles,
    color: "rgba(255, 255, 255, 0.2)",
    ":hover": {
      color: "rgba(255, 255, 255, 0.2)"
    }
  }),
  indicatorSeparator: styles => ({
    ...styles,
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "#3d3d3d"
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: "#3d3d3d",
    transition: "0.3s",
    ":hover": {
      color: "#9649CB"
    }
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#3d3d3d",
    transition: "0.2s"
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.4)"
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    backgroundColor: "#3d3d3d",
    transition: "0.2s",
    ":hover": {
      color: "#d7263d"
    }
  })
};

class Filter extends React.Component {
  handleOnChange = e => {
    let selectedFilter = [];
    if (e) {
      for (const [, value] of Object.entries(e)) {
        selectedFilter.push(value.value);
      }
    }
    return selectedFilter;
  };

  render() {
    return (
      <div style={{ flexGrow: "1" }}>
        {this.props.isString ? (
          <Input type="text" placeholder={this.props.name} />
        ) : (
          <Select
            styles={customStyles}
            onChange={values =>
              this.props.onChange(this.props.index, this.handleOnChange(values))
            }
            options={this.props.filters}
            placeholder={this.props.name}
            isMulti
          />
        )}
      </div>
    );
  }
}

export default Filter;
