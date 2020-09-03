import React from "react";

class Card extends React.Component {
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
            <p className=" blue fit cost">{spell.school}</p>
            </div>
            <div className="green" style={{ width: "240px" }}>
              <p className="top-center-top" style={{ margin: "auto" }}>
                {spell.name}
              </p>
              <p className="top-bottom">{spell.type}</p>
            </div>
            <div className="right">
              <p className=" blue fit cost">{spell.cost}</p>
            </div>
          </div>
          <div className="separator" />
          <div className="middle">
            <p className="fit" style={{ overflowY: "scroll", width: "294px" }}>
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
