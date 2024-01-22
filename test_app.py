import streamlit as st
from web3modal import connectComponent, disconnectComponent

def app():
    st.title('My App')
    connect_button = st.connect_component()

    if isinstance(connect_button, dict) and "address" in connect_button:
        st.write(f'address: {connect_button["address"]}')


    if connect_button['address']:
        st.disconnect_component()
        st.write("disconnected")



if __name__ == '__main__':
    app()