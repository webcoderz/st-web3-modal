import streamlit as st
from web3modal import connectComponent, disconnectComponent

def app():
    st.title('My App')
    connect_button = st.connect_component()

if __name__ == '__main__':
    app()