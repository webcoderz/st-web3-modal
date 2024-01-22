import streamlit.components.v1 as components
import os
import streamlit as st

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
_RELEASE = False

if not _RELEASE:
    _modal_component = components.declare_component(
        "web3modal_component",
        url="http://localhost:3000",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _modal_component = components.declare_component("web3modal_component", path=build_dir)


def modalComponent():
    component_value = _modal_component()
    return component_value


#monkeypatch streamlit
st.modal_component = modalComponent