"use strict"

import Navbar from "./components/navbar"
import Footer from "./components/footer"

import Home from "./pages/home"
import About from "./pages/about"
import Contact from "./pages/contact"
import Signup from "./pages/signup"
import Login from "./pages/login"

m.route(document.body, "/", {
  "/": {view: () => m("div", [
    m(Navbar), 
    m(Home),
    m(Footer)
  ])},
  "/about": {view: () => m("div", [
    m(Navbar, {active: "about"}), 
    m(About),
    m(Footer)
  ])},
  "/contact": {view: () => m("div", [
    m(Navbar, {active: "contact"}), 
    m(Contact),
    m(Footer)
  ])},
  "/signup": {view: () => m("div", [
    m(Navbar, {active: "signup"}),
    m(Signup),
    m(Footer)
  ])},
  "/login": {view: () => m("div", [
    m(Navbar, {active: "login"}),
    m(Login),
    m(Footer)
  ])}
})
