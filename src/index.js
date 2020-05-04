"use strict"

import Navbar from "./components/navbar"
import Footer from "./components/footer"

import Home from "./pages/home"
import About from "./pages/about"
import Contact from "./pages/contact"
import Signup from "./pages/signup"
import Login from "./pages/login"
import View from "./pages/view"
import Settings from "./pages/settings"
import Saved from "./pages/saved"

m.route(document.body, "/", {
  "/": {view: () => m(".layout", [
    m(Navbar), 
    m(Home),
    m(Footer)
  ])},
  "/about": {view: () => m(".layout", [
    m(Navbar, {active: "about"}), 
    m(About),
    m(Footer)
  ])},
  "/contact": {view: () => m(".layout", [
    m(Navbar, {active: "contact"}), 
    m(Contact),
    m(Footer)
  ])},
  "/signup": {view: () => m(".layout", [
    m(Navbar, {active: "signup"}),
    m(Signup),
    m(Footer)
  ])},
  "/login": {view: () => m(".layout", [
    m(Navbar, {active: "login"}),
    m(Login),
    m(Footer)
  ])},
  "/user/settings": {view: () => m(".layout", [
    m(Navbar, {active: "settings"}),
    m(Settings),
    m(Footer)
  ])},
  "/user/saved": {view: () => m(".layout", [
    m(Navbar, {active: "saved"}),
    m(Saved),
    m(Footer)
  ])},
  "/view/:id": {view: vnode => m(".layout", [
    m(Navbar),
    m(View, {id: vnode.attrs.id}),
    m(Footer)
  ])},
  // TODO
  "/page/:page": {view: vnode => m(".layout", [
    m(Navbar), 
    m(Home, {page: vnode.attrs.page}),
    m(Footer)
  ])},
})
