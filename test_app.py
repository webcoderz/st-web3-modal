import streamlit as st
import web3modal

st.set_page_config(layout='wide')

def btn_css():
    st.markdown("""
                <style>
            .css-xl1iz5  {
                position: absolute;
                top: 0;
                right: 0;
                z-index: 9999999;
            }
            </style>
        """, unsafe_allow_html=True)


def app():
    
    with st.sidebar.header("Web3Modal"):
        connect_button = st.connect_component(key="connect")
        if isinstance(connect_button, dict) and connect_button["address"] != "None":
            st.write('Connected!')
            st.write(connect_button["address"])


if __name__ == '__main__':
    app()