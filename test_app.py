import streamlit as st
import web3modal


def app():
    st.title('My App')
    connect_button = st.connect_component()

    if isinstance(connect_button, dict) and connect_button["address"] != "None":
        st.write('Connected!')
        st.write(connect_button["address"])


if __name__ == '__main__':
    app()