import streamlit as st
import web3modal

st.set_page_config(layout='wide')

def btn_css():
    st.markdown("""
                <style>
            .css-k23hpx   {
  overflow: visible;
  border-radius: 10px; /* Adjust this value to match
            }
            </style>
        """, unsafe_allow_html=True)


def app():
    btn = st.button("Click me")
    with st.sidebar.header("Web3Modal"):
        connect_button = st.connect_component(key="connect", modal_size="wide")
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