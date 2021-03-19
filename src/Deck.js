import React from "react";
import Jexl from "./Jexl";

import Card from "./Card";
import Filters from "./Filters";
import Spells from "./Spells.json";

class Deck extends React.Component {
  constructor(props) {
    super();
    this.state = {
      index: 0,
      spells: Spells,
      displayMenu: false,
      filters: {
        school: [],
        type: []
      },
      screenWidth: props.screenWidth
    };
  }

  nextSpell = filteredSpells => {
    let actualSpell = this.state.index;
    actualSpell = (actualSpell + 1) % filteredSpells.length;
    this.setState({
      ...this.state,
      index: actualSpell
    });
  };

  prevSpell = filteredSpells => {
    let actualSpell = this.state.index;
    actualSpell = actualSpell - 1;
    if (actualSpell < 0) {
      actualSpell = filteredSpells.length - 1;
    }
    this.setState({
      ...this.state,
      index: actualSpell
    });
  };

  goToSpell = spellName => {
    for (const key in this.state.spells) {
      const spell = this.state.spells[key];
      if (spell.name === spellName) {
        let state = this.state;
        state.index = key;
        this.setState(state);
      }
    }
  };

  updateFilters = (key, values) => {
    let state = this.state;
    state.filters[key] = values;
    state.index = 0;
    this.setState(state);
  };

  filterSpells = () => {
    let filteredSpells = [];

    if (this.filtersAreNotEmpty()) {
      for (const key in this.state.spells) {
        let haveToBeAdd = false;
        const spell = this.state.spells[key];

        for (const [, filters] of Object.entries(this.state.filters)) {
          for (const filterKey in filters) {
            let filter = filters[filterKey];
            if (Jexl.eval(filter, spell)) {
              haveToBeAdd = true;
            }
          }
        }
        if (haveToBeAdd) {
          filteredSpells.push({ ...spell });
        }
      }
    } else {
      filteredSpells = this.state.spells;
    }
    return filteredSpells;
  };

  filtersAreNotEmpty = () => {
    if (
      this.state.filters.school.length > 0 ||
      this.state.filters.type.length > 0
    ) {
      return true;
    }
    return false;
  };

  moveMenu = (show) => {
    let state = this.state;
    state.displayMenu = show;
    this.setState(state);
  }

  render() {
    let filteredSpells = this.filterSpells();

    return (
      <div
        style={{
          height: "100%",
          maxHeight: "100%",
          overflow: "hidden"
        }}
      >
        <div
          className="filters-container"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "50px",
            backgroundColor: "#3d3d3d",
            color: "#ffffff",
            padding: "30px"
          }}
        >
          <Filters
            filters={this.state.filters}
            onFilterChange={this.updateFilters}
          />
        </div>
        <div className="deck" style={{
          paddingTop: "20px",
          display: "grid",
          gridTemplateColumns: `repeat(${Math.floor(this.state.screenWidth / 340) || 1}, 1fr)`,
          gridAutoFlow: "row dense",
          gridGap: "20px",
          justifyItems: "center",
          overflow: "scroll",
          maxHeight: "calc(100% - 50px)"
        }}>
            {filteredSpells.map((spell, spellIndex) => {                  
                return (<Card spell={spell} key={spellIndex} />)
            })}
        </div>
      </div>
    );
  }
}

export default Deck;
