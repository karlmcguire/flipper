"use strict"

import State from "./state"
import Init from "./init"

import Navbar from "./components/navbar"
import Footer from "./components/footer"

import Home from "./pages/home"
import About from "./pages/about"
import Contact from "./pages/contact"
import Signup from "./pages/signup"
import Signin from "./pages/signin"
import View from "./pages/view"
import Settings from "./pages/settings"
import Saved from "./pages/saved"

Init(State)

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
  "/signin": {view: () => m(".layout", [
    m(Navbar, {active: "signin"}),
    m(Signin),
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
