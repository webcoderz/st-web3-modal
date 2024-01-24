import streamlit.components.v1 as components
import os
import streamlit as st

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
_RELEASE = True

if not _RELEASE:
    _connect_component = components.declare_component(
        "web3connect_component",
        url="http://localhost:3000",
    )

else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _connect_component = components.declare_component("web3connect_component", path=build_dir)


def connectComponent(
        button_theme="dark", 
        modal_size="compact", 
        welcome_title="Welcome", 
        welcome_subtitle="Connect your wallet to get started", 
        button_title="Connect Wallet", 
        key=None):
    component_value = _connect_component(button_theme=button_theme, modal_size=modal_size, welcome_title=welcome_title, welcome_subtitle=welcome_subtitle, button_title=button_title, key=key)
    return component_value


#monkeypatch streamlit
st.connect_component = connectComponent
