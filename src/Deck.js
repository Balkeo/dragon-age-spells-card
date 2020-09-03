import React from "react";
import { Button } from "reactstrap";
import Jexl from "./Jexl";
import { Swipeable } from 'react-swipeable'

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
        }}
      >
        <Swipeable
          onSwipedLeft={() => this.moveMenu(false)}
          onSwipedRight={() => this.moveMenu(true)}
        >
          <div
            className="filters-container"
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              left: this.state.displayMenu ? "0" : "-100px",
              width: "100px",
              height: "100%",
              backgroundColor: "#3d3d3d",
              color: "#ffffff",
              padding: "30px 0",
              zIndex: "2",
              transition: "left 0.5s ease-out"
            }}
          >
            <Filters
              filters={this.state.filters}
              onFilterChange={this.updateFilters}
            />
          </div>
          <div
            className="filters-displayer"
            style={{
              position: "absolute",
              left: this.state.displayMenu ? "100px" : "0px",
              width: "12px",
              height: "100%",
              backgroundColor: "#3d3d3d",
              color: "#4E4E4E",
              lineHeight: "20px",
              zIndex: "2",
              transition: "left 0.5s ease-out",
              boxShadow: "10px 0px 13px -7px #000000, 5px 5px 5px 5px rgba(0,0,0,0)",
              borderRight: "1px solid black",
              paddingLeft: "4px"
            }}
            onClick={() => this.moveMenu(!this.state.displayMenu)}
          >
            <div style={
              {
                height: "32px",
                width: "4px",
                backgroundColor: "#FFFFFF",
                position: "absolute",
                top: "calc(50% - 16px)",
                borderRadius: "5px"
              }
            }/>
          </div>
        </Swipeable>
        <div className="deck" style={{paddingTop: "20px"}}>
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
          <Swipeable
            onSwipedLeft={() => this.nextSpell(filteredSpells)}
            onSwipedRight={() => this.prevSpell(filteredSpells)}
          >
            <Card
              spell={filteredSpells[this.state.index]}
              index={this.state.index}
              total={filteredSpells.length}
              jumpToSpell={this.goToSpell}
            />
          </Swipeable>
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
