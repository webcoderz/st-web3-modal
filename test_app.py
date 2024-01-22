import streamlit as st
from web3modal import modalComponent

def app():
    st.title('My App')
    modalComponent()

if __name__ == '__main__':
    app()