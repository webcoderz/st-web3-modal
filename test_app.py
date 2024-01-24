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
    btn = st.button("Click me")
    with st.sidebar.header("Web3Modal"):
        connect_button = st.connect_component(key="connect")
        if isinstance(connect_button, dict) and connect_button["address"] != "None":
            st.session_state['address'] = connect_button["address"]
                # Display the address from the session state
    if btn:
        if 'address' in st.session_state:
            st.write('Connected!')
            st.write(st.session_state['address'])
        else:
            st.write('Not Connected!')

if __name__ == '__main__':
    app()