import React from "react";
import { Button } from "reactstrap";
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
      filters: {
        school: [],
        type: [],
        cast: [],
        cost: [],
        difficulty: []
      }
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
      this.state.filters.type.length > 0 ||
      this.state.filters.cast.length > 0 ||
      this.state.filters.cost.length > 0 ||
      this.state.filters.difficulty.length > 0
    ) {
      return true;
    }
    return false;
  };

  render() {
    let filteredSpells = this.filterSpells();
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: "50px",
            backgroundColor: "#3d3d3d",
            color: "#ffffff",
            marginBottom: "40px",
            boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.3)"
          }}
        >
          <Filters
            filters={this.state.filters}
            onFilterChange={this.updateFilters}
          />
        </div>
        <div className="deck">
          {filteredSpells.length > 1 ? (
            <Button
              outline
              color="secondary"
              className="arrow flex"
              id="left-arrow"
              onClick={() => this.prevSpell(filteredSpells)}
              style={{
                lineHeight: "100%"
              }}
            >
              &lt;
            </Button>
          ) : (
            ""
          )}
          <Card
            spell={filteredSpells[this.state.index]}
            index={this.state.index}
            total={filteredSpells.length}
            jumpToSpell={this.goToSpell}
          />
          {filteredSpells.length > 1 ? (
            <Button
              outline
              color="secondary"
              className="arrow flex"
              id="right-arrow"
              onClick={() => this.nextSpell(filteredSpells)}
              style={{
                lineHeight: "100%"
              }}
            >
              &gt;
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Deck;
