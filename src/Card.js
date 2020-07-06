import React from "react";

import Creation from "../public/assets/img/Creation.png";
import Entropie from "../public/assets/img/Entropie.png";
import Esprit from "../public/assets/img/Esprit.png";
import Elements from "../public/assets/img/Elements.png";
import Ecole from "../public/assets/img/School.png";
import Sang from "../public/assets/img/Sang.png";

class Card extends React.Component {
  getPictureForSpell = spell => {
    switch (spell.school) {
      case "Création":
        return Creation;
      case "Entropie":
        return Entropie;
      case "Esprit":
        return Esprit;
      case "Éléments":
        return Elements;
      case "Ecole":
        return Ecole;
      case "Sang":
        return Sang;
      default:
        return Ecole;
    }
  };

  trunc = (string, length, useWordBoundary) => {
    if (string.length <= length) {
      return string;
    }
    var subString = string.substr(0, length - 1);
    return (
      (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(" "))
        : subString) + "[...]"
    );
  };

  render() {
    let spell = this.props.spell;
    return (
      <div>
        <div className="card">
          <div className="top">
            <div className="left">
              <img
                className="round"
                src={this.getPictureForSpell(spell)}
                alt="school"
              />
            </div>
            <div className="green" style={{ width: "240px" }}>
              <p className="top-center-top" style={{ margin: "auto" }}>
                {spell.name}
              </p>
              <p className="top-bottom">{spell.type}</p>
            </div>
            <div className="right">
              <p className=" blue fit cost">{spell.cost}</p>
              {/*<img className="round" src={ManaPot} alt="cost" />*/}
            </div>
          </div>
          <div className="separator" />
          <div className="middle">
            <p className="fit" style={{ overflowY: "scroll" }}>
              {spell.description}
            </p>
          </div>
          <div className="separator" />
          <div className="bottom">
            <div>
              <p className="fit">{spell.test}</p>
              <p className="fit top-bottom">{spell.cast}</p>
              <p
                className="fit top-bottom"
                onClick={e => this.props.jumpToSpell(spell.prerequisites)}
              >
                {spell.prerequisites}
              </p>
            </div>
            <div className="cost yellow">{spell.difficulty}</div>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div
            style={{
              margin: "auto",
              width: "100px",
              textAlign: "center",
              backgroundColor: "#3d3d3d",
              color: "#ffffff",
              borderBottomRightRadius: "10px",
              borderBottomLeftRadius: "10px"
            }}
          >
            {this.props.index + 1} / {this.props.total}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
