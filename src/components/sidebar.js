import React from "react"

import FeatherIcon from "feather-icons-react"

import style from "./sidebar.module.css"

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={style.sidebar + " bg-light"}>
        <ul className={style.links}>
          <li><a href="#">
            <div className={style.icon}>
              <FeatherIcon icon="home" /> 
            </div>
            Dashboard       
          </a></li>
        </ul>
      </div>
    )
  }
}
